import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSupabaseServer } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(`${origin}/auth/login?error=${error ?? 'no_code'}`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${origin}/auth/login?error=missing_config`);
  }

  // Exchange authorization code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: `${origin}/api/auth/callback/google`,
      grant_type: 'authorization_code',
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokens.id_token) {
    return NextResponse.redirect(`${origin}/auth/login?error=no_id_token`);
  }

  // Retrieve and clear the nonce cookie
  const cookieStore = await cookies();
  const nonce = cookieStore.get('google_oauth_nonce')?.value;
  cookieStore.delete('google_oauth_nonce');

  // Sign in to Supabase using the Google ID token
  const supabase = await createSupabaseServer();
  const { data, error: supabaseError } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: tokens.id_token,
    ...(nonce ? { nonce } : {}),
  });

  if (supabaseError || !data.user) {
    console.error('Supabase signInWithIdToken error:', supabaseError);
    const msg = encodeURIComponent(supabaseError?.message ?? 'no_user');
    return NextResponse.redirect(`${origin}/auth/login?error=auth_failed&detail=${msg}`);
  }

  // Ensure profile exists
  await supabase.from('profiles').upsert(
    { id: data.user.id, email: data.user.email },
    { onConflict: 'id' }
  );

  return NextResponse.redirect(`${origin}/dashboard`);
}
