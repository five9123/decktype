'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { TopToolbar } from '@/components/TopToolbar';

interface ReferralRow {
  id: string;
  code: string;
  influencer_name: string;
  discount_pct: number;
  active: boolean;
  created_at: string;
  conversion_count: number;
}

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? '';

export default function AdminReferralsPage() {
  const { user, loading: authLoading } = useAuth();
  const [rows, setRows] = useState<ReferralRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isAdmin = !authLoading && user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (authLoading) return;
    if (!isAdmin) { setLoading(false); return; }

    fetch('/api/admin/referrals')
      .then(r => r.json())
      .then((data: { rows?: ReferralRow[]; error?: string }) => {
        if (data.rows) setRows(data.rows);
        else setError(data.error ?? 'Failed to load');
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false));
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
