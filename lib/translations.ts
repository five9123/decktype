export type Lang = 'en' | 'ko' | 'ja' | 'es' | 'zh' | 'fr';

export type Translations = {
  // App
  appName: string;
  subtitle: string;
  description: string;
  footer: string;

  // Auth
  signIn: string;
  signOut: string;
  signInWithGoogle: string;
  signInWithEmail: string;
  emailPlaceholder: string;

  // Dashboard
  myDecks: string;
  uploadDeck: string;
  noDeckYet: string;
  cards: string;
  lastPracticed: string;
  deckLimitReached: string;

  // Upload
  uploadTitle: string;
  uploadSubtitle: string;
  dropHere: string;
  browseFiles: string;
  parsing: string;
  parsingSteps: string;
  saveDeck: string;
  cardPreview: string;
  front: string;
  back: string;

  // Practice
  startPractice: string;
  frontToBack: string;
  backToFront: string;
  sequential: string;
  random: string;
  difficultFirst: string;
  typeHere: string;
  correctMsg: string;
  skip: string;
  seeResults: string;

  // Results
  resultsTitle: string;
  outstanding: string;
  greatJob: string;
  goodEffort: string;
  keepGoing: string;
  accuracyLabel: string;
  speedLabel: string;
  correctLabel: string;
  timeLabel: string;
  practiceAgain: string;
  backToDeck: string;

  // Stats
  statsTitle: string;
  statsSubtitle: string;
  noStatsYet: string;
  totalSessions: string;
  bestAccuracy: string;

  // UI
  darkMode: string;
  lightMode: string;
  language: string;
  loading: string;
  error: string;
  delete: string;
  cancel: string;
  confirm: string;

  // Preferences (Feature 2)
  preferencesTitle: string;
  fontSizeLabel: string;
  soundEffects: string;
  sound_mechanical: string;
  sound_soft: string;
  sound_typewriter: string;
  focusModeLabel: string;
  feedbackEffectsLabel: string;

  // Theme names
  themeDark: string;
  themeLight: string;
  themeDracula: string;
  themeNord: string;
  themeSolarized: string;
  themeCatppuccin: string;
  themeGruvbox: string;
  themeTokyoNight: string;
  themeOneDark: string;
  themeRosePine: string;

  // Smart Review (Feature 1)
  smartReview: string;
  learning: string;
  familiar: string;
  mastered: string;
  masteryProgress: string;
  dueForReview: string;

  // Progress (Feature 3)
  overview: string;
  decksTab: string;
  historyTab: string;
  currentStreak: string;
  longestStreak: string;
  practiceToday: string;
  personalBest: string;
  newPB: string;
  attempts: string;
  weakestCards: string;
  sessionsLabel: string;

  // Create Deck page
  createDeck: string;
  createDeckTitle: string;
  createDeckSubtitle: string;
  deckNameLabel: string;
  deckNamePlaceholder: string;
  deckNameRequired: string;
  cardsRequired: string;
  cardSaveError: string;
  columnFront: string;
  columnBack: string;
  columnPronunciation: string;
  addRow: string;
  addTenRows: string;
  maxLabel: string;
  savingLabel: string;

  // Landing page
  landingBadge: string;
  landingHero1: string;
  landingHero2: string;
  landingSubtext: string;
  startForFree: string;
  seeHowItWorks: string;
  howItWorksLabel: string;
  howItWorksTitle: string;
  step01Title: string;
  step01Desc: string;
  step02Title: string;
  step02Desc: string;
  step03Title: string;
  step03Desc: string;
  featuresLabel: string;
  featuresTitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  getStartedLabel: string;
  getStartedTitle: string;
  getStartedDesc: string;

  // Demo page
  tryDemo: string;
  demoSubtitle: string;
  demoModeHintMeaning: string;
  demoModeHintWord: string;
  demoSignupTitle: string;
  demoSignupDesc: string;
  demoSignupCta: string;

  // Pricing & Billing
  upgradeToPro: string;
  proFeatures: string;
  pricingTitle: string;
  pricingSubtitle: string;
  pricingMonthly: string;
  pricingAnnual: string;
  annualDiscount: string;
  pricingFreeTier: string;
  pricingProTier: string;
  getPro: string;
  pricingPerMonth: string;
  pricingPerYear: string;
  currentPlanFree: string;
  currentPlanPro: string;
  manageBilling: string;
  upgradeSuccess: string;
  deckLimitReachedCta: string;
  cardLimitReachedCta: string;
  statsProGate: string;
  billingTitle: string;

  // Guest flow
  uploadYourDeck: string;
  guestUploadTitle: string;
  guestUploadDesc: string;
  tryPractice: string;
  guestSignupTitle: string;
  guestSignupDesc: string;

  // Footer navigation
  footerProduct: string;
  footerSupport: string;
  footerLegal: string;
  footerDemo: string;
  footerUpload: string;
  footerPricing: string;
  footerGuide: string;
  footerContact: string;
  footerTerms: string;
  footerPrivacy: string;
  comingSoon: string;
};

export const TRANSLATIONS: Record<Lang, Translations> = {
  en: {
    appName: 'typee',
    subtitle: 'Upload your Anki deck.\nPractice typing.\nImprove memory.',
    description: 'Turn your Anki flashcards into typing practice. Track WPM, accuracy, and master your cards faster.',
    footer: 'typee — Anki meets typing practice',

    signIn: 'Sign In',
    signOut: 'Sign Out',
    signInWithGoogle: 'Continue with Google',
    signInWithEmail: 'Continue with Email',
    emailPlaceholder: 'Enter your email...',

    myDecks: 'My Decks',
    uploadDeck: 'Upload Deck',
    noDeckYet: 'No decks yet. Upload an .apkg file to get started!',
    cards: 'cards',
    lastPracticed: 'Last practiced',
    deckLimitReached: 'Free plan limit reached (1 deck). Upgrade to Pro for unlimited decks.',

    uploadTitle: 'Upload Anki Deck',
    uploadSubtitle: 'Drag & drop your .apkg file or click to browse',
    dropHere: 'Drop your .apkg file here',
    browseFiles: 'Browse Files',
    parsing: 'Parsing deck...',
    parsingSteps: 'Extracting cards',
    saveDeck: 'Save Deck',
    cardPreview: 'Card Preview',
    front: 'Front',
    back: 'Back',

    startPractice: 'Start Practice',
    frontToBack: 'Type Meaning',
    backToFront: 'Type Word',
    sequential: 'Sequential',
    random: 'Random',
    difficultFirst: 'Difficult First',
    typeHere: 'Type here...',
    correctMsg: 'Correct!',
    skip: 'Skip',
    seeResults: 'See Results',

    resultsTitle: 'Practice Complete!',
    outstanding: 'Outstanding!',
    greatJob: 'Great Job!',
    goodEffort: 'Good Effort!',
    keepGoing: 'Keep Going!',
    accuracyLabel: 'Accuracy',
    speedLabel: 'Speed',
    correctLabel: 'Correct',
    timeLabel: 'Time',
    practiceAgain: 'Practice Again',
    backToDeck: 'Back to Deck',

    statsTitle: 'My Stats',
    statsSubtitle: 'Your practice history and progress',
    noStatsYet: 'No practice records yet. Start practicing to see your stats!',
    totalSessions: 'Sessions',
    bestAccuracy: 'Best Accuracy',

    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    loading: 'Loading...',
    error: 'Something went wrong',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',

    preferencesTitle: 'Preferences',
    fontSizeLabel: 'Font Size',
    soundEffects: 'Sound Effects',
    sound_mechanical: 'Mechanical',
    sound_soft: 'Soft',
    sound_typewriter: 'Typewriter',
    focusModeLabel: 'Focus Mode',
    feedbackEffectsLabel: 'Feedback Effects',

    themeDark: 'Dark',
    themeLight: 'Light',
    themeDracula: 'Dracula',
    themeNord: 'Nord',
    themeSolarized: 'Solarized',
    themeCatppuccin: 'Catppuccin',
    themeGruvbox: 'Gruvbox',
    themeTokyoNight: 'Tokyo Night',
    themeOneDark: 'One Dark',
    themeRosePine: 'Rosé Pine',

    smartReview: 'Smart Review',
    learning: 'Learning',
    familiar: 'Familiar',
    mastered: 'Mastered',
    masteryProgress: 'Mastery Progress',
    dueForReview: 'Due for review',

    overview: 'Overview',
    decksTab: 'Decks',
    historyTab: 'History',
    currentStreak: 'Current Streak',
    longestStreak: 'Longest Streak',
    practiceToday: 'Practice today to keep your streak!',
    personalBest: 'Personal Best',
    newPB: 'New Personal Best!',
    attempts: 'Attempts',
    weakestCards: 'Weakest Cards',
    sessionsLabel: 'sessions',

    createDeck: '+ Create Deck',
    createDeckTitle: 'Create New Deck',
    createDeckSubtitle: 'Enter cards manually',
    deckNameLabel: 'Deck Name',
    deckNamePlaceholder: 'e.g. Basic Korean Words',
    deckNameRequired: 'Please enter a deck name.',
    cardsRequired: 'Please add at least one card.',
    cardSaveError: 'Error saving cards. Please try again.',
    columnFront: 'Word (Front)',
    columnBack: 'Meaning (Back)',
    columnPronunciation: 'Pronunciation',
    addRow: '+ Add Row',
    addTenRows: '+ Add 10 Rows',
    maxLabel: '(max)',
    savingLabel: 'Saving...',

    landingBadge: 'Free to start · No credit card required',
    landingHero1: 'Type it. Learn it.',
    landingHero2: 'Master any deck.',
    landingSubtext: 'Turn your Anki flashcards into a typing practice session. Build muscle memory, track WPM, and actually remember what you study.',
    startForFree: 'Start for Free',
    seeHowItWorks: 'See how it works',
    howItWorksLabel: 'HOW IT WORKS',
    howItWorksTitle: 'Three steps. Zero friction.',
    step01Title: 'Upload your deck',
    step01Desc: 'Drop any .apkg Anki file. We parse it instantly — cards, fields, and all.',
    step02Title: 'Type your answers',
    step02Desc: 'See the front of each card. Type the answer. Get instant feedback on every keystroke.',
    step03Title: 'Watch yourself improve',
    step03Desc: 'Track WPM, accuracy, and mastery level for every single card over time.',
    featuresLabel: 'FEATURES',
    featuresTitle: 'Built for real learning.',
    feature1Title: 'Smart Review Algorithm',
    feature1Desc: 'Cards you keep getting wrong appear more often. Cards you\'ve mastered fade back. Powered by a confidence score that updates in real time.',
    feature2Title: '10 Beautiful Themes',
    feature2Desc: 'Dark, Light, Dracula, Nord, Tokyo Night, and more. Switch instantly. Your preference is saved locally — no account needed.',
    feature3Title: 'Deep Progress Tracking',
    feature3Desc: 'Activity heatmap, WPM trend chart, personal bests, and per-card stats. Know exactly which cards you\'re struggling with.',
    feature4Title: 'Any Language, Any Deck',
    feature4Desc: 'Japanese kanji, Korean vocab, Spanish verbs, medical terminology. If it\'s in Anki, it works here.',
    getStartedLabel: 'GET STARTED',
    getStartedTitle: 'Start typing in seconds.',
    getStartedDesc: 'Upload your deck, pick a mode, and start building real memory. No setup. No config.',

    tryDemo: 'Try Without a Deck',
    demoSubtitle: 'No account needed. Pick a deck and start typing.',
    demoModeHintMeaning: 'See the Korean word → type the English meaning',
    demoModeHintWord: 'See the Korean word + English hint → type the Korean word',
    demoSignupTitle: 'Save Your Progress',
    demoSignupDesc: 'Create a free account to track WPM, mastery, and unlock all features.',
    demoSignupCta: 'Create Free Account',

    upgradeToPro: 'Upgrade to Pro',
    proFeatures: 'Everything in Free, plus:',
    pricingTitle: 'Simple, honest pricing',
    pricingSubtitle: 'Start free. Upgrade when you\'re ready.',
    pricingMonthly: 'Monthly',
    pricingAnnual: 'Annual',
    annualDiscount: '20% off',
    pricingFreeTier: 'Free',
    pricingProTier: 'Pro',
    getPro: 'Get Pro',
    pricingPerMonth: '/mo',
    pricingPerYear: '/yr',
    currentPlanFree: 'You are on the Free plan',
    currentPlanPro: 'You are on the Pro plan',
    manageBilling: 'Manage Subscription',
    upgradeSuccess: 'Welcome to Pro! 🎉',
    deckLimitReachedCta: 'Upgrade to Pro for unlimited decks →',
    cardLimitReachedCta: 'Upgrade to Pro for unlimited cards →',
    statsProGate: 'Advanced stats are available on the Pro plan.',
    billingTitle: 'Billing & Plan',

    uploadYourDeck: 'Upload Your Deck',
    guestUploadTitle: 'Try before you sign up',
    guestUploadDesc: 'Upload your Anki deck and practice for free. No account required.',
    tryPractice: 'Try Practice',
    guestSignupTitle: 'Save your progress',
    guestSignupDesc: 'Create a free account to save this deck and track your progress.',

    footerProduct: 'Product',
    footerSupport: 'Support',
    footerLegal: 'Legal',
    footerDemo: 'Try without a deck',
    footerUpload: 'Upload deck',
    footerPricing: 'Pricing',
    footerGuide: 'Usage guide',
    footerContact: 'Contact us',
    footerTerms: 'Terms of Service',
    footerPrivacy: 'Privacy Policy',
    comingSoon: 'Coming soon.',
  },

  ko: {
    appName: 'typee',
    subtitle: 'Anki 덱을 업로드하세요.\n타이핑으로 연습하세요.\n기억력을 높이세요.',
    description: 'Anki 플래시카드를 타이핑 연습으로 변환합니다. WPM, 정확도를 추적하고 카드를 더 빠르게 마스터하세요.',
    footer: 'typee — Anki와 타이핑 연습의 만남',

    signIn: '로그인',
    signOut: '로그아웃',
    signInWithGoogle: 'Google로 계속',
    signInWithEmail: '이메일로 계속',
    emailPlaceholder: '이메일을 입력하세요...',

    myDecks: '내 덱',
    uploadDeck: '덱 업로드',
    noDeckYet: '아직 덱이 없습니다. .apkg 파일을 업로드해서 시작하세요!',
    cards: '카드',
    lastPracticed: '최근 연습',
    deckLimitReached: '무료 플랜 한도 도달 (1개 덱). Pro로 업그레이드하면 무제한입니다.',

    uploadTitle: 'Anki 덱 업로드',
    uploadSubtitle: '.apkg 파일을 드래그 앤 드롭하거나 클릭하여 선택하세요',
    dropHere: '.apkg 파일을 여기에 놓으세요',
    browseFiles: '파일 선택',
    parsing: '덱 파싱 중...',
    parsingSteps: '카드 추출 중',
    saveDeck: '덱 저장',
    cardPreview: '카드 미리보기',
    front: '앞면',
    back: '뒷면',

    startPractice: '연습 시작',
    frontToBack: '뜻 타이핑',
    backToFront: '단어 타이핑',
    sequential: '순차',
    random: '랜덤',
    difficultFirst: '어려운 것 먼저',
    typeHere: '여기에 입력하세요...',
    correctMsg: '정답!',
    skip: '건너뛰기',
    seeResults: '결과 보기',

    resultsTitle: '연습 완료!',
    outstanding: '훌륭합니다!',
    greatJob: '잘했어요!',
    goodEffort: '좋은 노력!',
    keepGoing: '계속 해봐요!',
    accuracyLabel: '정확도',
    speedLabel: '속도',
    correctLabel: '맞은 수',
    timeLabel: '시간',
    practiceAgain: '다시 연습',
    backToDeck: '덱으로 돌아가기',

    statsTitle: '내 통계',
    statsSubtitle: '연습 기록과 진행 상황',
    noStatsYet: '아직 연습 기록이 없습니다. 연습을 시작해서 통계를 확인하세요!',
    totalSessions: '세션',
    bestAccuracy: '최고 정확도',

    darkMode: '다크 모드',
    lightMode: '라이트 모드',
    language: '언어',
    loading: '로딩 중...',
    error: '문제가 발생했습니다',
    delete: '삭제',
    cancel: '취소',
    confirm: '확인',

    preferencesTitle: '환경설정',
    fontSizeLabel: '글꼴 크기',
    soundEffects: '타이핑 소리',
    sound_mechanical: '기계식',
    sound_soft: '소프트',
    sound_typewriter: '타자기',
    focusModeLabel: '집중 모드',
    feedbackEffectsLabel: '피드백 효과',

    themeDark: '다크',
    themeLight: '라이트',
    themeDracula: 'Dracula',
    themeNord: 'Nord',
    themeSolarized: 'Solarized',
    themeCatppuccin: 'Catppuccin',
    themeGruvbox: 'Gruvbox',
    themeTokyoNight: 'Tokyo Night',
    themeOneDark: 'One Dark',
    themeRosePine: 'Rosé Pine',

    smartReview: '스마트 복습',
    learning: '학습 중',
    familiar: '익숙함',
    mastered: '마스터',
    masteryProgress: '학습 진행률',
    dueForReview: '복습 예정',

    overview: '개요',
    decksTab: '덱',
    historyTab: '기록',
    currentStreak: '연속 연습',
    longestStreak: '최장 연속',
    practiceToday: '오늘 연습하고 연속 기록을 유지하세요!',
    personalBest: '최고 기록',
    newPB: '새로운 최고 기록!',
    attempts: '시도 횟수',
    weakestCards: '취약 카드',
    sessionsLabel: '세션',

    createDeck: '+ 직접 만들기',
    createDeckTitle: '새 덱 만들기',
    createDeckSubtitle: '카드를 직접 입력해서 덱을 만드세요',
    deckNameLabel: '덱 이름',
    deckNamePlaceholder: '예) 한국어 기초 단어',
    deckNameRequired: '덱 이름을 입력해주세요.',
    cardsRequired: '카드를 1개 이상 입력해주세요.',
    cardSaveError: '카드 저장 중 오류가 발생했습니다.',
    columnFront: '단어 (앞면)',
    columnBack: '뜻 (뒷면)',
    columnPronunciation: '발음기호',
    addRow: '+ 행 추가',
    addTenRows: '+ 10행 추가',
    maxLabel: '(최대)',
    savingLabel: '저장 중...',

    landingBadge: '무료 시작 · 결제 불필요',
    landingHero1: '타이핑하고. 배우고.',
    landingHero2: '어떤 덱이든 마스터하세요.',
    landingSubtext: 'Anki 플래시카드를 타이핑 연습 세션으로 변환하세요. 근육 기억을 키우고, WPM을 추적하고, 공부한 내용을 실제로 기억하세요.',
    startForFree: '무료로 시작',
    seeHowItWorks: '작동 방식 보기',
    howItWorksLabel: '작동 방식',
    howItWorksTitle: '3단계. 간편하게.',
    step01Title: '덱 업로드',
    step01Desc: '.apkg Anki 파일을 드롭하세요. 카드와 필드를 즉시 파싱합니다.',
    step02Title: '답변 타이핑',
    step02Desc: '각 카드의 앞면을 보고 답을 입력하세요. 모든 키 입력에 즉각적인 피드백을 받으세요.',
    step03Title: '실력 향상 확인',
    step03Desc: '모든 카드의 WPM, 정확도, 마스터리 레벨을 시간별로 추적하세요.',
    featuresLabel: '기능',
    featuresTitle: '진짜 학습을 위해 만들었습니다.',
    feature1Title: '스마트 복습 알고리즘',
    feature1Desc: '틀린 카드는 더 자주 나타납니다. 마스터한 카드는 뒤로 물러납니다. 실시간으로 업데이트되는 신뢰도 점수 기반.',
    feature2Title: '10가지 아름다운 테마',
    feature2Desc: 'Dark, Light, Dracula, Nord, Tokyo Night 등. 즉시 전환. 설정은 로컬에 저장됩니다.',
    feature3Title: '심층 진행률 추적',
    feature3Desc: '활동 히트맵, WPM 추이 차트, 개인 최고 기록, 카드별 통계. 어떤 카드가 어려운지 정확히 파악하세요.',
    feature4Title: '모든 언어, 모든 덱',
    feature4Desc: '일본어 한자, 한국어 어휘, 스페인어 동사, 의학 용어 등. Anki에 있으면 여기서도 작동합니다.',
    getStartedLabel: '시작하기',
    getStartedTitle: '몇 초 만에 타이핑 시작.',
    getStartedDesc: '덱을 업로드하고 모드를 선택한 다음 실제 기억을 만들어 보세요. 설정 없음.',

    tryDemo: '덱 없이 체험',
    demoSubtitle: '로그인 없이 바로 체험하세요. 덱을 선택하고 타이핑을 시작하세요.',
    demoModeHintMeaning: '한국어 단어를 보고 → 영어 뜻을 타이핑',
    demoModeHintWord: '한국어 단어 + 영어 힌트를 보고 → 한국어 단어를 타이핑',
    demoSignupTitle: '진행 상황 저장하기',
    demoSignupDesc: '무료 계정을 만들어 WPM, 마스터리를 추적하고 모든 기능을 이용하세요.',
    demoSignupCta: '무료 계정 만들기',

    upgradeToPro: 'Pro로 업그레이드',
    proFeatures: 'Free의 모든 기능, 그리고:',
    pricingTitle: '심플하고 투명한 요금제',
    pricingSubtitle: '무료로 시작하고 준비되면 업그레이드하세요.',
    pricingMonthly: '월간',
    pricingAnnual: '연간',
    annualDiscount: '20% 할인',
    pricingFreeTier: 'Free',
    pricingProTier: 'Pro',
    getPro: 'Pro 시작하기',
    pricingPerMonth: '/월',
    pricingPerYear: '/년',
    currentPlanFree: '현재 무료 플랜을 이용 중입니다',
    currentPlanPro: '현재 Pro 플랜을 이용 중입니다',
    manageBilling: '구독 관리',
    upgradeSuccess: 'Pro에 오신 것을 환영합니다! 🎉',
    deckLimitReachedCta: '무제한 덱을 위해 Pro로 업그레이드 →',
    cardLimitReachedCta: '무제한 카드를 위해 Pro로 업그레이드 →',
    statsProGate: '고급 통계는 Pro 플랜에서 이용 가능합니다.',
    billingTitle: '결제 및 플랜',

    uploadYourDeck: '덱 업로드',
    guestUploadTitle: '가입 없이 먼저 체험',
    guestUploadDesc: 'Anki 덱을 업로드하고 무료로 연습해보세요. 계정이 필요하지 않습니다.',
    tryPractice: '연습 시작',
    guestSignupTitle: '진행 상황 저장하기',
    guestSignupDesc: '무료 계정을 만들어 이 덱을 저장하고 학습 기록을 추적하세요.',

    footerProduct: '제품',
    footerSupport: '지원',
    footerLegal: '법적 고지',
    footerDemo: '덱 없이 체험',
    footerUpload: '덱 업로드',
    footerPricing: '요금제',
    footerGuide: '사용 가이드',
    footerContact: '문의하기',
    footerTerms: '이용약관',
    footerPrivacy: '개인정보처리방침',
    comingSoon: '준비 중입니다.',
  },

  ja: {
    appName: 'typee',
    subtitle: 'Ankiデッキをアップロード。\nタイピングで練習。\n記憶力を向上。',
    description: 'Ankiフラッシュカードをタイピング練習に変換。WPM・精度を追跡してカードをマスターしよう。',
    footer: 'typee — Ankiとタイピング練習の融合',

    signIn: 'ログイン',
    signOut: 'ログアウト',
    signInWithGoogle: 'Googleで続ける',
    signInWithEmail: 'メールで続ける',
    emailPlaceholder: 'メールアドレスを入力...',

    myDecks: 'マイデッキ',
    uploadDeck: 'デッキをアップロード',
    noDeckYet: 'まだデッキがありません。.apkgファイルをアップロードして始めましょう！',
    cards: 'カード',
    lastPracticed: '最終練習',
    deckLimitReached: '無料プランの上限です（1デッキ）。Proにアップグレードで無制限。',

    uploadTitle: 'Ankiデッキをアップロード',
    uploadSubtitle: '.apkgファイルをドラッグ＆ドロップまたはクリックして選択',
    dropHere: '.apkgファイルをここにドロップ',
    browseFiles: 'ファイルを選択',
    parsing: 'デッキを解析中...',
    parsingSteps: 'カードを抽出中',
    saveDeck: 'デッキを保存',
    cardPreview: 'カードプレビュー',
    front: '表',
    back: '裏',

    startPractice: '練習開始',
    frontToBack: '意味を入力',
    backToFront: '単語を入力',
    sequential: '順番通り',
    random: 'ランダム',
    difficultFirst: '難しい順',
    typeHere: 'ここに入力...',
    correctMsg: '正解！',
    skip: 'スキップ',
    seeResults: '結果を見る',

    resultsTitle: '練習完了！',
    outstanding: '素晴らしい！',
    greatJob: 'よくできました！',
    goodEffort: 'よく頑張りました！',
    keepGoing: '頑張り続けよう！',
    accuracyLabel: '精度',
    speedLabel: '速度',
    correctLabel: '正解数',
    timeLabel: '時間',
    practiceAgain: 'もう一度練習',
    backToDeck: 'デッキに戻る',

    statsTitle: '統計',
    statsSubtitle: '練習履歴と進捗',
    noStatsYet: 'まだ練習記録がありません。練習を始めて統計を確認しましょう！',
    totalSessions: 'セッション',
    bestAccuracy: '最高精度',

    darkMode: 'ダークモード',
    lightMode: 'ライトモード',
    language: '言語',
    loading: '読み込み中...',
    error: 'エラーが発生しました',
    delete: '削除',
    cancel: 'キャンセル',
    confirm: '確認',

    preferencesTitle: '設定',
    fontSizeLabel: 'フォントサイズ',
    soundEffects: 'タイピング音',
    sound_mechanical: 'メカニカル',
    sound_soft: 'ソフト',
    sound_typewriter: 'タイプライター',
    focusModeLabel: '集中モード',
    feedbackEffectsLabel: 'フィードバック効果',

    themeDark: 'ダーク',
    themeLight: 'ライト',
    themeDracula: 'Dracula',
    themeNord: 'Nord',
    themeSolarized: 'Solarized',
    themeCatppuccin: 'Catppuccin',
    themeGruvbox: 'Gruvbox',
    themeTokyoNight: 'Tokyo Night',
    themeOneDark: 'One Dark',
    themeRosePine: 'Rosé Pine',

    smartReview: 'スマート復習',
    learning: '学習中',
    familiar: '馴染み',
    mastered: 'マスター',
    masteryProgress: '習得進捗',
    dueForReview: '復習予定',

    overview: '概要',
    decksTab: 'デッキ',
    historyTab: '履歴',
    currentStreak: '連続練習',
    longestStreak: '最長連続',
    practiceToday: '今日練習して連続記録を維持しましょう！',
    personalBest: '自己ベスト',
    newPB: '新しい自己ベスト！',
    attempts: '試行回数',
    weakestCards: '弱点カード',
    sessionsLabel: 'セッション',

    createDeck: '+ デッキ作成',
    createDeckTitle: '新しいデッキを作成',
    createDeckSubtitle: 'カードを手動で入力してデッキを作成',
    deckNameLabel: 'デッキ名',
    deckNamePlaceholder: '例) 日本語基礎単語',
    deckNameRequired: 'デッキ名を入力してください。',
    cardsRequired: 'カードを1枚以上入力してください。',
    cardSaveError: 'カードの保存中にエラーが発生しました。',
    columnFront: '単語（表）',
    columnBack: '意味（裏）',
    columnPronunciation: '読み方',
    addRow: '+ 行を追加',
    addTenRows: '+ 10行を追加',
    maxLabel: '（上限）',
    savingLabel: '保存中...',

    landingBadge: '無料で始める · クレジットカード不要',
    landingHero1: '打って。学んで。',
    landingHero2: 'どんなデッキもマスターしよう。',
    landingSubtext: 'AnkiフラッシュカードをタイピングPracticeセッションに変換。筋肉記憶を鍛え、WPMを追跡し、学んだことを本当に覚えましょう。',
    startForFree: '無料で始める',
    seeHowItWorks: '使い方を見る',
    howItWorksLabel: '使い方',
    howItWorksTitle: '3ステップ。簡単シンプル。',
    step01Title: 'デッキをアップロード',
    step01Desc: '.apkg Ankiファイルをドロップするだけ。カードとフィールドを即座に解析します。',
    step02Title: '答えをタイピング',
    step02Desc: '各カードの表を見て答えを入力。キーストロークごとに即フィードバック。',
    step03Title: '上達を確認',
    step03Desc: 'すべてのカードのWPM、精度、習熟度を時系列で追跡。',
    featuresLabel: '機能',
    featuresTitle: '本物の学習のために作られています。',
    feature1Title: 'スマートレビューアルゴリズム',
    feature1Desc: '間違えるカードはより頻繁に登場。マスターしたカードは引っ込みます。リアルタイムで更新される自信スコアで動作。',
    feature2Title: '10種類の美しいテーマ',
    feature2Desc: 'ダーク、ライト、ドラキュラ、ノルド、Tokyo Nightなど。即時切替。設定はローカルに保存。',
    feature3Title: '詳細な進捗追跡',
    feature3Desc: 'アクティビティヒートマップ、WPMトレンドチャート、個人ベスト、カード別統計。苦手なカードを正確に把握。',
    feature4Title: 'あらゆる言語、あらゆるデッキ',
    feature4Desc: '日本語漢字、韓国語語彙、スペイン語動詞、医学用語。Ankiにあるものはここでも動きます。',
    getStartedLabel: '今すぐ始める',
    getStartedTitle: '数秒でタイピング開始。',
    getStartedDesc: 'デッキをアップロードし、モードを選択して、本物の記憶を作り始めましょう。設定不要。',

    tryDemo: 'デッキなしで体験',
    demoSubtitle: 'アカウント不要。デッキを選んでタイピングを始めましょう。',
    demoModeHintMeaning: '韓国語の単語を見て → 英語の意味をタイピング',
    demoModeHintWord: '韓国語の単語＋英語ヒントを見て → 韓国語をタイピング',
    demoSignupTitle: '進捗を保存する',
    demoSignupDesc: '無料アカウントを作成してWPM・習熟度を追跡し、全機能をご利用ください。',
    demoSignupCta: '無料アカウントを作成',

    upgradeToPro: 'Proにアップグレード',
    proFeatures: 'Freeのすべて、さらに:',
    pricingTitle: 'シンプルで明瞭な料金',
    pricingSubtitle: '無料で始めて、準備ができたらアップグレード。',
    pricingMonthly: '月払い',
    pricingAnnual: '年払い',
    annualDiscount: '20%オフ',
    pricingFreeTier: 'Free',
    pricingProTier: 'Pro',
    getPro: 'Proを始める',
    pricingPerMonth: '/月',
    pricingPerYear: '/年',
    currentPlanFree: '現在Freeプランをご利用中です',
    currentPlanPro: '現在Proプランをご利用中です',
    manageBilling: 'サブスクリプション管理',
    upgradeSuccess: 'Proへようこそ！🎉',
    deckLimitReachedCta: '無制限デッキのためProにアップグレード →',
    cardLimitReachedCta: '無制限カードのためProにアップグレード →',
    statsProGate: '高度な統計はProプランでご利用いただけます。',
    billingTitle: '請求とプラン',

    uploadYourDeck: 'デッキをアップロード',
    guestUploadTitle: '登録前に体験',
    guestUploadDesc: 'Ankiデッキをアップロードして無料で練習。アカウント不要。',
    tryPractice: '練習を始める',
    guestSignupTitle: '進捗を保存する',
    guestSignupDesc: '無料アカウントを作成してこのデッキを保存し、進捗を記録しましょう。',

    footerProduct: 'プロダクト',
    footerSupport: 'サポート',
    footerLegal: '法的情報',
    footerDemo: 'デッキなしで体験',
    footerUpload: 'デッキをアップロード',
    footerPricing: '料金プラン',
    footerGuide: '使い方ガイド',
    footerContact: 'お問い合わせ',
    footerTerms: '利用規約',
    footerPrivacy: 'プライバシーポリシー',
    comingSoon: '準備中です。',
  },

  es: {
    appName: 'typee',
    subtitle: 'Sube tu mazo Anki.\nPractica escribiendo.\nMejora tu memoria.',
    description: 'Convierte tus tarjetas Anki en práctica de escritura. Mide tu WPM, precisión y domina tus tarjetas más rápido.',
    footer: 'typee — Anki se une a la práctica de escritura',

    signIn: 'Iniciar sesión',
    signOut: 'Cerrar sesión',
    signInWithGoogle: 'Continuar con Google',
    signInWithEmail: 'Continuar con Email',
    emailPlaceholder: 'Introduce tu email...',

    myDecks: 'Mis Mazos',
    uploadDeck: 'Subir Mazo',
    noDeckYet: 'Aún no hay mazos. ¡Sube un archivo .apkg para empezar!',
    cards: 'tarjetas',
    lastPracticed: 'Última práctica',
    deckLimitReached: 'Límite del plan gratuito (1 mazo). Mejora a Pro para mazos ilimitados.',

    uploadTitle: 'Subir Mazo Anki',
    uploadSubtitle: 'Arrastra y suelta tu archivo .apkg o haz clic para buscar',
    dropHere: 'Suelta tu archivo .apkg aquí',
    browseFiles: 'Buscar Archivos',
    parsing: 'Analizando mazo...',
    parsingSteps: 'Extrayendo tarjetas',
    saveDeck: 'Guardar Mazo',
    cardPreview: 'Vista previa',
    front: 'Frente',
    back: 'Reverso',

    startPractice: 'Comenzar Práctica',
    frontToBack: 'Escribir Significado',
    backToFront: 'Escribir Palabra',
    sequential: 'Secuencial',
    random: 'Aleatorio',
    difficultFirst: 'Difícil primero',
    typeHere: 'Escribe aquí...',
    correctMsg: '¡Correcto!',
    skip: 'Saltar',
    seeResults: 'Ver Resultados',

    resultsTitle: '¡Práctica Completa!',
    outstanding: '¡Sobresaliente!',
    greatJob: '¡Buen trabajo!',
    goodEffort: '¡Buen esfuerzo!',
    keepGoing: '¡Sigue adelante!',
    accuracyLabel: 'Precisión',
    speedLabel: 'Velocidad',
    correctLabel: 'Correctas',
    timeLabel: 'Tiempo',
    practiceAgain: 'Practicar de nuevo',
    backToDeck: 'Volver al Mazo',

    statsTitle: 'Mis estadísticas',
    statsSubtitle: 'Tu historial y progreso de práctica',
    noStatsYet: 'Aún no hay registros. ¡Empieza a practicar para ver tus estadísticas!',
    totalSessions: 'Sesiones',
    bestAccuracy: 'Mejor precisión',

    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
    language: 'Idioma',
    loading: 'Cargando...',
    error: 'Algo salió mal',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',

    preferencesTitle: 'Preferencias',
    fontSizeLabel: 'Tamaño de fuente',
    soundEffects: 'Efectos de sonido',
    sound_mechanical: 'Mecánico',
    sound_soft: 'Suave',
    sound_typewriter: 'Máquina',
    focusModeLabel: 'Modo enfoque',
    feedbackEffectsLabel: 'Efectos de retroalimentación',

    themeDark: 'Oscuro',
    themeLight: 'Claro',
    themeDracula: 'Dracula',
    themeNord: 'Nord',
    themeSolarized: 'Solarized',
    themeCatppuccin: 'Catppuccin',
    themeGruvbox: 'Gruvbox',
    themeTokyoNight: 'Tokyo Night',
    themeOneDark: 'One Dark',
    themeRosePine: 'Rosé Pine',

    smartReview: 'Revisión inteligente',
    learning: 'Aprendiendo',
    familiar: 'Familiar',
    mastered: 'Dominado',
    masteryProgress: 'Progreso de dominio',
    dueForReview: 'Pendiente de revisión',

    overview: 'Resumen',
    decksTab: 'Mazos',
    historyTab: 'Historial',
    currentStreak: 'Racha actual',
    longestStreak: 'Racha más larga',
    practiceToday: '¡Practica hoy para mantener tu racha!',
    personalBest: 'Mejor marca',
    newPB: '¡Nueva mejor marca!',
    attempts: 'Intentos',
    weakestCards: 'Tarjetas débiles',
    sessionsLabel: 'sesiones',

    createDeck: '+ Crear Mazo',
    createDeckTitle: 'Crear Nuevo Mazo',
    createDeckSubtitle: 'Introduce las tarjetas manualmente',
    deckNameLabel: 'Nombre del Mazo',
    deckNamePlaceholder: 'ej. Vocabulario básico',
    deckNameRequired: 'Por favor introduce un nombre para el mazo.',
    cardsRequired: 'Por favor añade al menos una tarjeta.',
    cardSaveError: 'Error al guardar las tarjetas. Inténtalo de nuevo.',
    columnFront: 'Palabra (Frente)',
    columnBack: 'Significado (Reverso)',
    columnPronunciation: 'Pronunciación',
    addRow: '+ Añadir fila',
    addTenRows: '+ Añadir 10 filas',
    maxLabel: '(máx)',
    savingLabel: 'Guardando...',

    landingBadge: 'Gratis · Sin tarjeta de crédito',
    landingHero1: 'Escríbelo. Apréndelo.',
    landingHero2: 'Domina cualquier mazo.',
    landingSubtext: 'Convierte tus tarjetas Anki en sesiones de práctica de mecanografía. Desarrolla memoria muscular, rastrea WPM y recuerda de verdad lo que estudias.',
    startForFree: 'Empezar gratis',
    seeHowItWorks: 'Cómo funciona',
    howItWorksLabel: 'CÓMO FUNCIONA',
    howItWorksTitle: 'Tres pasos. Sin fricción.',
    step01Title: 'Sube tu mazo',
    step01Desc: 'Arrastra cualquier archivo .apkg de Anki. Lo analizamos al instante — tarjetas, campos y todo.',
    step02Title: 'Escribe tus respuestas',
    step02Desc: 'Ve el frente de cada tarjeta. Escribe la respuesta. Recibe retroalimentación instantánea en cada tecla.',
    step03Title: 'Observa tu progreso',
    step03Desc: 'Rastrea WPM, precisión y nivel de dominio para cada tarjeta a lo largo del tiempo.',
    featuresLabel: 'CARACTERÍSTICAS',
    featuresTitle: 'Construido para el aprendizaje real.',
    feature1Title: 'Algoritmo de revisión inteligente',
    feature1Desc: 'Las tarjetas que sigues fallando aparecen más. Las que has dominado se retiran. Impulsado por una puntuación de confianza en tiempo real.',
    feature2Title: '10 hermosos temas',
    feature2Desc: 'Oscuro, Claro, Dracula, Nord, Tokyo Night y más. Cambia al instante. Tu preferencia se guarda localmente.',
    feature3Title: 'Seguimiento detallado del progreso',
    feature3Desc: 'Mapa de calor, tendencia WPM, récords personales y estadísticas por tarjeta. Sabe exactamente qué tarjetas te cuestan más.',
    feature4Title: 'Cualquier idioma, cualquier mazo',
    feature4Desc: 'Kanji japonés, vocabulario coreano, verbos en español, terminología médica. Si está en Anki, funciona aquí.',
    getStartedLabel: 'COMENZAR',
    getStartedTitle: 'Empieza a escribir en segundos.',
    getStartedDesc: 'Sube tu mazo, elige un modo y empieza a construir memoria real. Sin configuración.',

    tryDemo: 'Probar sin mazo',
    demoSubtitle: 'Sin cuenta necesaria. Elige un mazo y empieza a escribir.',
    demoModeHintMeaning: 'Ve la palabra coreana → escribe el significado en inglés',
    demoModeHintWord: 'Ve la palabra coreana + pista en inglés → escribe la palabra coreana',
    demoSignupTitle: 'Guarda tu progreso',
    demoSignupDesc: 'Crea una cuenta gratuita para rastrear WPM, dominio y desbloquear todas las funciones.',
    demoSignupCta: 'Crear cuenta gratuita',

    upgradeToPro: 'Actualizar a Pro',
    proFeatures: 'Todo en Free, más:',
    pricingTitle: 'Precios simples y honestos',
    pricingSubtitle: 'Empieza gratis. Actualiza cuando estés listo.',
    pricingMonthly: 'Mensual',
    pricingAnnual: 'Anual',
    annualDiscount: '20% descuento',
    pricingFreeTier: 'Free',
    pricingProTier: 'Pro',
    getPro: 'Obtener Pro',
    pricingPerMonth: '/mes',
    pricingPerYear: '/año',
    currentPlanFree: 'Estás en el plan Free',
    currentPlanPro: 'Estás en el plan Pro',
    manageBilling: 'Gestionar suscripción',
    upgradeSuccess: '¡Bienvenido a Pro! 🎉',
    deckLimitReachedCta: 'Actualiza a Pro para mazos ilimitados →',
    cardLimitReachedCta: 'Actualiza a Pro para tarjetas ilimitadas →',
    statsProGate: 'Las estadísticas avanzadas están disponibles en el plan Pro.',
    billingTitle: 'Facturación y plan',

    uploadYourDeck: 'Sube tu mazo',
    guestUploadTitle: 'Prueba antes de registrarte',
    guestUploadDesc: 'Sube tu mazo de Anki y practica gratis. No necesitas cuenta.',
    tryPractice: 'Practicar ahora',
    guestSignupTitle: 'Guarda tu progreso',
    guestSignupDesc: 'Crea una cuenta gratuita para guardar este mazo y seguir tu progreso.',

    footerProduct: 'Producto',
    footerSupport: 'Soporte',
    footerLegal: 'Legal',
    footerDemo: 'Probar sin mazo',
    footerUpload: 'Subir mazo',
    footerPricing: 'Precios',
    footerGuide: 'Guía de uso',
    footerContact: 'Contacto',
    footerTerms: 'Términos de servicio',
    footerPrivacy: 'Política de privacidad',
    comingSoon: 'Próximamente.',
  },

  zh: {
    appName: 'typee',
    subtitle: '上传你的Anki牌组。\n打字练习。\n提升记忆力。',
    description: '将Anki闪卡转换为打字练习。追踪WPM、准确率，更快掌握卡片内容。',
    footer: 'typee — Anki与打字练习的结合',

    signIn: '登录',
    signOut: '退出',
    signInWithGoogle: '使用Google继续',
    signInWithEmail: '使用邮箱继续',
    emailPlaceholder: '输入邮箱地址...',

    myDecks: '我的牌组',
    uploadDeck: '上传牌组',
    noDeckYet: '还没有牌组。上传.apkg文件开始学习！',
    cards: '张',
    lastPracticed: '最近练习',
    deckLimitReached: '已达免费计划上限（1个牌组）。升级至Pro享无限牌组。',

    uploadTitle: '上传Anki牌组',
    uploadSubtitle: '拖放.apkg文件或点击浏览',
    dropHere: '将.apkg文件拖放到这里',
    browseFiles: '浏览文件',
    parsing: '解析牌组中...',
    parsingSteps: '提取卡片中',
    saveDeck: '保存牌组',
    cardPreview: '卡片预览',
    front: '正面',
    back: '背面',

    startPractice: '开始练习',
    frontToBack: '输入含义',
    backToFront: '输入单词',
    sequential: '顺序',
    random: '随机',
    difficultFirst: '难题优先',
    typeHere: '在此输入...',
    correctMsg: '正确！',
    skip: '跳过',
    seeResults: '查看结果',

    resultsTitle: '练习完成！',
    outstanding: '出色！',
    greatJob: '做得好！',
    goodEffort: '不错的努力！',
    keepGoing: '继续加油！',
    accuracyLabel: '准确率',
    speedLabel: '速度',
    correctLabel: '正确数',
    timeLabel: '时间',
    practiceAgain: '再次练习',
    backToDeck: '返回牌组',

    statsTitle: '我的统计',
    statsSubtitle: '练习记录与进度',
    noStatsYet: '还没有练习记录。开始练习查看统计！',
    totalSessions: '场次',
    bestAccuracy: '最佳准确率',

    darkMode: '深色模式',
    lightMode: '浅色模式',
    language: '语言',
    loading: '加载中...',
    error: '出现错误',
    delete: '删除',
    cancel: '取消',
    confirm: '确认',

    preferencesTitle: '偏好设置',
    fontSizeLabel: '字体大小',
    soundEffects: '打字音效',
    sound_mechanical: '机械',
    sound_soft: '柔和',
    sound_typewriter: '打字机',
    focusModeLabel: '专注模式',
    feedbackEffectsLabel: '反馈效果',

    themeDark: '深色',
    themeLight: '浅色',
    themeDracula: 'Dracula',
    themeNord: 'Nord',
    themeSolarized: 'Solarized',
    themeCatppuccin: 'Catppuccin',
    themeGruvbox: 'Gruvbox',
    themeTokyoNight: 'Tokyo Night',
    themeOneDark: 'One Dark',
    themeRosePine: 'Rosé Pine',

    smartReview: '智能复习',
    learning: '学习中',
    familiar: '熟悉',
    mastered: '已掌握',
    masteryProgress: '掌握进度',
    dueForReview: '待复习',

    overview: '概览',
    decksTab: '牌组',
    historyTab: '历史',
    currentStreak: '当前连续',
    longestStreak: '最长连续',
    practiceToday: '今天练习以保持连续记录！',
    personalBest: '个人最佳',
    newPB: '新个人最佳！',
    attempts: '尝试次数',
    weakestCards: '薄弱卡片',
    sessionsLabel: '场',

    createDeck: '+ 创建牌组',
    createDeckTitle: '创建新牌组',
    createDeckSubtitle: '手动输入卡片创建牌组',
    deckNameLabel: '牌组名称',
    deckNamePlaceholder: '例）基础韩语词汇',
    deckNameRequired: '请输入牌组名称。',
    cardsRequired: '请至少添加一张卡片。',
    cardSaveError: '保存卡片时出现错误。',
    columnFront: '单词（正面）',
    columnBack: '含义（背面）',
    columnPronunciation: '发音',
    addRow: '+ 添加行',
    addTenRows: '+ 添加10行',
    maxLabel: '（上限）',
    savingLabel: '保存中...',

    landingBadge: '免费开始 · 无需信用卡',
    landingHero1: '打字。学习。',
    landingHero2: '掌握任何牌组。',
    landingSubtext: '将你的Anki闪卡转换为打字练习课程。建立肌肉记忆，追踪WPM，真正记住你学的内容。',
    startForFree: '免费开始',
    seeHowItWorks: '了解如何使用',
    howItWorksLabel: '使用方式',
    howItWorksTitle: '三步搞定。零阻力。',
    step01Title: '上传你的牌组',
    step01Desc: '拖放任意.apkg Anki文件。即时解析卡片和字段。',
    step02Title: '输入你的答案',
    step02Desc: '查看每张卡片的正面，输入答案。每次按键都获得即时反馈。',
    step03Title: '见证自己的进步',
    step03Desc: '随时间追踪每张卡片的WPM、准确率和掌握程度。',
    featuresLabel: '功能特色',
    featuresTitle: '专为真实学习而打造。',
    feature1Title: '智能复习算法',
    feature1Desc: '你不断答错的卡片会更频繁出现。已掌握的卡片则退后。由实时更新的置信度分数驱动。',
    feature2Title: '10种精美主题',
    feature2Desc: '深色、浅色、Dracula、Nord、Tokyo Night等。即时切换。偏好保存在本地。',
    feature3Title: '深度进度追踪',
    feature3Desc: '活动热力图、WPM趋势图、个人最佳记录和每张卡片的统计数据。准确了解薄弱环节。',
    feature4Title: '任何语言，任何牌组',
    feature4Desc: '日语汉字、韩语词汇、西班牙语动词、医学术语。Anki里有的，这里都能用。',
    getStartedLabel: '立即开始',
    getStartedTitle: '几秒内开始打字练习。',
    getStartedDesc: '上传你的牌组，选择模式，开始建立真正的记忆。无需设置。',

    tryDemo: '无需牌组体验',
    demoSubtitle: '无需账户。选择牌组，立即开始打字练习。',
    demoModeHintMeaning: '看到韩语单词 → 输入英语意思',
    demoModeHintWord: '看到韩语单词 + 英语提示 → 输入韩语单词',
    demoSignupTitle: '保存你的进度',
    demoSignupDesc: '创建免费账户以追踪WPM、掌握程度，并解锁所有功能。',
    demoSignupCta: '创建免费账户',

    upgradeToPro: '升级至Pro',
    proFeatures: 'Free的所有功能，加上:',
    pricingTitle: '简单透明的定价',
    pricingSubtitle: '免费开始，随时升级。',
    pricingMonthly: '月付',
    pricingAnnual: '年付',
    annualDiscount: '8折优惠',
    pricingFreeTier: '免费版',
    pricingProTier: 'Pro版',
    getPro: '获取Pro',
    pricingPerMonth: '/月',
    pricingPerYear: '/年',
    currentPlanFree: '您正在使用免费计划',
    currentPlanPro: '您正在使用Pro计划',
    manageBilling: '管理订阅',
    upgradeSuccess: '欢迎使用Pro！🎉',
    deckLimitReachedCta: '升级Pro获得无限牌组 →',
    cardLimitReachedCta: '升级Pro获得无限卡片 →',
    statsProGate: '高级统计功能在Pro计划中可用。',
    billingTitle: '账单与计划',

    uploadYourDeck: '上传牌组',
    guestUploadTitle: '注册前先体验',
    guestUploadDesc: '上传你的Anki牌组，免费练习。无需账户。',
    tryPractice: '开始练习',
    guestSignupTitle: '保存学习进度',
    guestSignupDesc: '创建免费账户，保存此牌组并追踪你的学习进度。',

    footerProduct: '产品',
    footerSupport: '支持',
    footerLegal: '法律',
    footerDemo: '无牌组体验',
    footerUpload: '上传牌组',
    footerPricing: '定价',
    footerGuide: '使用指南',
    footerContact: '联系我们',
    footerTerms: '服务条款',
    footerPrivacy: '隐私政策',
    comingSoon: '即将推出。',
  },

  fr: {
    appName: 'typee',
    subtitle: 'Importez votre deck Anki.\nPratiquez la frappe.\nAméliorez votre mémoire.',
    description: 'Transformez vos cartes Anki en exercices de frappe. Suivez votre WPM, précision et maîtrisez vos cartes plus vite.',
    footer: 'typee — Anki rencontre la pratique de frappe',

    signIn: 'Se connecter',
    signOut: 'Se déconnecter',
    signInWithGoogle: 'Continuer avec Google',
    signInWithEmail: 'Continuer avec Email',
    emailPlaceholder: 'Entrez votre email...',

    myDecks: 'Mes Decks',
    uploadDeck: 'Importer un Deck',
    noDeckYet: 'Aucun deck pour l\'instant. Importez un fichier .apkg pour commencer !',
    cards: 'cartes',
    lastPracticed: 'Dernière pratique',
    deckLimitReached: 'Limite du plan gratuit atteinte (1 deck). Passez à Pro pour des decks illimités.',

    uploadTitle: 'Importer un Deck Anki',
    uploadSubtitle: 'Glissez-déposez votre fichier .apkg ou cliquez pour parcourir',
    dropHere: 'Déposez votre fichier .apkg ici',
    browseFiles: 'Parcourir les fichiers',
    parsing: 'Analyse du deck...',
    parsingSteps: 'Extraction des cartes',
    saveDeck: 'Enregistrer le Deck',
    cardPreview: 'Aperçu des cartes',
    front: 'Recto',
    back: 'Verso',

    startPractice: 'Commencer la Pratique',
    frontToBack: 'Écrire la Signification',
    backToFront: 'Écrire le Mot',
    sequential: 'Séquentiel',
    random: 'Aléatoire',
    difficultFirst: 'Difficile d\'abord',
    typeHere: 'Tapez ici...',
    correctMsg: 'Correct !',
    skip: 'Passer',
    seeResults: 'Voir les Résultats',

    resultsTitle: 'Pratique Terminée !',
    outstanding: 'Exceptionnel !',
    greatJob: 'Excellent travail !',
    goodEffort: 'Bon effort !',
    keepGoing: 'Continuez !',
    accuracyLabel: 'Précision',
    speedLabel: 'Vitesse',
    correctLabel: 'Corrects',
    timeLabel: 'Temps',
    practiceAgain: 'Pratiquer à nouveau',
    backToDeck: 'Retour au Deck',

    statsTitle: 'Mes Statistiques',
    statsSubtitle: 'Historique et progression de pratique',
    noStatsYet: 'Aucun enregistrement de pratique. Commencez à pratiquer pour voir vos statistiques !',
    totalSessions: 'Sessions',
    bestAccuracy: 'Meilleure précision',

    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    language: 'Langue',
    loading: 'Chargement...',
    error: 'Une erreur est survenue',
    delete: 'Supprimer',
    cancel: 'Annuler',
    confirm: 'Confirmer',

    preferencesTitle: 'Préférences',
    fontSizeLabel: 'Taille de police',
    soundEffects: 'Effets sonores',
    sound_mechanical: 'Mécanique',
    sound_soft: 'Doux',
    sound_typewriter: 'Machine à écrire',
    focusModeLabel: 'Mode concentration',
    feedbackEffectsLabel: 'Effets de retour',

    themeDark: 'Sombre',
    themeLight: 'Clair',
    themeDracula: 'Dracula',
    themeNord: 'Nord',
    themeSolarized: 'Solarized',
    themeCatppuccin: 'Catppuccin',
    themeGruvbox: 'Gruvbox',
    themeTokyoNight: 'Tokyo Night',
    themeOneDark: 'One Dark',
    themeRosePine: 'Rosé Pine',

    smartReview: 'Révision intelligente',
    learning: 'En apprentissage',
    familiar: 'Familier',
    mastered: 'Maîtrisé',
    masteryProgress: 'Progression de maîtrise',
    dueForReview: 'À réviser',

    overview: 'Vue d\'ensemble',
    decksTab: 'Decks',
    historyTab: 'Historique',
    currentStreak: 'Série actuelle',
    longestStreak: 'Série la plus longue',
    practiceToday: 'Pratiquez aujourd\'hui pour maintenir votre série !',
    personalBest: 'Record personnel',
    newPB: 'Nouveau record personnel !',
    attempts: 'Tentatives',
    weakestCards: 'Cartes faibles',
    sessionsLabel: 'sessions',

    createDeck: '+ Créer un Deck',
    createDeckTitle: 'Créer un Nouveau Deck',
    createDeckSubtitle: 'Saisissez les cartes manuellement',
    deckNameLabel: 'Nom du Deck',
    deckNamePlaceholder: 'ex. Vocabulaire coréen de base',
    deckNameRequired: 'Veuillez entrer un nom pour le deck.',
    cardsRequired: 'Veuillez ajouter au moins une carte.',
    cardSaveError: 'Erreur lors de la sauvegarde des cartes.',
    columnFront: 'Mot (Recto)',
    columnBack: 'Signification (Verso)',
    columnPronunciation: 'Prononciation',
    addRow: '+ Ajouter une ligne',
    addTenRows: '+ Ajouter 10 lignes',
    maxLabel: '(max)',
    savingLabel: 'Sauvegarde...',

    landingBadge: 'Gratuit · Sans carte de crédit',
    landingHero1: 'Tapez. Apprenez.',
    landingHero2: 'Maîtrisez n\'importe quel deck.',
    landingSubtext: 'Transformez vos cartes Anki en sessions de pratique de frappe. Développez la mémoire musculaire, suivez votre WPM et retenez vraiment ce que vous étudiez.',
    startForFree: 'Commencer gratuitement',
    seeHowItWorks: 'Voir comment ça marche',
    howItWorksLabel: 'COMMENT ÇA MARCHE',
    howItWorksTitle: 'Trois étapes. Zéro friction.',
    step01Title: 'Importez votre deck',
    step01Desc: 'Déposez n\'importe quel fichier .apkg Anki. Nous l\'analysons instantanément — cartes, champs et tout.',
    step02Title: 'Tapez vos réponses',
    step02Desc: 'Voyez le recto de chaque carte. Tapez la réponse. Recevez un retour instantané à chaque touche.',
    step03Title: 'Observez vos progrès',
    step03Desc: 'Suivez WPM, précision et niveau de maîtrise pour chaque carte dans le temps.',
    featuresLabel: 'FONCTIONNALITÉS',
    featuresTitle: 'Conçu pour le vrai apprentissage.',
    feature1Title: 'Algorithme de révision intelligente',
    feature1Desc: 'Les cartes que vous ratez souvent apparaissent plus. Celles maîtrisées s\'effacent. Alimenté par un score de confiance en temps réel.',
    feature2Title: '10 beaux thèmes',
    feature2Desc: 'Sombre, Clair, Dracula, Nord, Tokyo Night et plus. Changez instantanément. Préférences sauvegardées localement.',
    feature3Title: 'Suivi approfondi des progrès',
    feature3Desc: 'Carte thermique, tendance WPM, records personnels et statistiques par carte. Sachez exactement quelles cartes vous posent problème.',
    feature4Title: 'Toute langue, tout deck',
    feature4Desc: 'Kanji japonais, vocab coréen, verbes espagnols, terminologie médicale. Si c\'est dans Anki, ça marche ici.',
    getStartedLabel: 'COMMENCER',
    getStartedTitle: 'Commencez à taper en quelques secondes.',
    getStartedDesc: 'Importez votre deck, choisissez un mode et commencez à construire une vraie mémoire. Sans configuration.',

    tryDemo: 'Essayer sans deck',
    demoSubtitle: 'Sans compte. Choisissez un deck et commencez à taper.',
    demoModeHintMeaning: 'Voyez le mot coréen → tapez la signification en anglais',
    demoModeHintWord: 'Voyez le mot coréen + indice anglais → tapez le mot coréen',
    demoSignupTitle: 'Sauvegardez vos progrès',
    demoSignupDesc: 'Créez un compte gratuit pour suivre WPM, maîtrise et débloquer toutes les fonctionnalités.',
    demoSignupCta: 'Créer un compte gratuit',

    upgradeToPro: 'Passer à Pro',
    proFeatures: 'Tout ce qui est en Free, plus :',
    pricingTitle: 'Tarification simple et honnête',
    pricingSubtitle: 'Commencez gratuitement. Passez à Pro quand vous êtes prêt.',
    pricingMonthly: 'Mensuel',
    pricingAnnual: 'Annuel',
    annualDiscount: '20% de réduction',
    pricingFreeTier: 'Gratuit',
    pricingProTier: 'Pro',
    getPro: 'Obtenir Pro',
    pricingPerMonth: '/mois',
    pricingPerYear: '/an',
    currentPlanFree: 'Vous êtes sur le plan Gratuit',
    currentPlanPro: 'Vous êtes sur le plan Pro',
    manageBilling: 'Gérer l\'abonnement',
    upgradeSuccess: 'Bienvenue dans Pro ! 🎉',
    deckLimitReachedCta: 'Passez à Pro pour des decks illimités →',
    cardLimitReachedCta: 'Passez à Pro pour des cartes illimitées →',
    statsProGate: 'Les statistiques avancées sont disponibles avec le plan Pro.',
    billingTitle: 'Facturation et plan',

    uploadYourDeck: 'Téléchargez votre deck',
    guestUploadTitle: 'Essayez avant de vous inscrire',
    guestUploadDesc: 'Téléchargez votre deck Anki et pratiquez gratuitement. Aucun compte requis.',
    tryPractice: 'Pratiquer maintenant',
    guestSignupTitle: 'Sauvegardez votre progression',
    guestSignupDesc: 'Créez un compte gratuit pour sauvegarder ce deck et suivre votre progression.',

    footerProduct: 'Produit',
    footerSupport: 'Support',
    footerLegal: 'Juridique',
    footerDemo: 'Essayer sans paquet',
    footerUpload: 'Importer un paquet',
    footerPricing: 'Tarifs',
    footerGuide: "Guide d'utilisation",
    footerContact: 'Nous contacter',
    footerTerms: "Conditions d'utilisation",
    footerPrivacy: 'Politique de confidentialité',
    comingSoon: 'Bientôt disponible.',
  },
};
