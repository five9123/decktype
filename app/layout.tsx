import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { PreferencesProvider } from '@/contexts/PreferencesContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { HtmlLangSetter } from '@/components/HtmlLangSetter';
import { BASE_URL } from '@/lib/constants';
import { THEMES } from '@/lib/themes';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'typee — Anki Deck Typing Practice',
    template: '%s | typee',
  },
  description:
    'Upload your Anki deck and turn flashcards into typing practice. Track WPM, accuracy, and master your cards faster.',
  keywords: [
    'Anki',
    'typing practice',
    'flashcards',
    'SRS',
    'spaced repetition',
    'language learning',
    'WPM',
    'Anki typing',
    'deck practice',
    'typing speed',
    'memory training',
    'study tool',
  ],
  openGraph: {
    type: 'website',
    siteName: 'typee',
    title: 'typee — Anki Deck Typing Practice',
    description:
      'Upload your Anki deck and turn flashcards into typing practice.',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'typee — Anki Deck Typing Practice',
    description:
      'Upload your Anki deck and turn flashcards into typing practice. Track WPM, accuracy, and master your cards faster.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Inline script runs before paint — prevents FOUC by applying CSS variables immediately */}
      <head>
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
    var id = (prefs && prefs.theme && THEMES[prefs.theme]) ? prefs.theme : 'light';
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
            </AuthProvider>
          </LanguageProvider>
        </PreferencesProvider>
        <Analytics />
      </body>
    </html>
  );
}
