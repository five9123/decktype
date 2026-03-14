import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { PreferencesProvider } from '@/contexts/PreferencesContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { HtmlLangSetter } from '@/components/HtmlLangSetter';
import { GlobalFooter } from '@/components/GlobalFooter';
import { BASE_URL } from '@/lib/constants';
import { THEMES } from '@/lib/themes';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'typee — Learn Languages Through Music & Movies',
    template: '%s | typee',
  },
  description:
    'Learn any language through songs and movies you love. Paste lyrics or drop SRT subtitles — AI creates typing cards instantly.',
  keywords: [
    'language learning',
    'song lyrics learning',
    'SRT subtitles',
    'typing practice',
    'fill in the blank',
    'K-pop learning',
    'anime vocabulary',
    'Japanese learning',
    'Korean learning',
    'AI flashcards',
    'Anki',
    'WPM',
    'memory training',
    'K-POP 歌詞 韓国語学習',
    '推し活 韓国語',
    '韓国語 タイピング 練習',
    'K-POP 가사 한국어 공부',
    '타이핑 연습',
  ],
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en': BASE_URL,
      'ja': BASE_URL,
      'ko': BASE_URL,
      'es': BASE_URL,
      'zh': BASE_URL,
      'fr': BASE_URL,
      'x-default': BASE_URL,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'typee',
    title: 'typee — Learn Languages Through Music & Movies',
    description:
      'Paste song lyrics or drop subtitle files — AI creates typing cards and games instantly.',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'typee — Learn Languages Through Music & Movies',
    description:
      'Learn any language through songs and movies you love. Paste lyrics or drop SRT subtitles — AI creates typing cards instantly.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Inline script runs before paint — prevents FOUC by applying CSS variables immediately */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'typee',
                url: 'https://www.typee.app',
                logo: 'https://www.typee.app/icon',
                description:
                  'typee turns songs, movies, and any content you love into interactive language practice — typing, fill-in-the-blank, and word games powered by AI.',
                sameAs: [
                  'https://github.com/a-type-web',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'typee',
                url: 'https://www.typee.app',
                description:
                  'Learn any language through songs and movies you love. Paste lyrics or drop SRT subtitles — AI creates typing cards instantly.',
              },
            ]),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: `
(function(){
  try {
    var THEMES=${JSON.stringify(Object.fromEntries(THEMES.map(t => [t.id, t.colors])))};
    var prefs = null;
    var raw = localStorage.getItem('atype-prefs');
    if (raw) { prefs = JSON.parse(raw); }
    else {
      var old = localStorage.getItem('atype-theme');
      if (old && THEMES[old]) { prefs = { theme: old }; }
    }
    var id = (window.location.pathname === '/') ? 'light' : ((prefs && prefs.theme && THEMES[prefs.theme]) ? prefs.theme : 'light');
    var c = THEMES[id] || THEMES['light'];
    var r = document.documentElement;
    r.setAttribute('data-theme', id);
    for (var k in c) { r.style.setProperty('--' + k, c[k]); }
    if (prefs && prefs.fontSize) {
      var fm = { small: '1rem', medium: '1.25rem', large: '1.5rem', xlarge: '2rem' };
      r.style.setProperty('--typing-font-size', fm[prefs.fontSize] || '1.25rem');
    }
  } catch(e) {}
})();
        `}} />
      </head>
      <body className="antialiased">
        <PreferencesProvider>
          <LanguageProvider>
            <AuthProvider>
              <HtmlLangSetter />
              {children}
              <GlobalFooter />
            </AuthProvider>
          </LanguageProvider>
        </PreferencesProvider>
        <Analytics />
      </body>
    </html>
  );
}
