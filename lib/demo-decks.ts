export interface DemoCard {
  id: string;
  front: string;        // Korean word (shown as prompt)
  back: string;         // English meaning (typed in front_to_back mode)
  pronunciation: string; // romanization (shown in accent color)
}

export interface DemoDeck {
  id: string;
  name: string;
  nameko: string;
  description: string;
  emoji: string;
  accentColor: string;
  cards: DemoCard[];
}

export const DEMO_DECKS: DemoDeck[] = [
  {
    id: 'korean-basics',
    name: 'Korean Basics',
    nameko: '한국어 기초',
    description: 'Essential everyday Korean vocabulary — perfect for beginners.',
    emoji: '🇰🇷',
    accentColor: '#3730a3',
    cards: [
      { id: 'kb-01', front: '사랑', back: 'love', pronunciation: 'sarang' },
      { id: 'kb-02', front: '행복', back: 'happiness', pronunciation: 'haengbok' },
      { id: 'kb-03', front: '친구', back: 'friend', pronunciation: 'chingu' },
      { id: 'kb-04', front: '가족', back: 'family', pronunciation: 'gajok' },
      { id: 'kb-05', front: '집', back: 'home', pronunciation: 'jip' },
      { id: 'kb-06', front: '음식', back: 'food', pronunciation: 'eumsik' },
      { id: 'kb-07', front: '음악', back: 'music', pronunciation: 'eumak' },
      { id: 'kb-08', front: '하늘', back: 'sky', pronunciation: 'haneul' },
      { id: 'kb-09', front: '꿈', back: 'dream', pronunciation: 'kkum' },
      { id: 'kb-10', front: '시간', back: 'time', pronunciation: 'sigan' },
      { id: 'kb-11', front: '학교', back: 'school', pronunciation: 'hakgyo' },
      { id: 'kb-12', front: '물', back: 'water', pronunciation: 'mul' },
      { id: 'kb-13', front: '빛', back: 'light', pronunciation: 'bit' },
      { id: 'kb-14', front: '책', back: 'book', pronunciation: 'chaek' },
      { id: 'kb-15', front: '고양이', back: 'cat', pronunciation: 'goyangi' },
    ],
  },
  {
    id: 'kdrama',
    name: 'K-Drama Essentials',
    nameko: '드라마 필수 단어',
    description: 'Words from Squid Game, Crash Landing on You, and more hit dramas.',
    emoji: '🎬',
    accentColor: '#831843',
    cards: [
      { id: 'kd-01', front: '운명', back: 'fate', pronunciation: 'unmyeong' },
      { id: 'kd-02', front: '기억', back: 'memory', pronunciation: 'gieok' },
      { id: 'kd-03', front: '비밀', back: 'secret', pronunciation: 'bimil' },
      { id: 'kd-04', front: '용기', back: 'courage', pronunciation: 'yonggi' },
      { id: 'kd-05', front: '희망', back: 'hope', pronunciation: 'huimang' },
      { id: 'kd-06', front: '눈물', back: 'tears', pronunciation: 'nunmul' },
      { id: 'kd-07', front: '선택', back: 'choice', pronunciation: 'seonteok' },
      { id: 'kd-08', front: '게임', back: 'game', pronunciation: 'geim' },
      { id: 'kd-09', front: '진실', back: 'truth', pronunciation: 'jinsil' },
      { id: 'kd-10', front: '배신', back: 'betrayal', pronunciation: 'baesin' },
      { id: 'kd-11', front: '복수', back: 'revenge', pronunciation: 'boksu' },
      { id: 'kd-12', front: '기회', back: 'opportunity', pronunciation: 'gihoe' },
      { id: 'kd-13', front: '그리움', back: 'longing', pronunciation: 'geuriwum' },
      { id: 'kd-14', front: '마음', back: 'heart', pronunciation: 'maeum' },
      { id: 'kd-15', front: '상금', back: 'prize money', pronunciation: 'sanggeum' },
    ],
  },
  {
    id: 'kpop',
    name: 'K-Pop Vocabulary',
    nameko: 'K-팝 단어',
    description: 'Words from BTS, BLACKPINK, TWICE and more iconic songs.',
    emoji: '🎤',
    accentColor: '#065f46',
    cards: [
      { id: 'kp-01', front: '우주', back: 'universe', pronunciation: 'uju' },
      { id: 'kp-02', front: '별', back: 'star', pronunciation: 'byeol' },
      { id: 'kp-03', front: '영원', back: 'eternity', pronunciation: 'yeongwon' },
      { id: 'kp-04', front: '노래', back: 'song', pronunciation: 'norae' },
      { id: 'kp-05', front: '춤', back: 'dance', pronunciation: 'chum' },
      { id: 'kp-06', front: '자유', back: 'freedom', pronunciation: 'jayu' },
      { id: 'kp-07', front: '설레임', back: 'flutter', pronunciation: 'seolleim' },
      { id: 'kp-08', front: '함께', back: 'together', pronunciation: 'hamkke' },
      { id: 'kp-09', front: '소리', back: 'sound', pronunciation: 'sori' },
      { id: 'kp-10', front: '태양', back: 'sun', pronunciation: 'taeyang' },
      { id: 'kp-11', front: '파도', back: 'wave', pronunciation: 'pado' },
      { id: 'kp-12', front: '이야기', back: 'story', pronunciation: 'iyagi' },
      { id: 'kp-13', front: '행운', back: 'good luck', pronunciation: 'haengun' },
      { id: 'kp-14', front: '반짝', back: 'sparkle', pronunciation: 'banjjak' },
      { id: 'kp-15', front: '세상', back: 'world', pronunciation: 'sesang' },
    ],
  },
];
