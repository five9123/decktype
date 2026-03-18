'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { TopToolbar } from '@/components/TopToolbar';
import { createBrowserClient } from '@/lib/supabase/client';

interface ReferralRow {
  id: string;
  code: string;
  influencer_name: string;
  discount_pct: number;
  active: boolean;
  created_at: string;
  conversion_count: number;
}

interface SocialRefStat {
  source: string;
  count: number;
  lastSeen: string;
}

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? '';

export default function AdminReferralsPage() {
  const { user, loading: authLoading } = useAuth();
  const [rows, setRows] = useState<ReferralRow[]>([]);
  const [socialRefs, setSocialRefs] = useState<SocialRefStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isAdmin = !authLoading && user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (authLoading) return;
    if (!isAdmin) { setLoading(false); return; }

    // Load referral codes
    fetch('/api/admin/referrals')
      .then(r => r.json())
      .then((data: { rows?: ReferralRow[]; error?: string }) => {
        if (data.rows) setRows(data.rows);
        else setError(data.error ?? 'Failed to load');
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false));

    // Load social media referral stats
    const supabase = createBrowserClient();
    supabase
      .from('analytics_events')
      .select('event_data, created_at')
      .eq('event_name', 'social_referral')
      .order('created_at', { ascending: false })
      .limit(500)
      .then(({ data }) => {
        if (!data) return;
        const map = new Map<string, { count: number; lastSeen: string }>();
        for (const row of data) {
          const src = (row.event_data as Record<string, string>)?.source ?? 'unknown';
          const existing = map.get(src);
          if (existing) {
            existing.count++;
          } else {
            map.set(src, { count: 1, lastSeen: row.created_at });
          }
        }
        const stats: SocialRefStat[] = Array.from(map.entries())
          .map(([source, v]) => ({ source, ...v }))
          .sort((a, b) => b.count - a.count);
        setSocialRefs(stats);
      });
  }, [isAdmin, authLoading]);

  if (authLoading || loading) {
    return (
      <>
        <TopToolbar />
        <div className="flex items-center justify-center py-20">
          <p style={{ color: 'var(--muted)' }}>Loading...</p>
        </div>
      </>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <TopToolbar />
        <div className="flex items-center justify-center py-20">
          <p style={{ color: 'var(--muted)' }}>Access denied.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <TopToolbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
          레퍼럴 통계
        </h1>

        {error && (
          <div className="px-4 py-3 rounded-xl mb-6 text-sm"
            style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: 'var(--incorrect)' }}>
            {error}
          </div>
        )}

        {rows.length === 0 && !error ? (
          <div className="text-center py-20 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--muted)' }}>등록된 레퍼럴 코드가 없습니다.</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                  {['인플루언서', '코드', '할인율', '전환수', '상태', '등록일'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--muted)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.id}
                    style={{
                      background: i % 2 === 0 ? 'var(--bg)' : 'var(--surface)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--text)' }}>{row.influencer_name}</td>
                    <td className="px-4 py-3">
                      <code
                        className="px-2 py-0.5 rounded text-xs font-bold"
                        style={{ background: 'var(--surface2)', color: 'var(--accent)' }}
                      >
                        {row.code}
                      </code>
                    </td>
                    <td className="px-4 py-3 font-bold" style={{ color: '#059669' }}>{row.discount_pct}%</td>
                    <td className="px-4 py-3 font-bold" style={{ color: 'var(--text)' }}>{row.conversion_count}명</td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          background: row.active ? 'rgba(52,211,153,0.15)' : 'rgba(248,113,113,0.15)',
                          color: row.active ? '#059669' : '#dc2626',
                        }}
                      >
                        {row.active ? '활성' : '비활성'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>
                      {new Date(row.created_at).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Social Media Referral Stats */}
        {socialRefs.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>
              소셜 미디어 유입
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {socialRefs.map((ref) => (
                <div
                  key={ref.source}
                  className="p-4 rounded-xl text-center"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{ref.count}</p>
                  <p className="text-xs font-medium mt-1" style={{ color: 'var(--text)' }}>{ref.source}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted)' }}>
                    최근: {new Date(ref.lastSeen).toLocaleDateString('ko-KR')}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              UTM 링크: typee.app?ref=tiktok, typee.app?ref=youtube, typee.app?ref=instagram
            </p>
          </div>
        )}

        <div
          className="mt-8 p-4 rounded-xl text-sm"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <p className="font-semibold mb-1" style={{ color: 'var(--text)' }}>코드 추가 방법</p>
          <p>1. Stripe 대시보드 → Coupons → 쿠폰 생성 (예: 20% off forever)</p>
          <p>2. Stripe 대시보드 → Promotion Codes → 쿠폰에 연결된 코드 생성</p>
          <p>3. Supabase Table Editor → referral_codes 테이블에 INSERT</p>
          <code
            className="block mt-2 p-2 rounded text-xs"
            style={{ background: 'var(--surface2)', color: 'var(--text)' }}
          >
            {`INSERT INTO referral_codes (code, influencer_name, stripe_promotion_code_id, discount_pct)`}<br />
            {`VALUES ('MINSOO20', '민수 TV', 'promo_xxxxx', 20);`}
          </code>
        </div>
      </main>
    </>
  );
}
