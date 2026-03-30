import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { PreferencesProvider } from '@/contexts/PreferencesContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { HtmlLangSetter } from '@/components/HtmlLangSetter';
import { GlobalFooter } from '@/components/GlobalFooter';
import { RefTracker } from '@/components/RefTracker';
import { BASE_URL } from '@/lib/constants';
import { THEMES } from '@/lib/themes';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'typee — Free Typing Practice App for Language Learning',
    template: '%s | typee',
  },
  description:
    'typee is a free typing practice app for language learners. Paste song lyrics, subtitles, or any text — AI creates typing flashcards instantly. Learn Japanese, Korean, Spanish and more.',
  keywords: [
    'typing practice app',
    'language learning app',
    'typing practice',
    'language learning',
    'song lyrics learning',
    'SRT subtitles',
    'fill in the blank',
    'K-pop learning',
    'anime vocabulary',
    'Japanese learning',
    'Korean learning',
    'AI flashcards',
    'Anki typing',
    'WPM tracker',
    'memory training',
    'active recall',
    'vocabulary typing',
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
      'ja': `${BASE_URL}/ja`,
      'ko': `${BASE_URL}/ko`,
      'es': `${BASE_URL}/es`,
      'zh': `${BASE_URL}/zh`,
      'fr': `${BASE_URL}/fr`,
      'x-default': BASE_URL,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'typee',
    title: 'typee — Free Typing Practice App for Language Learning',
    description:
      'typee is a free typing practice app for language learners. Paste song lyrics, subtitles, or any text — AI creates typing flashcards and games instantly.',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'typee — Free Typing Practice App for Language Learning',
    description:
      'typee is a free typing practice app for language learners. Paste song lyrics, subtitles, or any text — AI creates typing flashcards instantly.',
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
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.typee.app/icon',
                  width: 512,
                  height: 512,
                },
                description:
                  'typee is a free typing practice app for language learners. Turn songs, movies, and content you love into interactive typing exercises — powered by AI.',
                foundingDate: '2024',
                areaServed: 'Worldwide',
                knowsAbout: [
                  'Language Learning',
                  'Typing Practice',
                  'Spaced Repetition',
                  'Active Recall',
                  'AI Flashcards',
                ],
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer support',
                  url: 'https://www.typee.app/contact',
                  availableLanguage: ['English', 'Japanese', 'Korean', 'Spanish', 'French', 'Chinese'],
                },
                sameAs: [
                  'https://www.tiktok.com/@typee.app',
                  'https://www.youtube.com/@typee.app',
                  'https://www.instagram.com/typee.app',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'typee',
                url: 'https://www.typee.app',
                description:
                  'Free typing practice app for language learning. Paste lyrics or subtitles — AI creates typing flashcards instantly. Learn Japanese, Korean, Spanish and more.',
                inLanguage: ['en', 'ja', 'ko', 'es', 'zh', 'fr'],
                speakable: {
                  '@type': 'SpeakableSpecification',
                  cssSelector: ['h1', 'h2', '.hero-description'],
                },
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
              <RefTracker />
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
