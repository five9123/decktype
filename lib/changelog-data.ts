export interface ChangelogEntry {
  version: string;
  date: string;
  tagEmoji: string;
  tag: string;
  tagKo: string;
  changes: { en: string; ko: string }[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.9.0',
    date: '2026.03',
    tagEmoji: '✨',
    tag: 'Feature',
    tagKo: '기능 추가',
    changes: [
      { en: 'Word Train: time-based single-word typing game with combo meter', ko: '워드 트레인: 콤보 미터가 있는 시간제 단어 타이핑 게임 추가' },
      { en: 'Word Rain: visual damage effects — screen shake, red border pulse on life loss', ko: '워드 레인: 라이프 손실 시 화면 흔들림, 빨간 테두리 펄스 효과 추가' },
      { en: 'Shareable Word Train & Word Rain game links', ko: '워드 트레인 & 워드 레인 게임 공유 링크' },
      { en: 'Practice mode tooltips on hover for all 4 modes', ko: '4개 모든 연습 모드에 호버 툴팁 추가' },
      { en: 'Wrong input feedback: red flash + clear on Enter in Word Rain', ko: '워드 레인에서 틀린 입력 시 빨간 피드백 + Enter로 초기화' },
    ],
  },
  {
    version: '1.8.0',
    date: '2026.02',
    tagEmoji: '🌐',
    tag: 'i18n',
    tagKo: '다국어',
    changes: [
      { en: 'EU keyboard layouts: French AZERTY, Spanish, German QWERTZ, Italian, Portuguese', ko: 'EU 키보드 레이아웃: 프랑스 AZERTY, 스페인어, 독일 QWERTZ, 이탈리아어, 포르투갈어' },
      { en: 'Japanese romaji keyboard support with IME composition handling', ko: '일본어 로마지 키보드 지원 및 IME 조합 처리' },
      { en: 'Animated hero carousel on landing page', ko: '랜딩 페이지 히어로 캐러셀 애니메이션' },
      { en: 'Landing page copy localized for Japanese K-pop learning audience', ko: '일본 K-pop 학습자를 위한 랜딩 페이지 문구 최적화' },
    ],
  },
  {
    version: '1.7.0',
    date: '2026.01',
    tagEmoji: '🔧',
    tag: 'Improvement',
    tagKo: '개선',
    changes: [
      { en: 'Full codebase security audit and performance improvements', ko: '전체 코드베이스 보안 감사 및 성능 개선' },
      { en: 'Improved mobile responsiveness across all screens', ko: '모든 화면 모바일 반응형 개선' },
      { en: 'Shareable Word Rain game links for viral sharing', ko: '워드 레인 게임 공유 링크 기능' },
      { en: 'Localized card type labels (Cloze/Basic) for all languages', ko: '카드 타입 라벨(Cloze/Basic) 전 언어 현지화' },
    ],
  },
  {
    version: '1.6.0',
    date: '2025.12',
    tagEmoji: '🎮',
    tag: 'Game',
    tagKo: '게임',
    changes: [
      { en: 'Blog system with posts in 6 languages', ko: '6개 언어로 작성된 블로그 시스템 구축' },
      { en: 'AI card generation: paste lyrics, subtitles, or articles to auto-create flashcards', ko: 'AI 카드 생성: 가사, 자막, 기사를 붙여넣으면 자동으로 플래시카드 생성' },
      { en: 'Media tab: upload SRT subtitle files to generate cards', ko: '미디어 탭: SRT 자막 파일 업로드로 카드 생성' },
      { en: 'Fill-in-the-Blank and Word Rain game modes', ko: '빈칸 채우기 및 워드 레인 게임 모드 추가' },
    ],
  },
  {
    version: '1.5.0',
    date: '2025.11',
    tagEmoji: '✨',
    tag: 'Feature',
    tagKo: '기능 추가',
    changes: [
      { en: 'Create Deck page with inline table editor', ko: '인라인 테이블 에디터가 있는 덱 생성 페이지' },
      { en: 'Guest upload flow: try creating a deck without an account', ko: '비로그인 업로드: 계정 없이 덱 생성 체험' },
      { en: 'Anki import field mapping UI with auto-detection', ko: 'Anki 임포트 필드 매핑 UI 및 자동 감지' },
      { en: 'Footer navigation redesign with 4-column layout', ko: '4열 레이아웃 푸터 네비게이션 리디자인' },
    ],
  },
  {
    version: '1.4.0',
    date: '2025.10',
    tagEmoji: '📚',
    tag: 'Learning',
    tagKo: '학습',
    changes: [
      { en: 'SM-2 spaced repetition algorithm for smart review ordering', ko: 'SM-2 스페이스드 리피티션 알고리즘 기반 스마트 리뷰 순서' },
      { en: 'Difficulty-first practice mode', ko: '어려운 단어 우선 연습 모드' },
      { en: 'Enhanced session reports with common mistakes and progress comparison', ko: '자주 틀리는 단어 분석 및 진행 비교가 포함된 세션 리포트' },
      { en: 'Mastery tracking: Learning → Familiar → Mastered stages', ko: '마스터리 추적: 학습 중 → 익숙함 → 완전 숙달 단계' },
    ],
  },
  {
    version: '1.3.0',
    date: '2025.09',
    tagEmoji: '🎯',
    tag: 'UX',
    tagKo: 'UX',
    changes: [
      { en: 'Virtual keyboard with next-key hints', ko: '다음 키 힌트가 있는 가상 키보드' },
      { en: 'TTS word pronunciation on card display', ko: '카드 표시 시 TTS 단어 발음' },
      { en: 'Confetti animation on correct answers, shake on incorrect', ko: '정답 시 컨페티 애니메이션, 오답 시 흔들림 효과' },
      { en: 'Korean IME composition handling improvements', ko: '한국어 IME 조합 처리 개선' },
    ],
  },
  {
    version: '1.2.0',
    date: '2025.08',
    tagEmoji: '🏗️',
    tag: 'Platform',
    tagKo: '플랫폼',
    changes: [
      { en: 'Stripe Pro subscription billing integration', ko: 'Stripe Pro 구독 결제 연동' },
      { en: 'SEO: sitemap, robots.txt, OpenGraph images, structured data', ko: 'SEO 최적화: 사이트맵, robots.txt, OpenGraph 이미지, 구조화 데이터' },
      { en: 'Login page redesign with Google and X (Twitter) authentication', ko: '로그인 페이지 리디자인 및 Google, X(Twitter) 인증 추가' },
      { en: 'About, Contact, and Guide pages', ko: '소개, 문의, 가이드 페이지 추가' },
    ],
  },
  {
    version: '1.1.0',
    date: '2025.07',
    tagEmoji: '🌐',
    tag: 'i18n',
    tagKo: '다국어',
    changes: [
      { en: '6 language UI: English, Korean, Japanese, Spanish, Chinese, French', ko: '6개 언어 UI: 영어, 한국어, 일본어, 스페인어, 중국어, 프랑스어' },
      { en: 'Browser language auto-detection', ko: '브라우저 언어 자동 감지' },
      { en: 'Demo page: try all modes without uploading a deck', ko: '데모 페이지: 덱 업로드 없이 모든 모드 체험' },
      { en: 'Default theme changed to Light', ko: '기본 테마를 라이트로 변경' },
    ],
  },
  {
    version: '1.0.0',
    date: '2025.06',
    tagEmoji: '🚀',
    tag: 'Launch',
    tagKo: '출시',
    changes: [
      { en: 'Core typing practice: Type Word (back-to-front) mode', ko: '핵심 타이핑 연습: 단어 타이핑(앞→뒤) 모드' },
      { en: 'Anki deck (.apkg) upload and parsing', ko: 'Anki 덱(.apkg) 업로드 및 파싱' },
      { en: 'WPM and accuracy tracking with session results', ko: 'WPM 및 정확도 추적과 세션 결과' },
      { en: 'Dark/Light theme support with 8 color themes', ko: '다크/라이트 테마 지원 및 8개 컬러 테마' },
      { en: 'Pronunciation field support and inline card editing', ko: '발음 필드 지원 및 인라인 카드 편집' },
    ],
  },
];
