import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import { BASE_URL } from '@/lib/constants';
import LangHome from './LangHome';

const SUPPORTED_LANGS: Lang[] = ['ja', 'ko', 'es', 'zh', 'fr'];

const LANG_META: Record<string, {
  title: string;
  description: string;
  keywords: string[];
}> = {
  ja: {
    title: 'typee — 無料タイピング練習アプリ｜歌詞・字幕で語学学習',
    description: 'typeeは語学学習者のための無料タイピング練習アプリ。K-POPの歌詞やドラマの字幕を貼り付けるだけ — AIが単語カードを自動生成。日本語・韓国語・英語など50言語以上対応。',
    keywords: [
      'タイピング練習', '語学学習', 'K-POP 歌詞 韓国語', '推し活 韓国語',
      '韓国語 タイピング', 'Anki タイピング', '単語カード', 'AI フラッシュカード',
      '日本語学習', 'WPM タイピング速度', '字幕 語学', '間隔反復',
    ],
  },
  ko: {
    title: 'typee — 무료 타이핑 연습 앱｜가사·자막으로 언어 학습',
    description: 'typee는 언어 학습자를 위한 무료 타이핑 연습 앱. 노래 가사, 자막, 텍스트를 붙여넣으면 AI가 30초만에 단어 카드를 생성합니다. 일본어, 영어, 스페인어 등 50개+ 언어 지원.',
    keywords: [
      '타이핑 연습', '언어 학습', '타이핑 연습 앱', 'K-POP 가사 공부',
      '일본어 공부', '영어 타이핑', 'Anki 타이핑', '단어 카드',
      'AI 플래시카드', 'WPM 타이핑 속도', '자막 학습', '간격 반복',
    ],
  },
  es: {
    title: 'typee — App Gratuita de Práctica de Escritura para Aprender Idiomas',
    description: 'typee es una app gratuita de práctica de escritura para estudiantes de idiomas. Pega letras de canciones, subtítulos o cualquier texto — la IA crea tarjetas de vocabulario al instante. Japonés, coreano, español y 50+ idiomas.',
    keywords: [
      'práctica de escritura', 'aprender idiomas', 'app de idiomas gratis',
      'aprender japonés', 'aprender coreano', 'tarjetas de vocabulario',
      'flashcards IA', 'Anki escritura', 'WPM velocidad', 'subtítulos aprender',
      'K-pop aprender', 'repetición espaciada',
    ],
  },
  zh: {
    title: 'typee — 免费打字练习应用｜用歌曲和电影学语言',
    description: 'typee是面向语言学习者的免费打字练习应用。粘贴歌词、字幕或任意文本 — AI自动生成词汇卡片。支持日语、韩语、英语等50+种语言。',
    keywords: [
      '打字练习', '语言学习', '免费学语言', '学日语', '学韩语',
      'AI闪卡', 'Anki打字', '词汇卡片', 'WPM打字速度',
      '字幕学习', 'K-pop学韩语', '间隔重复',
    ],
  },
  fr: {
    title: 'typee — App Gratuite de Frappe pour Apprendre les Langues',
    description: 'typee est une app gratuite de pratique de frappe pour les apprenants en langues. Collez des paroles, sous-titres ou tout texte — l\'IA crée des cartes de vocabulaire. Japonais, coréen, espagnol et 50+ langues.',
    keywords: [
      'pratique de frappe', 'apprendre les langues', 'app langues gratuite',
      'apprendre le japonais', 'apprendre le coréen', 'cartes de vocabulaire',
      'flashcards IA', 'Anki frappe', 'WPM vitesse', 'sous-titres apprendre',
      'K-pop apprendre', 'répétition espacée',
    ],
  },
};

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const meta = LANG_META[lang];
  if (!meta) return {};

  const langUrl = `${BASE_URL}/${lang}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: langUrl,
      languages: {
        en: BASE_URL,
        ja: `${BASE_URL}/ja`,
        ko: `${BASE_URL}/ko`,
        es: `${BASE_URL}/es`,
        zh: `${BASE_URL}/zh`,
        fr: `${BASE_URL}/fr`,
        'x-default': BASE_URL,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'typee',
      title: meta.title,
      description: meta.description,
      url: langUrl,
      locale: lang,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    other: {
      'content-language': lang,
    },
  };
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!SUPPORTED_LANGS.includes(lang as Lang)) {
    notFound();
  }

  return <LangHome lang={lang as Lang} />;
}
