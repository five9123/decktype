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
  signInWithTwitter: string;
  signInWithEmail: string;
  emailPlaceholder: string;

  // Login page (2-column)
  loginHeroTitle: string;
  loginHeroDesc: string;
  loginFeature1: string;
  loginFeature2: string;
  loginFeature3: string;
  loginWelcome: string;
  loginDesc: string;
  loginOrDivider: string;
  loginTryDemo: string;
  loginReassurance1: string;
  loginReassurance2: string;

  // Dashboard
  myDecks: string;
  uploadDeck: string;
  noDeckYet: string;
  cards: string;
  lastPracticed: string;
  deckLimitReached: string;
  shareDeck: string;
  shareTypetris: string;
  shareWordTrain: string;
  linkCopied: string;

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
  nextCard: string;
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
  shareResult: string;
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
  ttsLabel: string;
  confettiLabel: string;

  // Setting descriptions (tooltips)
  soundEffectsDesc: string;
  ttsDesc: string;
  confettiDesc: string;

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
  difficultFirstDesc: string;
  smartReviewDesc: string;
  learning: string;
  familiar: string;
  mastered: string;
  masteryProgress: string;
  dueForReview: string;
  dueToday: string;

  // Enhanced Session Report
  cardsToReview: string;
  commonMistakes: string;
  vsLastSession: string;
  showDetails: string;
  hideDetails: string;

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
  columnStatus: string;
  fillInBlankSection: string;
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
  tryWithoutDeck: string;
  landingKpopCta: string;
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

  // Homepage — What is typee / FAQ
  whatIsTitle: string;
  whatIsDesc: string;
  whatIsDetail1: string;
  whatIsDetail2: string;
  whatIsDetail3: string;
  homeFaqTitle: string;
  homeFaq1Q: string;
  homeFaq1A: string;
  homeFaq2Q: string;
  homeFaq2A: string;
  homeFaq3Q: string;
  homeFaq3A: string;
  homeFaq4Q: string;
  homeFaq4A: string;
  homeFaq5Q: string;
  homeFaq5A: string;

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
  resultsUpgradePrompt: string;
  resultsUpgradeCta: string;
  aiQuotaWarning: string;
  aiQuotaUpgrade: string;
  proGateUnlock: string;
  proGatePreview: string;
  streakMilestone: string;
  retentionStreakMilestone: string;
  retentionPracticeToday: string;
  retentionWelcomeBack: string;
  retentionDueCards: string;
  retentionStartBtn: string;
  retentionDismiss: string;
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
  footerAbout: string;
  footerContact: string;
  footerTerms: string;
  footerPrivacy: string;
  footerChangelog: string;
  changelogTitle: string;
  changelogIntro: string;
  comingSoon: string;

  // About page
  aboutTitle: string;
  aboutMission: string;
  aboutMissionDesc: string;
  aboutStory: string;
  aboutStoryP1: string;
  aboutStoryP2: string;
  aboutStoryP3: string;
  aboutWhyTitle: string;
  aboutWhy1: string;
  aboutWhy2: string;
  aboutWhy3: string;
  aboutWhy4: string;
  aboutTechTitle: string;
  aboutTechDesc: string;

  // Contact page
  contactTitle: string;
  contactIntro: string;
  contactEmailLabel: string;
  contactEmailDesc: string;
  contactResponseTime: string;
  contactTopics: string;
  contactTopic1: string;
  contactTopic2: string;
  contactTopic3: string;
  contactTopic4: string;

  // Guide page
  guideTitle: string;
  guideIntro: string;
  guideStep1Title: string;
  guideStep1Desc: string;
  guideStep2Title: string;
  guideStep2Desc: string;
  guideStep3Title: string;
  guideStep3Desc: string;
  guideStep4Title: string;
  guideStep4Desc: string;
  guideModesTitle: string;
  guideModeFrontToBack: string;
  guideModeBackToFront: string;
  guideModeSequential: string;
  guideModeRandom: string;
  guideModeDifficult: string;
  guideTipsTitle: string;
  guideTip1: string;
  guideTip2: string;
  guideTip3: string;
  guideTip4: string;
  guideFormatsTitle: string;
  guideFormatsDesc: string;
  guideFaqTitle: string;
  guideFaq1Q: string;
  guideFaq1A: string;
  guideFaq2Q: string;
  guideFaq2A: string;
  guideFaq3Q: string;
  guideFaq3A: string;
  guideFaq4Q: string;
  guideFaq4A: string;

  // Terms page
  termsTitle: string;
  termsLastUpdated: string;
  termsIntro: string;
  termsSection1Title: string;
  termsSection1Desc: string;
  termsSection2Title: string;
  termsSection2Desc: string;
  termsSection3Title: string;
  termsSection3Desc: string;
  termsSection4Title: string;
  termsSection4Desc: string;
  termsSection5Title: string;
  termsSection5Desc: string;
  termsSection6Title: string;
  termsSection6Desc: string;
  termsSection7Title: string;
  termsSection7Desc: string;
  termsSection8Title: string;
  termsSection8Desc: string;

  // Privacy page
  privacyTitle: string;
  privacyLastUpdated: string;
  privacyIntro: string;
  privacySection1Title: string;
  privacySection1Desc: string;
  privacySection2Title: string;
  privacySection2Desc: string;
  privacySection3Title: string;
  privacySection3Desc: string;
  privacySection4Title: string;
  privacySection4Desc: string;
  privacySection5Title: string;
  privacySection5Desc: string;
  privacySection6Title: string;
  privacySection6Desc: string;
  privacySection7Title: string;
  privacySection7Desc: string;

  // Blog
  blogTitle: string;
  blogDescription: string;
  blogReadMore: string;
  blogMinRead: string;
  blogNoPosts: string;
  blogBackToList: string;
  blogToc: string;
  blogRelated: string;
  footerBlog: string;

  // Media tab
  mediaTab: string;
  uploadMediaFile: string;
  pasteSubtitles: string;
  generateWithAI: string;
  generating: string;
  vocabularyCards: string;
  clozeCards: string;
  bothCardTypes: string;
  supportedFormats: string;
  mediaNoContent: string;
  mediaPreview: string;
  generateMode: string;
  lineCount: string;
  sourceLangLabel: string;
  targetLangLabel: string;
  sourceLangTooltip: string;
  targetLangTooltip: string;

  // Game modes
  acidRain: string;
  fillBlank: string;
  classicTyping: string;

  // Acid Rain
  score: string;
  combo: string;
  level: string;
  gameOver: string;
  finalScore: string;
  playAgain: string;
  acidRainDesc: string;
  fillBlankDesc: string;
  backToFrontDesc: string;
  wordTrain: string;
  wordTrainDesc: string;
  wordTrainTimerDesc: string;
  timeUp: string;
  wordsCompleted: string;
  pronunciation: string;
  targetWord: string;

  // Fill Blank
  showHint: string;
  hintTimerLabel: string;
  fillInMissing: string;

  // Onboarding coachmark
  onboardingWelcomeTitle: string;
  onboardingWelcomeDesc: string;
  onboardingCreateTitle: string;
  onboardingCreateDesc: string;
  onboardingStartTitle: string;
  onboardingStartDesc: string;
  onboardingNext: string;
  onboardingSkip: string;
  onboardingDone: string;

  // Community Gallery
  explore: string;
  exploreTitle: string;
  exploreSubtitle: string;
  searchDecks: string;
  filterByLanguage: string;
  allLanguages: string;
  sortRecent: string;
  sortPopular: string;
  sortMostCloned: string;
  publishDeck: string;
  unpublishDeck: string;
  likeDeck: string;
  cloneDeck: string;
  cloneSuccess: string;
  cloneError: string;
  cloneDeckLimit: string;
  publishedBy: string;
  displayName: string;
  displayNamePlaceholder: string;
  setDisplayName: string;
  noPublicDecks: string;
  cardPreviewCount: string;
  anonymous: string;
  signInToClone: string;

  // AI Deck Generation
  aiTopicLabel: string;
  aiTopicPlaceholder: string;
  aiTopicRequired: string;
  aiTargetLang: string;
  aiLevel: string;
  aiBeginner: string;
  aiIntermediate: string;
  aiAdvanced: string;
  aiCardCount: string;
  aiGenerate: string;
  aiGenerating: string;
  aiPreview: string;
  aiQuotaRemaining: string;
  aiQuotaExceeded: string;

  // Leaderboard
  leaderboardTitle: string;
  leaderboardSubtitle: string;
  leaderboardDaily: string;
  leaderboardWeekly: string;
  leaderboardAllTime: string;
  leaderboardPlayer: string;
  leaderboardScore: string;
  leaderboardEmpty: string;

  // Goals
  goalSettings: string;
  goalSettingsDesc: string;
  dailyGoal: string;
  weeklyGoal: string;
  sessionsGoal: string;
  minutesGoal: string;
  cardsGoal: string;
  goalProgress: string;
  goalComplete: string;
  goalCelebrationMsg: string;
  setGoal: string;
  removeGoal: string;
  noGoalsYet: string;

  // AI Coaching
  getAiTips: string;
  aiCoachingTitle: string;
  aiCoachingLoading: string;
  aiCoachingError: string;
  aiTipsRemaining: string;
  retryBtn: string;

  // SRS Difficulty Rating
  rateAgain: string;
  rateHard: string;
  rateGood: string;
  rateEasy: string;
  rateHint: string;
  reviewSummary: string;
  reviewNow: string;

  // XP & Level
  xpGained: string;
  levelLabel: string;
  levelUp: string;
  xpToNext: string;
  xpThisSession: string;

  // Achievements
  achievementsTab: string;
  achievementUnlocked: string;
  achievementLocked: string;
  achievStreak3: string;
  achievStreak7: string;
  achievStreak30: string;
  achievStreak100: string;
  achievSessions10: string;
  achievSessions50: string;
  achievSessions100: string;
  achievSessions500: string;
  achievMastery10: string;
  achievMastery50: string;
  achievMastery100: string;
  achievSpeed40: string;
  achievSpeed60: string;
  achievSpeed80: string;
  achievCards100: string;
  achievCards500: string;
  achievCards1000: string;
  achievVariety3: string;
  achievVariety5: string;
};

export const TRANSLATIONS: Record<Lang, Translations> = {
  en: {
    appName: 'typee',
    subtitle: 'Upload your Anki deck.\nPractice typing.\nImprove memory.',
    description: 'Turn your Anki flashcards into typing practice. Track WPM, accuracy, and master your cards faster.',
    footer: 'Learn with typing',

    signIn: 'Sign In',
    signOut: 'Sign Out',
    signInWithGoogle: 'Continue with Google',
    signInWithTwitter: 'Continue with X',
    signInWithEmail: 'Continue with Email',
    emailPlaceholder: 'Enter your email...',

    loginHeroTitle: 'Learn languages through songs & movies',
    loginHeroDesc: 'Paste lyrics or drop subtitle files. AI creates cards instantly — then practice with typing, Fill Blank, and Word Game modes.',
    loginFeature1: 'AI cards from lyrics & subtitles',
    loginFeature2: 'Track WPM & accuracy',
    loginFeature3: 'Fill Blank & Word Game modes',
    loginWelcome: 'Welcome',
    loginDesc: 'Sign in to save your progress and unlock all features.',
    loginOrDivider: 'or',
    loginTryDemo: 'Try without an account',
    loginReassurance1: '3 free decks included',
    loginReassurance2: 'No credit card required',

    myDecks: 'My Decks',
    uploadDeck: 'Upload Deck',
    noDeckYet: 'No decks yet. Upload an .apkg file to get started!',
    cards: 'cards',
    lastPracticed: 'Last practiced',
    deckLimitReached: 'Free plan limit reached (3 decks). Upgrade to Pro for unlimited decks.',
    shareDeck: 'Share Deck',
    shareTypetris: 'Share Word Rain',
    shareWordTrain: 'Share Word Train',
    linkCopied: 'Link copied!',

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
    nextCard: 'Next',
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
    shareResult: 'Share Result',
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


    ttsLabel: 'Word Pronunciation',
    confettiLabel: 'Confetti Effects',

    soundEffectsDesc: 'Play keystroke sounds while typing',


    ttsDesc: 'Read the word aloud after completing it',
    confettiDesc: 'Show confetti animation on correct answer',

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
    difficultFirstDesc: 'Cards you\'ve typed incorrectly most often appear first.',
    smartReviewDesc: 'Prioritizes cards due for spaced-repetition review. New cards are interleaved.',
    learning: 'Learning',
    familiar: 'Familiar',
    mastered: 'Mastered',
    masteryProgress: 'Mastery Progress',
    dueForReview: 'Due for review',
    dueToday: 'due',
    cardsToReview: 'Cards to Review',
    commonMistakes: 'Common Mistakes',
    vsLastSession: 'vs Previous',
    showDetails: 'Your input',
    hideDetails: 'Hide',

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

    createDeck: '+ Create',
    createDeckTitle: 'Create New Deck',
    createDeckSubtitle: 'From text, media, or enter cards manually',
    deckNameLabel: 'Deck Name',
    deckNamePlaceholder: 'e.g. Basic Korean Words',
    deckNameRequired: 'Please enter a deck name.',
    cardsRequired: 'Please add at least one card.',
    cardSaveError: 'Error saving cards. Please try again.',
    columnFront: 'Word (Front)',
    columnBack: 'Meaning (Back)',
    columnPronunciation: 'Pronunciation',
    columnStatus: 'Status',
    fillInBlankSection: 'Fill in the Blank',
    addRow: '+ Add Row',
    addTenRows: '+ Add 10 Rows',
    maxLabel: '(max)',
    savingLabel: 'Saving...',

    landingBadge: 'AI-powered · Free to start',
    landingHero1: 'Paste what you love.',
    landingHero2: 'Type it. Learn it.',
    landingSubtext: 'Turn any lyrics, subtitles, or articles into typing practice. AI creates the cards, you master the words.',
    startForFree: 'Start for Free',
    tryWithoutDeck: 'Try without a Deck',
    landingKpopCta: 'Paste your favorite K-pop lyrics to start',
    seeHowItWorks: 'See how it works',
    howItWorksLabel: 'HOW IT WORKS',
    howItWorksTitle: 'Three steps. Zero friction.',
    step01Title: 'Create from any content',
    step01Desc: 'Paste song lyrics, drop a subtitle file (.srt), or import an Anki deck. AI extracts vocabulary and cloze cards automatically.',
    step02Title: 'Practice your way',
    step02Desc: 'Choose your game: classic typing, word games (catch falling words), or fill-in-the-blank. Every mode tracks your WPM and accuracy.',
    step03Title: 'Watch yourself improve',
    step03Desc: 'Track WPM, accuracy, and mastery for every card over time. Your weakest cards get more practice automatically.',
    featuresLabel: 'FEATURES',
    featuresTitle: 'Built for real learning.',
    feature1Title: 'AI Card Generation',
    feature1Desc: 'Paste any text — lyrics, subtitles, articles. GPT-4o-mini extracts vocabulary and creates fill-in-the-blank exercises. No manual work needed.',
    feature2Title: '10 Beautiful Themes',
    feature2Desc: 'Dark, Light, Dracula, Nord, Tokyo Night, and more. Switch instantly. Your preference is saved locally — no account needed.',
    feature3Title: '3 Game Modes',
    feature3Desc: 'Classic typing, word games (words fall from the sky — type to destroy them), and fill-in-the-blank. Different modes keep studying engaging.',
    feature4Title: 'Any Language, Any Content',
    feature4Desc: 'Japanese, Korean, Spanish, French and more. Works with lyrics, movie subtitles (.srt), and Anki decks. If you can paste it, you can study it.',
    getStartedLabel: 'GET STARTED',
    getStartedTitle: 'Start learning in seconds.',
    getStartedDesc: 'Paste song lyrics, subtitle files, or any text. AI creates the cards instantly.',

    whatIsTitle: 'What is typee?',
    whatIsDesc: 'typee is an AI-powered language learning tool. Paste song lyrics or drop subtitle files — AI extracts vocabulary and creates practice cards. Then choose your game: classic typing practice, word games (words fall from the sky — type to destroy them), or fill-in-the-blank sentences. You build real memory through active recall, not passive flashcard review.',
    whatIsDetail1: 'Import Anki decks, paste song lyrics or movie subtitles (.srt). AI automatically extracts vocabulary and generates cloze cards — no manual work required.',
    whatIsDetail2: 'Classic typing builds muscle memory. word games is a fast-paced falling-words mode. Fill-in-the-blank tests reading comprehension. All modes use the same deck.',
    whatIsDetail3: 'Available in 6 interface languages with 10+ themes. Free plan includes 3 decks, up to 200 cards each. Pro unlocks unlimited decks for $5/month.',
    homeFaqTitle: 'Frequently Asked Questions',
    homeFaq1Q: 'What is typee and how does it work?',
    homeFaq1A: 'typee is an AI-powered language learning app. Paste song lyrics or subtitle files (.srt) — AI (GPT-4o-mini) extracts vocabulary and creates practice cards automatically. Then practice with three game modes: classic typing, word games (falling words), or fill-in-the-blank. Every session tracks your WPM, accuracy, and mastery.',
    homeFaq2Q: 'Is typee free to use?',
    homeFaq2A: 'Yes. The free plan includes 3 decks with up to 200 cards each, all practice modes, all themes, and basic statistics. The Pro plan ($5/month or $48/year) unlocks unlimited decks, advanced progress tracking, and priority support.',
    homeFaq3Q: 'What content can I use to create cards?',
    homeFaq3A: 'You can paste song lyrics, upload subtitle files (.srt), paste any text, or import an Anki deck (.apkg). AI processes the content and extracts vocabulary cards and fill-in-the-blank sentences automatically.',
    homeFaq4Q: 'Do I need an Anki deck to use typee?',
    homeFaq4A: 'No. You can create decks directly from any text content using AI — paste lyrics or subtitles and cards are generated automatically. Anki import (.apkg) is also supported if you already have decks.',
    homeFaq5Q: 'What game modes are available?',
    homeFaq5A: 'typee offers three practice modes: Classic Typing (see the front, type the answer), word games (words fall from the top — type to destroy them before they hit the bottom), and Fill-in-the-blank (complete sentences with the missing word). All modes track WPM and accuracy.',

    tryDemo: 'Try Without a Deck',
    demoSubtitle: 'No account needed. Pick a deck and start typing.',
    demoModeHintMeaning: 'See the word → type the English meaning',
    demoModeHintWord: 'See the word + English hint → type the word',
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
    resultsUpgradePrompt: 'Great score! Track your progress trends with Pro.',
    resultsUpgradeCta: 'See Pro Features →',
    aiQuotaWarning: 'Last AI request for today.',
    aiQuotaUpgrade: 'Need more? Upgrade to Pro for 50/day →',
    proGateUnlock: 'Unlock with Pro',
    proGatePreview: 'Preview — upgrade to see full data',
    streakMilestone: 'Amazing {n}-day streak! Keep it up!',
    retentionStreakMilestone: '{n}-day streak! You\'re on fire!',
    retentionPracticeToday: 'Ready to practice today? Keep your streak alive!',
    retentionWelcomeBack: 'Welcome back! Let\'s pick up where you left off.',
    retentionDueCards: '{n} cards due for review. Quick practice?',
    retentionStartBtn: 'Start Practice',
    retentionDismiss: 'Dismiss',
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
    footerAbout: 'About',
    footerContact: 'Contact us',
    footerTerms: 'Terms of Service',
    footerPrivacy: 'Privacy Policy',
    footerChangelog: 'Updates',
    changelogTitle: 'Updates',
    changelogIntro: 'See what\'s new in typee.',
    comingSoon: 'Coming soon.',

    aboutTitle: 'About typee',
    aboutMission: 'Our Mission',
    aboutMissionDesc: 'typee exists to make language learning immersive and effective. By turning content you love — song lyrics, movie subtitles, articles — into active typing practice, we help learners build muscle memory, retain vocabulary longer, and track their progress with precision.',
    aboutStory: 'The Story',
    aboutStoryP1: 'typee was born from a simple idea: the best way to learn a language is to engage with content you actually love. Songs you play on repeat, shows you binge, lyrics that stick in your head — that\'s where real vocabulary lives.',
    aboutStoryP2: 'But passive listening isn\'t enough. What if you had to type every word? Typing forces active recall — you can\'t cheat. Whether it\'s Fill-in-the-blank from K-pop lyrics or a Word Game with anime vocabulary, every keystroke builds real memory.',
    aboutStoryP3: 'typee launched in 2026 as a free web tool. Paste any song lyrics or drop an SRT subtitle file — AI extracts vocabulary and generates typing cards in seconds. Play typing practice, Fill-in-the-blank, or Word Rain. No downloads, no complicated setup — just paste and play.',
    aboutWhyTitle: 'Why Typing?',
    aboutWhy1: 'Active recall — physically producing the answer strengthens memory more than recognition alone.',
    aboutWhy2: 'Context matters — learning words in sentences you\'ve actually heard (from songs or shows) makes them stick in a way isolated study can\'t.',
    aboutWhy3: 'Honest feedback — you either type it correctly or you don\'t. No more second-guessing whether you really knew it.',
    aboutWhy4: 'Measurable progress — WPM and accuracy give you concrete metrics that "I knew it" can\'t provide.',
    aboutTechTitle: 'Built With',
    aboutTechDesc: 'typee is a Next.js web application hosted on Vercel. Decks are parsed entirely in the browser — your .apkg files never leave your device. We use Supabase for authentication and progress syncing, and Stripe for secure payments.',

    contactTitle: 'Contact Us',
    contactIntro: 'Have a question, feature request, or found a bug? We\'d love to hear from you.',
    contactEmailLabel: 'Email Us',
    contactEmailDesc: 'Send us an email and we\'ll get back to you.',
    contactResponseTime: 'We typically respond within 24 hours.',
    contactTopics: 'What can we help with?',
    contactTopic1: 'Bug reports & technical issues',
    contactTopic2: 'Feature requests & suggestions',
    contactTopic3: 'Billing & subscription questions',
    contactTopic4: 'General questions & feedback',

    // Guide page
    guideTitle: 'Usage Guide',
    guideIntro: 'typee turns content you love into language practice. Paste song lyrics, drop subtitle files, or import an Anki deck — then practice with typing, Fill-in-the-blank, or Word Rain modes.',
    guideStep1Title: '1. Create from Any Content',
    guideStep1Desc: 'Paste song lyrics or subtitles into the Media tab, or drop an .srt file. You can also import an Anki .apkg file or create cards manually. AI extracts vocabulary and cloze cards automatically.',
    guideStep2Title: '2. Choose a Practice Mode',
    guideStep2Desc: 'Select your deck and choose how you want to practice. You can type meanings, type words, or use smart review to focus on cards you struggle with.',
    guideStep3Title: '3. Type Your Answers',
    guideStep3Desc: 'See the prompt and type the answer. You get instant character-by-character feedback. Press Enter to submit, or skip cards you don\'t know yet.',
    guideStep4Title: '4. Track Your Progress',
    guideStep4Desc: 'After each session, see your accuracy, speed (WPM), and correct count. Over time, track mastery levels for each card and view your overall stats.',
    guideModesTitle: 'Practice Modes',
    guideModeFrontToBack: 'Type Meaning — See the word, type the definition/translation.',
    guideModeBackToFront: 'Type Word — See the meaning/hint, type the original word.',
    guideModeSequential: 'Sequential — Practice cards in order.',
    guideModeRandom: 'Random — Shuffle cards each session.',
    guideModeDifficult: 'Difficult First — Cards you get wrong most often appear first.',
    guideTipsTitle: 'Tips for Better Practice',
    guideTip1: 'Practice daily — even 5 minutes a day builds strong recall over time.',
    guideTip2: 'Use "Difficult First" mode to focus on your weakest cards.',
    guideTip3: 'Try both "Type Meaning" and "Type Word" modes for deeper learning.',
    guideTip4: 'Check your stats page regularly to see which cards need more attention.',
    guideFormatsTitle: 'Supported Inputs',
    guideFormatsDesc: 'typee accepts .srt subtitle files, .txt lyrics, and Anki .apkg decks. You can also paste text directly or create cards manually. CSV/TSV uploads with auto-detected field mapping are also supported.',
    guideFaqTitle: 'FAQ',
    guideFaq1Q: 'Is typee free?',
    guideFaq1A: 'Yes! The free plan includes 3 decks with up to 200 cards each, all practice modes, and basic stats. Upgrade to Pro for unlimited decks and advanced features.',
    guideFaq2Q: 'What languages are supported?',
    guideFaq2A: 'Any language that works in Anki works in typee — Japanese, Korean, Chinese, Spanish, French, German, and more.',
    guideFaq3Q: 'Can I use typee without an account?',
    guideFaq3A: 'Yes. You can try the demo or upload a deck as a guest. Create a free account to save your decks and track progress.',
    guideFaq4Q: 'How does Smart Review work?',
    guideFaq4A: 'Smart Review uses a confidence score that updates based on your accuracy. Cards you frequently get wrong are shown more often, while mastered cards appear less frequently.',

    // Terms page
    termsTitle: 'Terms of Service',
    termsLastUpdated: 'Last updated: March 2026',
    termsIntro: 'Welcome to typee. By accessing or using our service, you agree to these terms. Please read them carefully.',
    termsSection1Title: '1. Acceptance of Terms',
    termsSection1Desc: 'By using typee ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.',
    termsSection2Title: '2. Description of Service',
    termsSection2Desc: 'typee is a web-based language learning application. We provide tools for creating vocabulary decks from songs, subtitles, and text, as well as practice modes including typing, Fill-in-the-blank, and Word Game. Anki deck imports are also supported.',
    termsSection3Title: '3. User Accounts',
    termsSection3Desc: 'You may use some features without an account. To save decks and track progress, you need to create an account via Google OAuth or email. You are responsible for maintaining the security of your account.',
    termsSection4Title: '4. User Content',
    termsSection4Desc: 'You retain ownership of any content you upload (flashcard decks, data). By uploading content, you grant us a limited license to store and process it for the purpose of providing the Service. We do not claim ownership of your content.',
    termsSection5Title: '5. Acceptable Use',
    termsSection5Desc: 'You agree not to misuse the Service. This includes: uploading harmful or illegal content, attempting to disrupt the Service, reverse engineering, or using automated tools to scrape data.',
    termsSection6Title: '6. Payments & Subscriptions',
    termsSection6Desc: 'The Pro plan is billed through Stripe. You can cancel at any time. Refunds are handled on a case-by-case basis. We reserve the right to change pricing with reasonable notice.',
    termsSection7Title: '7. Limitation of Liability',
    termsSection7Desc: 'typee is provided "as is" without warranties. We are not liable for any data loss, interruption, or damages arising from the use of the Service. Use the Service at your own risk.',
    termsSection8Title: '8. Changes to Terms',
    termsSection8Desc: 'We may update these terms from time to time. Continued use of the Service after changes constitutes acceptance. We will notify users of significant changes via the website.',

    // Privacy page
    privacyTitle: 'Privacy Policy',
    privacyLastUpdated: 'Last updated: March 2026',
    privacyIntro: 'Your privacy matters to us. This policy explains what data we collect, how we use it, and your rights regarding your information.',
    privacySection1Title: '1. Information We Collect',
    privacySection1Desc: 'Account info (email, name) via Google OAuth or email sign-up. Decks and cards created from your content, plus practice data (accuracy, WPM, session history). Basic usage analytics (page views, feature usage). Payment info is processed by Stripe — we do not store your card details.',
    privacySection2Title: '2. How We Use Your Data',
    privacySection2Desc: 'To provide and improve the Service. To save your decks, track progress, and sync across devices. To process payments for Pro subscriptions. We do not sell your personal data to third parties.',
    privacySection3Title: '3. Data Storage',
    privacySection3Desc: 'Your data is stored securely using Supabase (hosted on AWS). Flashcard data and practice records are associated with your account. Guest data is stored locally in your browser only.',
    privacySection4Title: '4. Cookies & Local Storage',
    privacySection4Desc: 'We use local storage to save your preferences (theme, language, font size). Authentication tokens are stored securely. We do not use third-party tracking cookies.',
    privacySection5Title: '5. Third-Party Services',
    privacySection5Desc: 'Google OAuth for authentication. Stripe for payment processing. Supabase for database and auth. These services have their own privacy policies.',
    privacySection6Title: '6. Your Rights',
    privacySection6Desc: 'You can delete your account and all associated data at any time. You can export your data by downloading your decks. You can opt out of optional analytics. Contact us for any data-related requests.',
    privacySection7Title: '7. Contact',
    privacySection7Desc: 'If you have questions about this Privacy Policy, please reach out through our Contact page.',

    // Blog
    blogTitle: 'Blog',
    blogDescription: 'Explore the science and strategies behind typing-based language learning.',
    blogReadMore: 'Read more',
    blogMinRead: 'min',
    blogNoPosts: 'No posts yet. Check back soon!',
    blogBackToList: 'Back to Blog',
    blogToc: 'Table of Contents',
    blogRelated: 'Related Articles',
    footerBlog: 'Blog',

    // Media tab
    mediaTab: 'Media',
    uploadMediaFile: 'Drop SRT or lyrics file here',
    pasteSubtitles: 'Paste subtitles, lyrics, or any text here...',
    generateWithAI: 'Generate with AI',
    generating: 'Generating cards with AI...',
    vocabularyCards: 'Vocabulary',
    clozeCards: 'Fill in Blank',
    bothCardTypes: 'Both',
    supportedFormats: 'Supports .srt, .txt, .lrc files (max 2MB)',
    mediaNoContent: 'No content found in file',
    mediaPreview: 'Preview',
    generateMode: 'Card Type',
    lineCount: 'lines',
    sourceLangLabel: 'Source',
    targetLangLabel: 'Target',
    sourceLangTooltip: 'The language of your content (e.g. the language of the song or subtitle)',
    targetLangTooltip: 'The language you want to learn / translate into',

    // Game modes
    acidRain: 'Word Rain',
    fillBlank: 'Fill in Blank',
    classicTyping: 'Classic Typing',

    // Acid Rain
    score: 'Score',
    combo: 'Combo',
    level: 'Level',
    gameOver: 'Game Over',
    finalScore: 'Final Score',
    playAgain: 'Play Again',
    acidRainDesc: 'Words fall from above — type them to destroy!',
    fillBlankDesc: 'Fill in the blank with the correct word',
    backToFrontDesc: 'See the word → type it',
    wordTrain: 'Word Train',
    wordTrainDesc: 'See the meaning — type the word before the train passes!',
    wordTrainTimerDesc: 'Build combos for bonus time!',
    timeUp: "Time's Up!",
    wordsCompleted: 'Words',
    pronunciation: 'Pronunciation',
    targetWord: 'Target Word',

    // Fill Blank
    showHint: 'Show meaning hint',
    hintTimerLabel: 'Letter hint',
    fillInMissing: 'Type the missing word',

    // Onboarding
    onboardingWelcomeTitle: 'Welcome to typee!',
    onboardingWelcomeDesc: 'Learn languages by typing what you love. Paste song lyrics, subtitles, or any text — AI creates practice cards instantly.',
    onboardingCreateTitle: 'Create Your First Deck',
    onboardingCreateDesc: 'Paste lyrics, upload subtitles (.srt), import an Anki deck, or type cards manually. AI handles the rest.',
    onboardingStartTitle: 'Start Learning!',
    onboardingStartDesc: 'Create a deck to begin, or try the demo first to see how it works.',
    onboardingNext: 'Next',
    onboardingSkip: 'Skip',
    onboardingDone: "Let's Go!",

    // Community Gallery
    explore: 'Explore',
    exploreTitle: 'Community Decks',
    exploreSubtitle: 'Discover and clone decks shared by the community',
    searchDecks: 'Search decks...',
    filterByLanguage: 'Filter by language',
    allLanguages: 'All Languages',
    sortRecent: 'Recent',
    sortPopular: 'Popular',
    sortMostCloned: 'Most Cloned',
    publishDeck: 'Publish',
    unpublishDeck: 'Unpublish',
    likeDeck: 'Like',
    cloneDeck: 'Clone',
    cloneSuccess: 'Cloned!',
    cloneError: 'Failed to clone. Please try again.',
    cloneDeckLimit: 'Deck limit reached. Upgrade to Pro for unlimited decks.',
    publishedBy: 'by',
    displayName: 'Display Name',
    displayNamePlaceholder: 'Enter your public name...',
    setDisplayName: 'Set your display name to publish',
    noPublicDecks: 'No public decks yet. Be the first to share!',
    cardPreviewCount: 'Showing {n} cards',
    anonymous: 'Anonymous',
    signInToClone: 'Sign in to like and clone decks',

    // AI Deck Generation
    aiTopicLabel: 'Topic',
    aiTopicPlaceholder: 'e.g., K-POP vocabulary, Travel phrases, Food & cooking...',
    aiTopicRequired: 'Please enter a topic',
    aiTargetLang: 'Language',
    aiLevel: 'Level',
    aiBeginner: 'Beginner',
    aiIntermediate: 'Intermediate',
    aiAdvanced: 'Advanced',
    aiCardCount: 'Cards',
    aiGenerate: 'Generate Cards',
    aiGenerating: 'Generating...',
    aiPreview: 'Preview',
    aiQuotaRemaining: 'AI uses remaining',
    aiQuotaExceeded: 'Daily AI limit reached. Upgrade to Pro for more.',

    // Leaderboard
    leaderboardTitle: 'Leaderboard',
    leaderboardSubtitle: 'Top scores from the community',
    leaderboardDaily: 'Today',
    leaderboardWeekly: 'This Week',
    leaderboardAllTime: 'All Time',
    leaderboardPlayer: 'Player',
    leaderboardScore: 'Score',
    leaderboardEmpty: 'No scores yet. Be the first!',

    // Goals
    goalSettings: 'Practice Goals',
    goalSettingsDesc: 'Add a new goal',
    dailyGoal: 'Daily',
    weeklyGoal: 'Weekly',
    sessionsGoal: 'Sessions',
    minutesGoal: 'Minutes',
    cardsGoal: 'Cards',
    goalProgress: 'Goal Progress',
    goalComplete: 'Goal Complete!',
    goalCelebrationMsg: "Goal achieved! Keep it up!",
    setGoal: 'Set Goal',
    removeGoal: 'Remove',
    noGoalsYet: 'No goals set yet',

    // AI Coaching
    getAiTips: '✨ Get AI Tips',
    aiCoachingTitle: 'AI Coaching',
    aiCoachingLoading: 'Analyzing your session...',
    aiCoachingError: 'Failed to get tips. Please try again.',
    aiTipsRemaining: '{n} AI uses remaining today',
    retryBtn: 'Retry',

    // SRS Difficulty Rating
    rateAgain: 'Again',
    rateHard: 'Hard',
    rateGood: 'Good',
    rateEasy: 'Easy',
    rateHint: 'How well did you remember?',
    reviewSummary: '{cards} cards due across {decks} decks',
    reviewNow: 'Review Now',

    // XP & Level
    xpGained: '+{xp} XP',
    levelLabel: 'Level {level}',
    levelUp: 'Level Up!',
    xpToNext: '{xp} XP to next level',
    xpThisSession: 'XP this session',

    // Achievements
    achievementsTab: 'Achievements',
    achievementUnlocked: 'Achievement Unlocked!',
    achievementLocked: 'Locked',
    achievStreak3: '3-Day Streak',
    achievStreak7: 'Weekly Warrior',
    achievStreak30: 'Monthly Master',
    achievStreak100: 'Century Streak',
    achievSessions10: 'Getting Started',
    achievSessions50: 'Dedicated Learner',
    achievSessions100: 'Practice Pro',
    achievSessions500: 'Study Machine',
    achievMastery10: 'First Mastery',
    achievMastery50: 'Card Scholar',
    achievMastery100: 'Mastery Expert',
    achievSpeed40: 'Quick Fingers',
    achievSpeed60: 'Speed Demon',
    achievSpeed80: 'Lightning Typist',
    achievCards100: 'Card Collector',
    achievCards500: 'Card Enthusiast',
    achievCards1000: 'Card Master',
    achievVariety3: 'Mode Explorer',
    achievVariety5: 'Jack of All Trades',
  },

  ko: {
    appName: 'typee',
    subtitle: '노래 가사, 자막 파일, 또는 텍스트만 붙여넣으면 AI로 30초만에 단어 카드 생성.\n타이핑, 단어 게임, 빈칸채우기로 연습해보세요.',
    description: 'Anki 플래시카드를 타이핑 연습으로 변환합니다. WPM, 정확도를 추적하고 카드를 더 빠르게 마스터하세요.',
    footer: '타이핑으로 공부하기',

    signIn: '로그인',
    signOut: '로그아웃',
    signInWithGoogle: 'Google로 계속',
    signInWithTwitter: 'X로 계속',
    signInWithEmail: '이메일로 계속',
    emailPlaceholder: '이메일을 입력하세요...',

    loginHeroTitle: '좋아하는 노래와 영화로 언어를 배우세요',
    loginHeroDesc: '가사를 붙여넣거나 자막 파일을 올려보세요. AI가 카드를 즉시 생성하고 타이핑·빈칸채우기·단어게임으로 연습할 수 있어요.',
    loginFeature1: '가사·자막으로 AI 카드 생성',
    loginFeature2: 'WPM과 정확도 추적',
    loginFeature3: '빈칸채우기 & 단어게임 모드',
    loginWelcome: '환영합니다',
    loginDesc: '진행 상황을 저장하고 모든 기능을 이용하려면 로그인하세요.',
    loginOrDivider: '또는',
    loginTryDemo: '가입 없이 체험하기',
    loginReassurance1: '무료로 3개 덱 사용 가능',
    loginReassurance2: '신용카드 필요 없음',

    myDecks: '마이덱',
    uploadDeck: '덱 업로드',
    noDeckYet: '아직 덱이 없습니다. .apkg 파일을 업로드해서 시작하세요!',
    cards: '카드',
    lastPracticed: '최근 연습',
    deckLimitReached: '무료 플랜 한도 도달 (3개 덱). Pro로 업그레이드하면 무제한입니다.',
    shareDeck: '덱 공유',
    shareTypetris: '워드 레인 공유',
    shareWordTrain: '워드 트레인 공유',
    linkCopied: '링크 복사됨!',

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
    nextCard: '다음',
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
    shareResult: '결과 공유',
    backToDeck: '덱으로 돌아가기',

    statsTitle: '통계',
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


    ttsLabel: '단어 발음',
    confettiLabel: '콘페티 효과',

    soundEffectsDesc: '타이핑할 때 키보드 소리를 재생합니다',


    ttsDesc: '단어 완성 후 해당 언어로 발음을 읽어줍니다',
    confettiDesc: '정답 시 콘페티 애니메이션을 표시합니다',

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
    difficultFirstDesc: '가장 많이 틀린 카드를 먼저 보여줍니다.',
    smartReviewDesc: '간격 반복 기반으로 복습 기한이 된 카드를 우선 표시합니다. 새 카드는 중간에 섞입니다.',
    learning: '학습 중',
    familiar: '익숙함',
    mastered: '마스터',
    masteryProgress: '학습 진행률',
    dueForReview: '복습 예정',
    dueToday: '복습',
    cardsToReview: '복습할 카드',
    commonMistakes: '자주 틀린 패턴',
    vsLastSession: '이전 대비',
    showDetails: '입력 내용',
    hideDetails: '숨기기',

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

    createDeck: '+ 만들기',
    createDeckTitle: '새 덱 만들기',
    createDeckSubtitle: '텍스트, 미디어 또는 직접 카드를 입력하여 덱을 만드세요',
    deckNameLabel: '덱 이름',
    deckNamePlaceholder: '예) 한국어 기초 단어',
    deckNameRequired: '덱 이름을 입력해주세요.',
    cardsRequired: '카드를 1개 이상 입력해주세요.',
    cardSaveError: '카드 저장 중 오류가 발생했습니다.',
    columnFront: '단어 (앞면)',
    columnBack: '뜻 (뒷면)',
    columnPronunciation: '발음기호',
    columnStatus: '상태',
    fillInBlankSection: '빈칸 채우기',
    addRow: '+ 행 추가',
    addTenRows: '+ 10행 추가',
    maxLabel: '(최대)',
    savingLabel: '저장 중...',

    landingBadge: 'AI 탑재 · 무료로 시작',
    landingHero1: '최애 콘텐츠 붙여넣고',
    landingHero2: '타이핑으로 마스터하기',
    landingSubtext: '노래 가사, 자막 파일, 또는 텍스트만 붙여넣으면 AI로 30초만에 단어 카드 생성. 타이핑, 단어 게임, 빈칸채우기로 연습해보세요.',
    startForFree: '무료로 시작',
    tryWithoutDeck: '덱 없이 체험하기',
    landingKpopCta: '좋아하는 K-pop 가사를 붙여넣어 시작하세요',
    seeHowItWorks: '작동 방식 보기',
    howItWorksLabel: '작동 방식',
    howItWorksTitle: '3단계. 간편하게.',
    step01Title: '콘텐츠에서 만들기',
    step01Desc: '가사 붙여넣기, 자막 파일(.srt) 업로드, Anki 덱 임포트. AI가 어휘와 빈칸 카드를 자동 추출합니다.',
    step02Title: '원하는 방식으로 연습',
    step02Desc: '클래식 타이핑, 단어 게임(떨어지는 단어 받아치기), 빈칸채우기 중 선택하세요. 모든 모드에서 WPM과 정확도를 추적합니다.',
    step03Title: '실력 향상 확인',
    step03Desc: '모든 카드의 WPM, 정확도, 마스터리를 추적합니다. 약한 카드는 자동으로 더 자주 나타납니다.',
    featuresLabel: '기능',
    featuresTitle: '진짜 학습을 위해 만들었습니다.',
    feature1Title: 'AI 카드 생성',
    feature1Desc: '가사, 자막, 기사 어디서든 붙여넣기. GPT-4o-mini가 어휘를 추출하고 빈칸채우기 문제를 자동 생성합니다. 수동 작업 필요 없음.',
    feature2Title: '10가지 아름다운 테마',
    feature2Desc: 'Dark, Light, Dracula, Nord, Tokyo Night 등. 즉시 전환. 설정은 로컬에 저장됩니다.',
    feature3Title: '3가지 게임 모드',
    feature3Desc: '클래식 타이핑, 단어 게임(하늘에서 단어가 내려옵니다 — 타이핑으로 격추), 빈칸채우기. 다양한 모드로 지루하지 않게 학습하세요.',
    feature4Title: '모든 언어, 모든 콘텐츠',
    feature4Desc: '한국어, 일본어, 스페인어, 프랑스어 등. 가사, 영화 자막(.srt), Anki 덱 모두 지원합니다. 붙여넣을 수 있으면 공부할 수 있습니다.',
    getStartedLabel: '시작하기',
    getStartedTitle: '몇 초 만에 학습 시작.',
    getStartedDesc: '노래 가사나 자막 파일을 붙여넣으면 AI가 카드를 만들어 드립니다.',

    whatIsTitle: 'typee란?',
    whatIsDesc: 'typee는 AI 기반 언어 학습 도구입니다. 좋아하는 노래 가사, 영화 자막을 붙여넣기하면 AI가 어휘를 추출하고 연습 카드를 생성합니다. 그런 다음 클래식 타이핑, 단어 게임(하늘에서 단어가 내려옵니다 — 타이핑으로 격추), 또는 빈칸채우기로 연습하세요.',
    whatIsDetail1: 'Anki 덱, 노래 가사, 영화 자막(.srt) 어디서든 가져올 수 있습니다. AI가 어휘를 자동 추출하고 카드를 생성합니다 — 수동 작업 불필요.',
    whatIsDetail2: '클래식 타이핑은 근육 기억을 만들고, 단어 게임은 스피드를 키우고, 빈칸채우기는 문맥 이해력을 높입니다. 모든 모드가 같은 덱을 사용합니다.',
    whatIsDetail3: '6개 인터페이스 언어와 10+ 테마 지원. 무료 플랜은 3개 덱, 최대 200장. Pro 플랜은 월 $5로 무제한 덱.',
    homeFaqTitle: '자주 묻는 질문',
    homeFaq1Q: 'typee는 무엇이고 어떻게 작동하나요?',
    homeFaq1A: 'typee는 AI 기반 언어 학습 앱입니다. 가사, 자막(.srt)을 붙여넣으면 AI(GPT-4o-mini)가 어휘 카드를 자동 생성합니다. 클래식 타이핑, 단어 게임, 빈칸채우기 3가지 게임으로 연습할 수 있습니다. 모든 세션에서 WPM, 정확도, 마스터리를 추적합니다.',
    homeFaq2Q: 'typee는 무료인가요?',
    homeFaq2A: '네. 무료 플랜에는 3개 덱(각 최대 200장), 모든 연습 모드, 모든 테마, 기본 통계가 포함됩니다. Pro 플랜(월 $5 또는 연 $48)은 무제한 덱, 고급 진행 추적, 우선 지원을 제공합니다.',
    homeFaq3Q: '어떤 콘텐츠로 카드를 만들 수 있나요?',
    homeFaq3A: '가사 붙여넣기, 자막 파일(.srt) 업로드, 텍스트 붙여넣기, Anki 덱(.apkg) 임포트가 가능합니다. AI가 내용을 분석해 어휘 카드와 빈칸채우기 문제를 자동 생성합니다.',
    homeFaq4Q: '',
    homeFaq4A: '',
    homeFaq5Q: '어떤 게임 모드가 있나요?',
    homeFaq5A: 'typee는 3가지 연습 모드를 제공합니다: 클래식 타이핑(앞면 보고 답 입력), 단어 게임(위에서 단어가 떨어지면 타이핑으로 격추), 빈칸채우기(문장의 빈칸에 단어 입력). 모든 모드에서 WPM과 정확도를 추적합니다.',

    tryDemo: '덱 없이 체험',
    demoSubtitle: '로그인 없이 바로 체험하세요. 덱을 선택하고 타이핑을 시작하세요.',
    demoModeHintMeaning: '단어를 보고 → 영어 뜻을 타이핑',
    demoModeHintWord: '단어 + 영어 힌트를 보고 → 단어를 타이핑',
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
    resultsUpgradePrompt: '좋은 성적이에요! Pro로 학습 추이를 추적하세요.',
    resultsUpgradeCta: 'Pro 기능 보기 →',
    aiQuotaWarning: '오늘의 마지막 AI 요청입니다.',
    aiQuotaUpgrade: '더 필요하신가요? Pro로 업그레이드하면 50회/일 →',
    proGateUnlock: 'Pro로 잠금 해제',
    proGatePreview: '미리보기 — 업그레이드하여 전체 데이터 확인',
    streakMilestone: '놀라운 {n}일 연속! 계속 화이팅!',
    retentionStreakMilestone: '{n}일 연속 달성! 불타고 있어요!',
    retentionPracticeToday: '오늘 연습할 준비 되셨나요? 연속 기록을 유지하세요!',
    retentionWelcomeBack: '돌아오셨군요! 이어서 학습해볼까요?',
    retentionDueCards: '복습할 카드가 {n}장 있어요. 빠르게 연습할까요?',
    retentionStartBtn: '연습 시작',
    retentionDismiss: '닫기',
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
    footerAbout: '소개',
    footerContact: '문의하기',
    footerTerms: '이용약관',
    footerPrivacy: '개인정보처리방침',
    footerChangelog: '업데이트 기록',
    changelogTitle: '업데이트 기록',
    changelogIntro: 'typee의 새로운 업데이트를 확인하세요.',
    comingSoon: '준비 중입니다.',

    aboutTitle: 'typee 소개',
    aboutMission: '미션',
    aboutMissionDesc: 'typee는 언어 학습을 몰입적이고 효과적으로 만들기 위해 존재합니다. 좋아하는 노래 가사, 영화 자막, 기사 등 콘텐츠를 능동적인 타이핑 연습으로 전환하여 근육 기억을 쌓고 어휘를 오래 기억하며 진행 상황을 정확하게 추적할 수 있게 돕습니다.',
    aboutStory: '이야기',
    aboutStoryP1: 'typee는 단순한 아이디어에서 탄생했습니다. 언어를 배우는 가장 좋은 방법은 자신이 진정으로 좋아하는 콘텐츠를 활용하는 것입니다. 반복해서 듣는 노래, 정주행하는 드라마, 머릿속에 맴도는 가사 — 그곳에 진짜 어휘가 살아있습니다.',
    aboutStoryP2: '하지만 수동적으로 듣는 것만으로는 부족합니다. 모든 단어를 직접 타이핑해야 한다면 어떨까요? 타이핑은 능동적 회상을 강제합니다 — 속일 수 없습니다. K-pop 가사의 빈칸채우기이든 애니 어휘로 하는 단어게임이든, 모든 키 입력이 진짜 기억을 만들어냅니다.',
    aboutStoryP3: 'typee는 2026년 무료 웹 도구로 출시되었습니다. 노래 가사를 붙여넣거나, SRT 자막 파일을 올리면 AI가 어휘를 추출하고 몇 초 만에 타이핑 카드를 생성합니다. 타이핑 연습, 빈칸채우기, 워드 레인 세 가지 모드로 즐길 수 있습니다. 다운로드나 복잡한 설정 없이 — 그냥 붙여넣고 플레이하세요.',
    aboutWhyTitle: '왜 타이핑인가?',
    aboutWhy1: '능동적 회상 — 답을 직접 생산하면 인식만 하는 것보다 기억이 강화됩니다.',
    aboutWhy2: '맥락이 중요합니다 — 실제로 들어본 문장(노래나 드라마)으로 단어를 배우면 독립적인 학습으로는 불가능한 방식으로 기억에 남습니다.',
    aboutWhy3: '정직한 피드백 — 정확히 타이핑하거나 못하거나. 정말 알고 있었는지 더 이상 의심할 필요가 없습니다.',
    aboutWhy4: '측정 가능한 진행 — WPM과 정확도는 "알고 있었어"가 제공할 수 없는 구체적인 지표를 제공합니다.',
    aboutTechTitle: '기술 스택',
    aboutTechDesc: 'typee는 Vercel에서 호스팅되는 Next.js 웹 앱입니다. 덱은 브라우저에서 완전히 파싱됩니다 — .apkg 파일은 기기를 떠나지 않습니다. 인증과 진행 동기화에 Supabase, 결제에 Stripe을 사용합니다.',

    contactTitle: '문의하기',
    contactIntro: '질문, 기능 요청, 또는 버그를 발견하셨나요? 연락 주세요.',
    contactEmailLabel: '이메일 보내기',
    contactEmailDesc: '이메일을 보내주시면 답변 드리겠습니다.',
    contactResponseTime: '보통 24시간 내에 답변합니다.',
    contactTopics: '무엇을 도와드릴까요?',
    contactTopic1: '버그 신고 및 기술 문제',
    contactTopic2: '기능 요청 및 제안',
    contactTopic3: '결제 및 구독 질문',
    contactTopic4: '일반 질문 및 피드백',

    guideTitle: '사용 가이드',
    guideIntro: 'typee는 좋아하는 콘텐츠를 언어 연습으로 바꿔줍니다. 노래 가사를 붙여넣거나, 자막 파일을 올리거나, Anki 덱을 가져오면 타이핑·빈칸채우기·워드 레인 모드로 연습할 수 있습니다.',
    guideStep1Title: '1. 콘텐츠로 덱 만들기',
    guideStep1Desc: 'Media 탭에 노래 가사나 자막을 붙여넣거나 .srt 파일을 올려보세요. Anki .apkg 파일을 가져오거나 직접 카드를 만들 수도 있습니다. AI가 어휘와 빈칸채우기 카드를 자동으로 추출합니다.',
    guideStep2Title: '2. 연습 모드 선택',
    guideStep2Desc: '덱을 선택하고 원하는 연습 방식을 고르세요. 뜻 타이핑, 단어 타이핑, 또는 스마트 복습으로 취약한 카드에 집중할 수 있습니다.',
    guideStep3Title: '3. 답변 타이핑',
    guideStep3Desc: '문제를 보고 답을 입력하세요. 글자별 실시간 피드백을 받습니다. Enter로 제출하거나, 모르는 카드는 건너뛸 수 있습니다.',
    guideStep4Title: '4. 진행 상황 추적',
    guideStep4Desc: '각 세션 후 정확도, 속도(WPM), 맞은 수를 확인하세요. 시간이 지남에 따라 각 카드의 마스터리 레벨과 전체 통계를 추적하세요.',
    guideModesTitle: '연습 모드',
    guideModeFrontToBack: '뜻 타이핑 — 단어를 보고 정의/번역을 입력합니다.',
    guideModeBackToFront: '단어 타이핑 — 뜻/힌트를 보고 원래 단어를 입력합니다.',
    guideModeSequential: '순차 — 카드를 순서대로 연습합니다.',
    guideModeRandom: '랜덤 — 매 세션마다 카드를 섞습니다.',
    guideModeDifficult: '어려운 것 먼저 — 가장 많이 틀린 카드가 먼저 나타납니다.',
    guideTipsTitle: '효과적인 연습 팁',
    guideTip1: '매일 연습하세요 — 하루 5분이라도 꾸준히 하면 기억력이 크게 향상됩니다.',
    guideTip2: '"어려운 것 먼저" 모드로 취약한 카드에 집중하세요.',
    guideTip3: '"뜻 타이핑"과 "단어 타이핑" 모드를 번갈아 사용하면 더 깊이 학습할 수 있습니다.',
    guideTip4: '통계 페이지를 정기적으로 확인하여 어떤 카드에 더 주의가 필요한지 파악하세요.',
    guideFormatsTitle: '지원 입력 방식',
    guideFormatsDesc: 'typee는 .srt 자막 파일, .txt 가사, Anki .apkg 덱을 지원합니다. 텍스트를 직접 붙여넣거나 카드를 직접 만들 수도 있습니다. 필드 자동 감지 기능이 있는 CSV/TSV 업로드도 지원합니다.',
    guideFaqTitle: '자주 묻는 질문',
    guideFaq1Q: 'typee는 무료인가요?',
    guideFaq1A: '네! 무료 플랜에는 3개 덱(각 최대 200장), 모든 연습 모드, 기본 통계가 포함됩니다. Pro로 업그레이드하면 무제한 덱과 고급 기능을 이용할 수 있습니다.',
    guideFaq2Q: '어떤 언어를 지원하나요?',
    guideFaq2A: 'Anki에서 작동하는 모든 언어가 typee에서도 작동합니다 — 일본어, 한국어, 중국어, 스페인어, 프랑스어, 독일어 등.',
    guideFaq3Q: '계정 없이 사용할 수 있나요?',
    guideFaq3A: '네. 데모를 체험하거나 게스트로 덱을 업로드할 수 있습니다. 덱을 저장하고 진행 상황을 추적하려면 무료 계정을 만드세요.',
    guideFaq4Q: '스마트 복습은 어떻게 작동하나요?',
    guideFaq4A: '스마트 복습은 정확도를 기반으로 업데이트되는 신뢰도 점수를 사용합니다. 자주 틀리는 카드는 더 자주 나타나고, 마스터한 카드는 덜 자주 나타납니다.',

    termsTitle: '이용약관',
    termsLastUpdated: '최종 수정: 2026년 3월',
    termsIntro: 'typee에 오신 것을 환영합니다. 서비스를 이용함으로써 본 약관에 동의하게 됩니다. 주의 깊게 읽어주세요.',
    termsSection1Title: '1. 약관 동의',
    termsSection1Desc: 'typee("서비스")를 사용함으로써 본 이용약관에 동의하게 됩니다. 동의하지 않으시면 서비스를 이용하지 마세요.',
    termsSection2Title: '2. 서비스 설명',
    termsSection2Desc: 'typee는 웹 기반 언어 학습 애플리케이션입니다. 노래, 자막, 텍스트로 어휘 덱을 만들고, 타이핑·빈칸채우기·단어게임 등 연습 모드를 제공합니다. Anki 덱 가져오기도 지원합니다.',
    termsSection3Title: '3. 사용자 계정',
    termsSection3Desc: '일부 기능은 계정 없이 사용할 수 있습니다. 덱을 저장하고 진행 상황을 추적하려면 Google OAuth 또는 이메일로 계정을 만들어야 합니다. 계정 보안은 사용자의 책임입니다.',
    termsSection4Title: '4. 사용자 콘텐츠',
    termsSection4Desc: '업로드한 콘텐츠(플래시카드 덱, 데이터)의 소유권은 사용자에게 있습니다. 콘텐츠를 업로드함으로써 서비스 제공 목적으로 저장 및 처리하는 제한적 라이선스를 부여합니다. 사용자 콘텐츠의 소유권을 주장하지 않습니다.',
    termsSection5Title: '5. 허용되는 사용',
    termsSection5Desc: '서비스를 오용하지 않기로 동의합니다. 여기에는 유해하거나 불법적인 콘텐츠 업로드, 서비스 방해 시도, 리버스 엔지니어링, 자동화 도구를 이용한 데이터 스크래핑이 포함됩니다.',
    termsSection6Title: '6. 결제 및 구독',
    termsSection6Desc: 'Pro 플랜은 Stripe를 통해 결제됩니다. 언제든지 취소할 수 있습니다. 환불은 개별적으로 처리됩니다. 합리적인 사전 통지를 통해 가격을 변경할 수 있습니다.',
    termsSection7Title: '7. 책임 제한',
    termsSection7Desc: 'typee는 보증 없이 "있는 그대로" 제공됩니다. 서비스 사용으로 인한 데이터 손실, 중단 또는 손해에 대해 책임지지 않습니다. 사용자 본인의 책임 하에 서비스를 이용하세요.',
    termsSection8Title: '8. 약관 변경',
    termsSection8Desc: '본 약관은 수시로 업데이트될 수 있습니다. 변경 후 서비스를 계속 이용하면 변경 사항에 동의하는 것입니다. 중요한 변경 사항은 웹사이트를 통해 공지합니다.',

    privacyTitle: '개인정보처리방침',
    privacyLastUpdated: '최종 수정: 2026년 3월',
    privacyIntro: '개인정보 보호는 저희에게 중요합니다. 이 방침은 어떤 데이터를 수집하고, 어떻게 사용하며, 사용자의 권리에 대해 설명합니다.',
    privacySection1Title: '1. 수집하는 정보',
    privacySection1Desc: 'Google OAuth 또는 이메일 가입을 통한 계정 정보(이메일, 이름). 콘텐츠로 만든 덱·카드 및 연습 데이터(정확도, WPM, 세션 기록). 기본적인 사용 분석(페이지 조회, 기능 사용). 결제 정보는 Stripe에서 처리되며 카드 정보를 저장하지 않습니다.',
    privacySection2Title: '2. 데이터 사용 방법',
    privacySection2Desc: '서비스 제공 및 개선을 위해 사용합니다. 덱 저장, 진행 추적, 기기 간 동기화를 위해 사용합니다. Pro 구독 결제 처리를 위해 사용합니다. 개인 데이터를 제3자에게 판매하지 않습니다.',
    privacySection3Title: '3. 데이터 저장',
    privacySection3Desc: '데이터는 Supabase(AWS 호스팅)를 사용하여 안전하게 저장됩니다. 플래시카드 데이터와 연습 기록은 계정에 연결됩니다. 게스트 데이터는 브라우저 로컬에만 저장됩니다.',
    privacySection4Title: '4. 쿠키 및 로컬 저장소',
    privacySection4Desc: '환경설정(테마, 언어, 글꼴 크기)을 저장하기 위해 로컬 저장소를 사용합니다. 인증 토큰은 안전하게 저장됩니다. 서드파티 추적 쿠키를 사용하지 않습니다.',
    privacySection5Title: '5. 제3자 서비스',
    privacySection5Desc: '인증을 위한 Google OAuth. 결제 처리를 위한 Stripe. 데이터베이스 및 인증을 위한 Supabase. 이러한 서비스에는 자체 개인정보처리방침이 있습니다.',
    privacySection6Title: '6. 사용자 권리',
    privacySection6Desc: '언제든지 계정과 모든 관련 데이터를 삭제할 수 있습니다. 덱을 다운로드하여 데이터를 내보낼 수 있습니다. 선택적 분석을 거부할 수 있습니다. 데이터 관련 요청은 문의 페이지를 통해 연락해 주세요.',
    privacySection7Title: '7. 문의',
    privacySection7Desc: '개인정보처리방침에 대한 질문이 있으시면 문의 페이지를 통해 연락해 주세요.',

    // Blog
    blogTitle: '블로그',
    blogDescription: '타이핑 기반 언어 학습의 과학과 전략을 알아보세요.',
    blogReadMore: '더 읽기',
    blogMinRead: '분',
    blogNoPosts: '아직 글이 없습니다. 곧 업데이트됩니다!',
    blogBackToList: '블로그 목록',
    blogToc: '목차',
    blogRelated: '관련 글',
    footerBlog: '블로그',

    mediaTab: '미디어',
    uploadMediaFile: 'SRT 또는 가사 파일을 여기에 끌어다 놓기',
    pasteSubtitles: '자막, 가사 또는 텍스트를 붙여넣기...',
    generateWithAI: 'AI로 생성',
    generating: 'AI로 카드 생성 중...',
    vocabularyCards: '어휘',
    clozeCards: '빈칸 채우기',
    bothCardTypes: '둘 다',
    supportedFormats: '.srt, .txt, .lrc 파일 지원 (최대 2MB)',
    mediaNoContent: '파일에서 내용을 찾을 수 없습니다',
    mediaPreview: '미리보기',
    generateMode: '카드 유형',
    lineCount: '줄',
    sourceLangLabel: '원본 언어',
    targetLangLabel: '학습 언어',
    sourceLangTooltip: '콘텐츠의 언어 (예: 노래나 자막의 언어)',
    targetLangTooltip: '배우고 싶은 언어 / 번역할 언어',

    acidRain: '워드 레인',
    fillBlank: '빈칸 채우기',
    classicTyping: '클래식 타이핑',

    score: '점수',
    combo: '콤보',
    level: '레벨',
    gameOver: '게임 오버',
    finalScore: '최종 점수',
    playAgain: '다시 하기',
    acidRainDesc: '단어가 위에서 떨어집니다 — 타이핑으로 파괴하세요!',
    fillBlankDesc: '빈칸에 알맞은 단어를 채우세요',
    backToFrontDesc: '단어를 보고 → 그대로 타이핑',
    wordTrain: '워드 트레인',
    wordTrainDesc: '열차가 지나가기 전에 단어의 뜻을 보고 타이핑하세요',
    wordTrainTimerDesc: '콤보를 쌓아 보너스 시간을 얻으세요!',
    timeUp: '시간 종료!',
    wordsCompleted: '완료 단어',
    pronunciation: '발음 기호',
    targetWord: '목표 단어',

    showHint: '뜻 힌트 보기',
    hintTimerLabel: '글자 힌트',
    fillInMissing: '빠진 단어를 입력하세요',

    // Onboarding
    onboardingWelcomeTitle: 'typee에 오신 걸 환영합니다!',
    onboardingWelcomeDesc: '좋아하는 콘텐츠를 타이핑하며 언어를 배워보세요. 가사, 자막, 텍스트를 붙여넣으면 AI가 연습 카드를 만들어드립니다.',
    onboardingCreateTitle: '첫 번째 덱 만들기',
    onboardingCreateDesc: '가사 붙여넣기, 자막(.srt) 업로드, Anki 덱 가져오기, 또는 직접 카드를 작성하세요.',
    onboardingStartTitle: '학습을 시작하세요!',
    onboardingStartDesc: '덱을 만들어 시작하거나, 먼저 데모를 체험해보세요.',
    onboardingNext: '다음',
    onboardingSkip: '건너뛰기',
    onboardingDone: '시작하기!',

    // Community Gallery
    explore: '탐색',
    exploreTitle: '커뮤니티 덱',
    exploreSubtitle: '커뮤니티가 공유한 덱을 탐색하고 복제하세요',
    searchDecks: '덱 검색...',
    filterByLanguage: '언어 필터',
    allLanguages: '모든 언어',
    sortRecent: '최신순',
    sortPopular: '인기순',
    sortMostCloned: '복제 많은 순',
    publishDeck: '공개',
    unpublishDeck: '비공개',
    likeDeck: '좋아요',
    cloneDeck: '복제',
    cloneSuccess: '복제 완료!',
    cloneError: '복제 실패. 다시 시도해 주세요.',
    cloneDeckLimit: '덱 한도 초과. Pro로 업그레이드하면 무제한으로 사용할 수 있어요.',
    publishedBy: '작성자',
    displayName: '표시 이름',
    displayNamePlaceholder: '공개 이름을 입력하세요...',
    setDisplayName: '공개를 위해 표시 이름을 설정하세요',
    noPublicDecks: '공개 덱이 없어요. 처음으로 공유해 보세요!',
    cardPreviewCount: '{n}개 카드 미리보기',
    anonymous: '익명',
    signInToClone: '좋아요와 복제는 로그인 후 이용할 수 있어요',

    aiTopicLabel: '주제',
    aiTopicPlaceholder: '예: K-POP 어휘, 여행 회화, 음식 & 요리...',
    aiTopicRequired: '주제를 입력해주세요',
    aiTargetLang: '언어',
    aiLevel: '레벨',
    aiBeginner: '초급',
    aiIntermediate: '중급',
    aiAdvanced: '고급',
    aiCardCount: '카드 수',
    aiGenerate: '카드 생성',
    aiGenerating: '생성 중...',
    aiPreview: '미리보기',
    aiQuotaRemaining: 'AI 잔여 횟수',
    aiQuotaExceeded: '일일 AI 한도에 도달했습니다. Pro로 업그레이드하세요.',

    leaderboardTitle: '리더보드',
    leaderboardSubtitle: '커뮤니티 최고 점수',
    leaderboardDaily: '오늘',
    leaderboardWeekly: '이번 주',
    leaderboardAllTime: '전체',
    leaderboardPlayer: '플레이어',
    leaderboardScore: '점수',
    leaderboardEmpty: '아직 점수가 없습니다. 첫 번째가 되어보세요!',

    // Goals
    goalSettings: '연습 목표',
    goalSettingsDesc: '새 목표 추가',
    dailyGoal: '일일',
    weeklyGoal: '주간',
    sessionsGoal: '세션',
    minutesGoal: '분',
    cardsGoal: '카드',
    goalProgress: '목표 진행률',
    goalComplete: '목표 달성!',
    goalCelebrationMsg: '목표 달성! 계속 화이팅!',
    setGoal: '목표 설정',
    removeGoal: '삭제',
    noGoalsYet: '아직 목표가 없어요',

    // AI Coaching
    getAiTips: '✨ AI 팁 받기',
    aiCoachingTitle: 'AI 코칭',
    aiCoachingLoading: '세션을 분석 중이에요...',
    aiCoachingError: '팁을 가져오지 못했어요. 다시 시도해 주세요.',
    aiTipsRemaining: '오늘 남은 AI 사용 횟수: {n}회',
    retryBtn: '다시 시도',

    // SRS Difficulty Rating
    rateAgain: '다시',
    rateHard: '어려움',
    rateGood: '좋음',
    rateEasy: '쉬움',
    rateHint: '얼마나 잘 기억했나요?',
    reviewSummary: '{decks}개 덱에서 {cards}장 복습 예정',
    reviewNow: '지금 복습',

    // XP & Level
    xpGained: '+{xp} XP',
    levelLabel: '레벨 {level}',
    levelUp: '레벨 업!',
    xpToNext: '다음 레벨까지 {xp} XP',
    xpThisSession: '이번 세션 XP',

    // Achievements
    achievementsTab: '업적',
    achievementUnlocked: '업적 달성!',
    achievementLocked: '잠김',
    achievStreak3: '3일 연속',
    achievStreak7: '주간 전사',
    achievStreak30: '월간 마스터',
    achievStreak100: '100일 연속',
    achievSessions10: '시작이 반',
    achievSessions50: '열정적 학습자',
    achievSessions100: '연습 프로',
    achievSessions500: '학습 머신',
    achievMastery10: '첫 마스터리',
    achievMastery50: '카드 학자',
    achievMastery100: '마스터리 전문가',
    achievSpeed40: '빠른 손가락',
    achievSpeed60: '스피드 악마',
    achievSpeed80: '번개 타이피스트',
    achievCards100: '카드 수집가',
    achievCards500: '카드 매니아',
    achievCards1000: '카드 마스터',
    achievVariety3: '모드 탐험가',
    achievVariety5: '만능 플레이어',
  },

  ja: {
    appName: 'typee',
    subtitle: 'Ankiデッキをアップロード。\nタイピングで練習。\n記憶力を向上。',
    description: 'Ankiフラッシュカードをタイピング練習に変換。WPM・精度を追跡してカードをマスターしよう。',
    footer: 'タイピングで学ぶ',

    signIn: 'ログイン',
    signOut: 'ログアウト',
    signInWithGoogle: 'Googleで続ける',
    signInWithTwitter: 'Xで続ける',
    signInWithEmail: 'メールで続ける',
    emailPlaceholder: 'メールアドレスを入力...',

    loginHeroTitle: '好きな音楽・映画で語学を学ぼう',
    loginHeroDesc: '歌詞を貼り付けたり、字幕ファイルをドロップするだけ。AIがカードを生成し、タイピング・穴埋め・ワードゲームで練習できます。',
    loginFeature1: '歌詞・字幕からAIカード生成',
    loginFeature2: 'WPMと正確度を追跡',
    loginFeature3: '穴埋め＆ワードゲームモード',
    loginWelcome: 'ようこそ',
    loginDesc: 'ログインして進捗を保存し、すべての機能をご利用ください。',
    loginOrDivider: 'または',
    loginTryDemo: 'アカウントなしで体験',
    loginReassurance1: '無料で3デッキ利用可能',
    loginReassurance2: 'クレジットカード不要',

    myDecks: 'マイデッキ',
    uploadDeck: 'デッキをアップロード',
    noDeckYet: 'まだデッキがありません。.apkgファイルをアップロードして始めましょう！',
    cards: 'カード',
    lastPracticed: '最終練習',
    deckLimitReached: '無料プランの上限です（3デッキ）。Proにアップグレードで無制限。',
    shareDeck: 'デッキをシェア',
    shareTypetris: 'ワードレインをシェア',
    shareWordTrain: 'ワードトレインをシェア',
    linkCopied: 'リンクをコピー!',

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
    nextCard: '次へ',
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
    shareResult: '結果をシェア',
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


    ttsLabel: '単語の発音',
    confettiLabel: '紙吹雪エフェクト',

    soundEffectsDesc: 'タイピング中にキー入力音を再生します',


    ttsDesc: '単語の入力完了後に発音を読み上げます',
    confettiDesc: '正解時に紙吹雪アニメーションを表示します',

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
    difficultFirstDesc: 'よく間違えたカードを最初に表示します。',
    smartReviewDesc: '間隔反復に基づき復習期限のカードを優先表示します。新しいカードはその間に挟まれます。',
    learning: '学習中',
    familiar: '馴染み',
    mastered: 'マスター',
    masteryProgress: '習得進捗',
    dueForReview: '復習予定',
    dueToday: '復習',
    cardsToReview: '復習カード',
    commonMistakes: 'よくある間違い',
    vsLastSession: '前回との比較',
    showDetails: '入力内容',
    hideDetails: '非表示',

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

    createDeck: '+ 作成',
    createDeckTitle: '新しいデッキを作成',
    createDeckSubtitle: 'テキスト、メディア、または手動でカードを入力してデッキを作成',
    deckNameLabel: 'デッキ名',
    deckNamePlaceholder: '例) 日本語基礎単語',
    deckNameRequired: 'デッキ名を入力してください。',
    cardsRequired: 'カードを1枚以上入力してください。',
    cardSaveError: 'カードの保存中にエラーが発生しました。',
    columnFront: '単語（表）',
    columnBack: '意味（裏）',
    columnPronunciation: '読み方',
    columnStatus: 'ステータス',
    fillInBlankSection: '穴埋め問題',
    addRow: '+ 行を追加',
    addTenRows: '+ 10行を追加',
    maxLabel: '（上限）',
    savingLabel: '保存中...',

    landingBadge: 'AI搭載 · 無料で始める',
    landingHero1: '推しの歌詞・ドラマで',
    landingHero2: '韓国語をマスターしよう',
    landingSubtext: 'K-POPの歌詞やドラマの字幕を貼り付けるだけ。AIが30秒で単語カードを自動生成 — タイピング、ワードゲーム、穴埋め問題で楽しく練習。',
    startForFree: '無料で始める',
    tryWithoutDeck: 'デッキなしで試す',
    landingKpopCta: '好きなK-POPの歌詞を貼り付けて始めよう',
    seeHowItWorks: '使い方を見る',
    howItWorksLabel: '使い方',
    howItWorksTitle: '3ステップ。簡単シンプル。',
    step01Title: 'コンテンツから作成',
    step01Desc: '歌詞を貼り付け、字幕ファイル(.srt)をドロップ、またはAnkiデッキをインポート。AIが語彙と穴埋めカードを自動抽出。',
    step02Title: '好きな方法で練習',
    step02Desc: 'クラシックタイピング、ワードゲーム（落ちてくる単語をタイピングで撃破）、穴埋め問題から選択。全モードでWPMと精度を追跡。',
    step03Title: '上達を確認',
    step03Desc: 'すべてのカードのWPM、精度、習熟度を時系列で追跡。苦手なカードは自動的に多く出題されます。',
    featuresLabel: '機能',
    featuresTitle: '本物の学習のために作られています。',
    feature1Title: 'AIカード生成',
    feature1Desc: '歌詞、字幕、記事など何でも貼り付けるだけ。GPT-4o-miniが語彙を抽出し穴埋め問題を自動生成。手作業不要。',
    feature2Title: '10種類の美しいテーマ',
    feature2Desc: 'ダーク、ライト、ドラキュラ、ノルド、Tokyo Nightなど。即時切替。設定はローカルに保存。',
    feature3Title: '3つのゲームモード',
    feature3Desc: 'クラシックタイピング、ワードゲーム（単語が空から降ってくる — タイピングで撃破）、穴埋め問題。飽きないモードで学習継続。',
    feature4Title: 'あらゆる言語、あらゆるコンテンツ',
    feature4Desc: '日本語、韓国語、スペイン語、フランス語など。歌詞、映画字幕(.srt)、Ankiデッキに対応。貼り付けられるものはすべて学習できます。',
    getStartedLabel: '今すぐ始める',
    getStartedTitle: '数秒で学習開始。',
    getStartedDesc: '推しの歌詞や字幕を貼り付けるだけ。AIがカードを自動作成。',

    whatIsTitle: 'typeeとは？',
    whatIsDesc: 'typeeはAI搭載の言語学習ツールです。好きな曲の歌詞、映画の字幕を貼り付けると、AIが語彙を抽出して練習カードを作成します。クラシックタイピング、ワードゲーム（単語が空から降ってきます — タイピングで撃破）、または穴埋め問題でゲーム感覚で練習しましょう。',
    whatIsDetail1: 'Ankiデッキ、歌詞、映画字幕(.srt)からコンテンツを取り込めます。AIが自動で語彙を抽出しカードを生成 — 手作業不要。',
    whatIsDetail2: 'クラシックタイピングは筋肉記憶を構築。ワードゲームはスピードを鍛える。穴埋めは文脈理解を深める。すべてのモードが同じデッキを使用。',
    whatIsDetail3: '6言語インターフェースと10以上のテーマ対応。無料プランは3デッキ各最大200枚。Proプランは月額$5で無制限デッキ。',
    homeFaqTitle: 'よくある質問',
    homeFaq1Q: 'typeeとは何ですか？どのように動作しますか？',
    homeFaq1A: 'typeeはAI搭載の言語学習アプリです。歌詞、字幕(.srt)を貼り付けるとAI（GPT-4o-mini）が語彙カードを自動生成します。クラシックタイピング、ワードゲーム、穴埋め問題の3つのゲームモードで練習できます。WPM、精度、習熟度を毎回追跡します。',
    homeFaq2Q: 'typeeは無料ですか？',
    homeFaq2A: 'はい。無料プランには3デッキ（各最大200枚）、すべての練習モード、すべてのテーマ、基本統計が含まれます。Proプラン（月額$5または年額$48）で無制限デッキ、高度な進捗追跡、優先サポートが利用できます。',
    homeFaq3Q: 'どんなコンテンツからカードを作れますか？',
    homeFaq3A: '歌詞の貼り付け、字幕ファイル(.srt)のアップロード、テキストの貼り付け、Ankiデッキ(.apkg)のインポートが可能です。AIがコンテンツを分析して語彙カードと穴埋め問題を自動生成します。',
    homeFaq4Q: 'Ankiデッキがなくても使えますか？',
    homeFaq4A: 'はい。どんなテキストコンテンツからでもAIで直接デッキを作成できます — 歌詞や字幕を貼り付ければカードが自動生成されます。Ankiデッキ(.apkg)のインポートも対応しています。',
    homeFaq5Q: 'どのゲームモードがありますか？',
    homeFaq5A: 'typeeは3つの練習モードを提供します：クラシックタイピング（表を見て答えを入力）、ワードゲーム（上から単語が降ってくる — タイピングで撃破）、穴埋め問題（文章の空欄に単語を入力）。全モードでWPMと精度を追跡します。',

    tryDemo: 'デッキなしで体験',
    demoSubtitle: 'アカウント不要。デッキを選んでタイピングを始めましょう。',
    demoModeHintMeaning: '単語を見て → 英語の意味をタイピング',
    demoModeHintWord: '単語＋英語ヒントを見て → 単語をタイピング',
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
    resultsUpgradePrompt: '素晴らしいスコア！Proで学習の推移を追跡しましょう。',
    resultsUpgradeCta: 'Pro機能を見る →',
    aiQuotaWarning: '今日最後のAIリクエストです。',
    aiQuotaUpgrade: 'もっと必要ですか？Proなら50回/日 →',
    proGateUnlock: 'Proでロック解除',
    proGatePreview: 'プレビュー — アップグレードで全データ表示',
    streakMilestone: '{n}日連続達成！この調子で頑張りましょう！',
    retentionStreakMilestone: '{n}日連続！絶好調です！',
    retentionPracticeToday: '今日も練習しませんか？連続記録を維持しましょう！',
    retentionWelcomeBack: 'おかえりなさい！続きから始めましょう。',
    retentionDueCards: '復習カードが{n}枚あります。クイック練習しますか？',
    retentionStartBtn: '練習開始',
    retentionDismiss: '閉じる',
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
    footerAbout: '概要',
    footerContact: 'お問い合わせ',
    footerTerms: '利用規約',
    footerPrivacy: 'プライバシーポリシー',
    footerChangelog: '更新履歴',
    changelogTitle: '更新履歴',
    changelogIntro: 'typeeの最新アップデートをご確認ください。',
    comingSoon: '準備中です。',

    aboutTitle: 'typeeについて',
    aboutMission: 'ミッション',
    aboutMissionDesc: 'typeeは、語学学習をより没入的で効果的にするために存在します。好きな曲の歌詞、映画の字幕、記事などをアクティブなタイピング練習に変換し、筋肉記憶の構築、語彙の定着、進捗の正確な追跡をサポートします。',
    aboutStory: 'ストーリー',
    aboutStoryP1: 'typeeはシンプルなアイデアから生まれました。語学学習の最良の方法は、自分が本当に好きなコンテンツを使うことです。何度も聴く曲、一気見するドラマ、頭に残る歌詞 — そこに本物の語彙があります。',
    aboutStoryP2: 'しかし、受動的に聴くだけでは十分ではありません。すべての単語をタイピングしなければならないとしたら？タイピングは能動的想起を強制します — ごまかせません。K-POPの歌詞の穴埋めでも、アニメの語彙でのワードゲームでも、すべてのキー入力が本物の記憶を作ります。',
    aboutStoryP3: 'typeeは2026年に無料ウェブツールとしてリリースされました。歌詞を貼り付けたり、SRT字幕ファイルをドロップするだけで、AIが語彙を抽出し、数秒でタイピングカードを生成します。タイピング練習・穴埋め・ワードレインの3つのモードで楽しめます。ダウンロード不要、面倒な設定なし — 貼り付けてすぐプレイ。',
    aboutWhyTitle: 'なぜタイピング？',
    aboutWhy1: '能動的想起 — 答えを自分で生産することで、認識だけよりも記憶が強化されます。',
    aboutWhy2: '文脈が大切 — 実際に聞いたことのある文章（曲やドラマ）で単語を学ぶと、孤立した学習ではできない形で記憶に定着します。',
    aboutWhy3: '正直なフィードバック — 正確にタイピングするか、しないか。本当に知っていたかどうかを迷う必要はありません。',
    aboutWhy4: '測定可能な進歩 — WPMと精度は「知っていた」では得られない具体的な指標を提供します。',
    aboutTechTitle: '技術スタック',
    aboutTechDesc: 'typeeはVercelでホストされるNext.jsウェブアプリです。デッキはブラウザで完全に解析されます — .apkgファイルはデバイスから離れません。認証とSupabase、決済にStripeを使用しています。',

    contactTitle: 'お問い合わせ',
    contactIntro: 'ご質問、機能リクエスト、バグの報告がありましたらお気軽にどうぞ。',
    contactEmailLabel: 'メールを送る',
    contactEmailDesc: 'メールをお送りいただければ、ご返信いたします。',
    contactResponseTime: '通常24時間以内にご返信いたします。',
    contactTopics: 'サポート内容',
    contactTopic1: 'バグ報告と技術的な問題',
    contactTopic2: '機能リクエストと提案',
    contactTopic3: '請求とサブスクリプションの質問',
    contactTopic4: '一般的な質問とフィードバック',

    guideTitle: '使い方ガイド',
    guideIntro: 'typeeは好きなコンテンツを語学練習に変えます。歌詞を貼り付けたり、字幕ファイルをドロップしたり、Ankiデッキをインポートして、タイピング・穴埋め・ワードレインのモードで練習できます。',
    guideStep1Title: '1. コンテンツからデッキを作成',
    guideStep1Desc: 'MediaタブにSRTファイルをドロップするか、歌詞を貼り付けてください。Anki .apkgファイルのインポートや手動でのカード作成も可能です。AIが語彙と穴埋めカードを自動的に抽出します。',
    guideStep2Title: '2. 練習モードを選択',
    guideStep2Desc: 'デッキを選択し、練習方法を選びましょう。意味を入力、単語を入力、またはスマートレビューで苦手なカードに集中できます。',
    guideStep3Title: '3. 答えを入力',
    guideStep3Desc: 'プロンプトを見て答えを入力します。文字ごとにリアルタイムフィードバックが得られます。Enterで送信、わからないカードはスキップできます。',
    guideStep4Title: '4. 進捗を追跡',
    guideStep4Desc: '各セッション後に精度、速度（WPM）、正解数を確認できます。時間とともに各カードのマスタリーレベルと全体の統計を追跡しましょう。',
    guideModesTitle: '練習モード',
    guideModeFrontToBack: '意味を入力 — 単語を見て、定義/翻訳を入力します。',
    guideModeBackToFront: '単語を入力 — 意味/ヒントを見て、元の単語を入力します。',
    guideModeSequential: '順番通り — カードを順番に練習します。',
    guideModeRandom: 'ランダム — 毎回カードをシャッフルします。',
    guideModeDifficult: '難しい順 — 最もよく間違えるカードが最初に表示されます。',
    guideTipsTitle: '効果的な練習のコツ',
    guideTip1: '毎日練習しましょう — 1日5分でも続ければ記憶力が大きく向上します。',
    guideTip2: '「難しい順」モードで苦手なカードに集中しましょう。',
    guideTip3: '「意味を入力」と「単語を入力」の両方のモードを使うと、より深い学習ができます。',
    guideTip4: '統計ページを定期的に確認して、どのカードに注意が必要か把握しましょう。',
    guideFormatsTitle: '対応入力形式',
    guideFormatsDesc: 'typeeは.srt字幕ファイル、.txt歌詞ファイル、Anki .apkgデッキに対応しています。テキストを直接貼り付けたり、手動でカードを作成したりすることもできます。フィールド自動検出付きのCSV/TSVアップロードにも対応しています。',
    guideFaqTitle: 'よくある質問',
    guideFaq1Q: 'typeeは無料ですか？',
    guideFaq1A: 'はい！無料プランには3デッキ（各最大200枚）、全練習モード、基本統計が含まれます。Proにアップグレードすると無制限のデッキと高度な機能が利用できます。',
    guideFaq2Q: 'どの言語に対応していますか？',
    guideFaq2A: 'Ankiで使えるすべての言語がtypeeでも使えます — 日本語、韓国語、中国語、スペイン語、フランス語、ドイツ語など。',
    guideFaq3Q: 'アカウントなしで使えますか？',
    guideFaq3A: 'はい。デモを試したり、ゲストとしてデッキをアップロードできます。デッキを保存して進捗を追跡するには無料アカウントを作成してください。',
    guideFaq4Q: 'スマートレビューはどう機能しますか？',
    guideFaq4A: 'スマートレビューは精度に基づいて更新される信頼度スコアを使用します。よく間違えるカードはより頻繁に表示され、マスターしたカードはあまり表示されません。',

    termsTitle: '利用規約',
    termsLastUpdated: '最終更新: 2026年3月',
    termsIntro: 'typeeへようこそ。サービスを利用することにより、本規約に同意したものとみなされます。注意してお読みください。',
    termsSection1Title: '1. 規約の承認',
    termsSection1Desc: 'typee（「サービス」）を使用することにより、本利用規約に拘束されることに同意します。同意しない場合は、サービスを利用しないでください。',
    termsSection2Title: '2. サービスの説明',
    termsSection2Desc: 'typeeはWebベースの語学学習アプリケーションです。曲、字幕、テキストから語彙デッキを作成し、タイピング・穴埋め・ワードゲームなどの練習モードを提供します。Ankiデッキのインポートにも対応しています。',
    termsSection3Title: '3. ユーザーアカウント',
    termsSection3Desc: '一部の機能はアカウントなしで利用できます。デッキを保存し進捗を追跡するには、Google OAuthまたはメールでアカウントを作成する必要があります。アカウントのセキュリティはユーザーの責任です。',
    termsSection4Title: '4. ユーザーコンテンツ',
    termsSection4Desc: 'アップロードしたコンテンツ（フラッシュカードデッキ、データ）の所有権はユーザーにあります。コンテンツをアップロードすることにより、サービス提供の目的で保存・処理するための限定的なライセンスを付与します。',
    termsSection5Title: '5. 許可される使用',
    termsSection5Desc: 'サービスを悪用しないことに同意します。これには、有害または違法なコンテンツのアップロード、サービスの妨害、リバースエンジニアリング、自動化ツールによるデータスクレイピングが含まれます。',
    termsSection6Title: '6. 支払いとサブスクリプション',
    termsSection6Desc: 'ProプランはStripeを通じて請求されます。いつでもキャンセルできます。払い戻しはケースバイケースで対応します。合理的な事前通知により価格を変更する権利を留保します。',
    termsSection7Title: '7. 責任の制限',
    termsSection7Desc: 'typeeは保証なしに「現状のまま」提供されます。サービスの使用から生じるデータ損失、中断、または損害について責任を負いません。',
    termsSection8Title: '8. 規約の変更',
    termsSection8Desc: '本規約は随時更新される場合があります。変更後もサービスを継続して利用することは、変更への同意を意味します。重要な変更はウェブサイトを通じてお知らせします。',

    privacyTitle: 'プライバシーポリシー',
    privacyLastUpdated: '最終更新: 2026年3月',
    privacyIntro: 'プライバシーは私たちにとって重要です。このポリシーでは、収集するデータ、使用方法、およびお客様の権利について説明します。',
    privacySection1Title: '1. 収集する情報',
    privacySection1Desc: 'Google OAuthまたはメール登録によるアカウント情報（メール、名前）。コンテンツから作成したデッキ・カードと練習データ（精度、WPM、セッション履歴）。基本的な使用分析（ページビュー、機能使用）。支払い情報はStripeで処理され、カード情報は保存しません。',
    privacySection2Title: '2. データの使用方法',
    privacySection2Desc: 'サービスの提供と改善のために使用します。デッキの保存、進捗追跡、デバイス間の同期のために使用します。Proサブスクリプションの決済処理のために使用します。個人データを第三者に販売しません。',
    privacySection3Title: '3. データの保管',
    privacySection3Desc: 'データはSupabase（AWSホスティング）を使用して安全に保管されます。フラッシュカードデータと練習記録はアカウントに関連付けられます。ゲストデータはブラウザのローカルにのみ保存されます。',
    privacySection4Title: '4. クッキーとローカルストレージ',
    privacySection4Desc: '設定（テーマ、言語、フォントサイズ）を保存するためにローカルストレージを使用します。認証トークンは安全に保存されます。サードパーティのトラッキングクッキーは使用しません。',
    privacySection5Title: '5. サードパーティサービス',
    privacySection5Desc: '認証のためのGoogle OAuth。決済処理のためのStripe。データベースと認証のためのSupabase。これらのサービスには独自のプライバシーポリシーがあります。',
    privacySection6Title: '6. ユーザーの権利',
    privacySection6Desc: 'いつでもアカウントと関連するすべてのデータを削除できます。デッキをダウンロードしてデータをエクスポートできます。オプションの分析をオプトアウトできます。データに関するリクエストはお問い合わせページからご連絡ください。',
    privacySection7Title: '7. お問い合わせ',
    privacySection7Desc: 'プライバシーポリシーに関するご質問は、お問い合わせページからご連絡ください。',

    // Blog
    blogTitle: 'ブログ',
    blogDescription: 'タイピングによる言語学習の科学と戦略を探求します。',
    blogReadMore: '続きを読む',
    blogMinRead: '分',
    blogNoPosts: 'まだ記事がありません。もうすぐ更新されます！',
    blogBackToList: 'ブログ一覧',
    blogToc: '目次',
    blogRelated: '関連記事',
    footerBlog: 'ブログ',

    mediaTab: 'メディア',
    uploadMediaFile: 'SRTまたは歌詞ファイルをここにドロップ',
    pasteSubtitles: '字幕、歌詞、テキストを貼り付け...',
    generateWithAI: 'AIで生成',
    generating: 'AIでカード生成中...',
    vocabularyCards: '語彙',
    clozeCards: '穴埋め',
    bothCardTypes: '両方',
    supportedFormats: '.srt, .txt, .lrcファイル対応（最大2MB）',
    mediaNoContent: 'ファイルにコンテンツが見つかりません',
    mediaPreview: 'プレビュー',
    generateMode: 'カードタイプ',
    lineCount: '行',
    sourceLangLabel: '元の言語',
    targetLangLabel: '学習言語',
    sourceLangTooltip: 'コンテンツの言語（例：曲や字幕の言語）',
    targetLangTooltip: '学びたい言語・翻訳先の言語',

    acidRain: 'ワードレイン',
    fillBlank: '穴埋め',
    classicTyping: 'クラシックタイピング',

    score: 'スコア',
    combo: 'コンボ',
    level: 'レベル',
    gameOver: 'ゲームオーバー',
    finalScore: '最終スコア',
    playAgain: 'もう一度',
    acidRainDesc: '上から単語が落ちてくる — タイピングで破壊！',
    fillBlankDesc: '空欄に正しい単語を入力してください',
    backToFrontDesc: '単語を見て → そのまま入力',
    wordTrain: 'ワードトレイン',
    wordTrainDesc: '単語の意味を見て、列車が通り過ぎる前にタイピング！',
    wordTrainTimerDesc: 'コンボでボーナスタイムを獲得！',
    timeUp: 'タイムアップ！',
    wordsCompleted: '完了単語',
    pronunciation: '発音記号',
    targetWord: '目標単語',

    showHint: '意味ヒントを表示',
    hintTimerLabel: '文字ヒント',
    fillInMissing: '欠けている単語を入力',

    // Onboarding
    onboardingWelcomeTitle: 'typeeへようこそ！',
    onboardingWelcomeDesc: '好きなコンテンツをタイピングして言語を学びましょう。歌詞、字幕、テキストを貼り付ければAIが練習カードを作成します。',
    onboardingCreateTitle: '最初のデッキを作成',
    onboardingCreateDesc: '歌詞の貼り付け、字幕(.srt)アップロード、Ankiデッキのインポート、または手動でカードを作成できます。',
    onboardingStartTitle: '学習を始めよう！',
    onboardingStartDesc: 'デッキを作成して始めるか、まずデモを試してみましょう。',
    onboardingNext: '次へ',
    onboardingSkip: 'スキップ',
    onboardingDone: 'はじめる！',

    // Community Gallery
    explore: '探索',
    exploreTitle: 'コミュニティデッキ',
    exploreSubtitle: 'コミュニティが共有したデッキを見つけてクローンしよう',
    searchDecks: 'デッキを検索...',
    filterByLanguage: '言語フィルター',
    allLanguages: 'すべての言語',
    sortRecent: '最新順',
    sortPopular: '人気順',
    sortMostCloned: 'クローン数順',
    publishDeck: '公開',
    unpublishDeck: '非公開',
    likeDeck: 'いいね',
    cloneDeck: 'クローン',
    cloneSuccess: 'クローン完了！',
    cloneError: 'クローンに失敗しました。再試行してください。',
    cloneDeckLimit: 'デッキ上限に達しました。Proにアップグレードして無制限に。',
    publishedBy: '作成者',
    displayName: '表示名',
    displayNamePlaceholder: '公開名を入力してください...',
    setDisplayName: '公開するには表示名を設定してください',
    noPublicDecks: '公開デッキはまだありません。最初に共有しましょう！',
    cardPreviewCount: '{n}枚のカードを表示',
    anonymous: '匿名',
    signInToClone: 'いいねとクローンはサインイン後にご利用いただけます',

    aiTopicLabel: 'トピック',
    aiTopicPlaceholder: '例：K-POP語彙、旅行フレーズ、食べ物＆料理...',
    aiTopicRequired: 'トピックを入力してください',
    aiTargetLang: '言語',
    aiLevel: 'レベル',
    aiBeginner: '初級',
    aiIntermediate: '中級',
    aiAdvanced: '上級',
    aiCardCount: 'カード数',
    aiGenerate: 'カードを生成',
    aiGenerating: '生成中...',
    aiPreview: 'プレビュー',
    aiQuotaRemaining: 'AI残り回数',
    aiQuotaExceeded: '本日のAI上限に達しました。Proにアップグレードしてください。',

    leaderboardTitle: 'リーダーボード',
    leaderboardSubtitle: 'コミュニティのトップスコア',
    leaderboardDaily: '今日',
    leaderboardWeekly: '今週',
    leaderboardAllTime: '全期間',
    leaderboardPlayer: 'プレイヤー',
    leaderboardScore: 'スコア',
    leaderboardEmpty: 'まだスコアがありません。最初の一人になりましょう！',

    // Goals
    goalSettings: '練習目標',
    goalSettingsDesc: '新しい目標を追加',
    dailyGoal: '毎日',
    weeklyGoal: '毎週',
    sessionsGoal: 'セッション',
    minutesGoal: '分',
    cardsGoal: 'カード',
    goalProgress: '目標の進捗',
    goalComplete: '目標達成！',
    goalCelebrationMsg: '目標達成！その調子で続けましょう！',
    setGoal: '目標を設定',
    removeGoal: '削除',
    noGoalsYet: 'まだ目標がありません',

    // AI Coaching
    getAiTips: '✨ AIアドバイスを取得',
    aiCoachingTitle: 'AIコーチング',
    aiCoachingLoading: 'セッションを分析中...',
    aiCoachingError: 'アドバイスの取得に失敗しました。再試行してください。',
    aiTipsRemaining: '今日の残りAI使用回数: {n}回',
    retryBtn: '再試行',

    // SRS Difficulty Rating
    rateAgain: 'もう一度',
    rateHard: '難しい',
    rateGood: '良い',
    rateEasy: '簡単',
    rateHint: 'どのくらい覚えていましたか？',
    reviewSummary: '{decks}デッキで{cards}枚の復習予定',
    reviewNow: '今すぐ復習',

    // XP & Level
    xpGained: '+{xp} XP',
    levelLabel: 'レベル {level}',
    levelUp: 'レベルアップ！',
    xpToNext: '次のレベルまで {xp} XP',
    xpThisSession: '今回のセッションXP',

    // Achievements
    achievementsTab: '実績',
    achievementUnlocked: '実績解除！',
    achievementLocked: 'ロック中',
    achievStreak3: '3日連続',
    achievStreak7: 'ウィークリーウォリアー',
    achievStreak30: 'マンスリーマスター',
    achievStreak100: '100日連続',
    achievSessions10: 'スタート',
    achievSessions50: '熱心な学習者',
    achievSessions100: '練習プロ',
    achievSessions500: '学習マシン',
    achievMastery10: '初マスタリー',
    achievMastery50: 'カードスカラー',
    achievMastery100: 'マスタリーエキスパート',
    achievSpeed40: 'クイックフィンガー',
    achievSpeed60: 'スピードデーモン',
    achievSpeed80: 'ライトニングタイピスト',
    achievCards100: 'カードコレクター',
    achievCards500: 'カードマニア',
    achievCards1000: 'カードマスター',
    achievVariety3: 'モード探検家',
    achievVariety5: 'オールラウンダー',
  },

  es: {
    appName: 'typee',
    subtitle: 'Sube tu mazo Anki.\nPractica escribiendo.\nMejora tu memoria.',
    description: 'Convierte tus tarjetas Anki en práctica de escritura. Mide tu WPM, precisión y domina tus tarjetas más rápido.',
    footer: 'Aprende escribiendo',

    signIn: 'Iniciar sesión',
    signOut: 'Cerrar sesión',
    signInWithGoogle: 'Continuar con Google',
    signInWithTwitter: 'Continuar con X',
    signInWithEmail: 'Continuar con Email',
    emailPlaceholder: 'Introduce tu email...',

    loginHeroTitle: 'Aprende idiomas con música y películas',
    loginHeroDesc: 'Pega letras, sube archivos de subtítulos o cualquier texto. La IA crea tarjetas al instante para practicar con escritura, rellena espacios y juegos.',
    loginFeature1: 'Tarjetas IA desde letras y subtítulos',
    loginFeature2: 'Seguimiento de WPM y precisión',
    loginFeature3: 'Modos Rellena espacios y Juego',
    loginWelcome: 'Bienvenido',
    loginDesc: 'Inicia sesión para guardar tu progreso y desbloquear todas las funciones.',
    loginOrDivider: 'o',
    loginTryDemo: 'Probar sin cuenta',
    loginReassurance1: '3 mazos gratis incluidos',
    loginReassurance2: 'No se requiere tarjeta de crédito',

    myDecks: 'Mis Mazos',
    uploadDeck: 'Subir Mazo',
    noDeckYet: 'Aún no hay mazos. ¡Sube un archivo .apkg para empezar!',
    cards: 'tarjetas',
    lastPracticed: 'Última práctica',
    deckLimitReached: 'Límite del plan gratuito (3 mazos). Mejora a Pro para mazos ilimitados.',
    shareDeck: 'Compartir mazo',
    shareTypetris: 'Compartir Word Rain',
    shareWordTrain: 'Compartir Word Train',
    linkCopied: '¡Enlace copiado!',

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
    nextCard: 'Siguiente',
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
    shareResult: 'Compartir resultado',
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


    ttsLabel: 'Pronunciación de palabras',
    confettiLabel: 'Efectos de confeti',

    soundEffectsDesc: 'Reproduce sonidos de teclas al escribir',


    ttsDesc: 'Lee la palabra en voz alta al completarla',
    confettiDesc: 'Muestra animación de confeti en respuesta correcta',

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
    difficultFirstDesc: 'Muestra primero las tarjetas que más has fallado.',
    smartReviewDesc: 'Prioriza las tarjetas pendientes según repetición espaciada. Las nuevas se intercalan.',
    learning: 'Aprendiendo',
    familiar: 'Familiar',
    mastered: 'Dominado',
    masteryProgress: 'Progreso de dominio',
    dueForReview: 'Pendiente de revisión',
    dueToday: 'pendiente',
    cardsToReview: 'Tarjetas para repasar',
    commonMistakes: 'Errores frecuentes',
    vsLastSession: 'vs Anterior',
    showDetails: 'Tu entrada',
    hideDetails: 'Ocultar',

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

    createDeck: '+ Crear',
    createDeckTitle: 'Crear Nuevo Mazo',
    createDeckSubtitle: 'Desde texto, archivos multimedia o introduce tarjetas manualmente',
    deckNameLabel: 'Nombre del Mazo',
    deckNamePlaceholder: 'ej. Vocabulario básico',
    deckNameRequired: 'Por favor introduce un nombre para el mazo.',
    cardsRequired: 'Por favor añade al menos una tarjeta.',
    cardSaveError: 'Error al guardar las tarjetas. Inténtalo de nuevo.',
    columnFront: 'Palabra (Frente)',
    columnBack: 'Significado (Reverso)',
    columnPronunciation: 'Pronunciación',
    columnStatus: 'Estado',
    fillInBlankSection: 'Completar espacios',
    addRow: '+ Añadir fila',
    addTenRows: '+ Añadir 10 filas',
    maxLabel: '(máx)',
    savingLabel: 'Guardando...',

    landingBadge: 'IA incluida · Gratis para empezar',
    landingHero1: 'Aprende con tus canciones',
    landingHero2: 'y películas favoritas.',
    landingSubtext: 'Pega letras, sube archivos de subtítulos o cualquier texto. La IA crea tarjetas de vocabulario — practica con escritura, juegos de palabras o completa los espacios.',
    startForFree: 'Empezar gratis',
    tryWithoutDeck: 'Probar sin mazo',
    landingKpopCta: 'Pega la letra de tu canción K-pop favorita para empezar',
    seeHowItWorks: 'Cómo funciona',
    howItWorksLabel: 'CÓMO FUNCIONA',
    howItWorksTitle: 'Tres pasos. Sin fricción.',
    step01Title: 'Crea desde cualquier contenido',
    step01Desc: 'Pega letras de canciones, sube subtítulos (.srt) o importa un mazo Anki. La IA extrae vocabulario y tarjetas automáticamente.',
    step02Title: 'Practica a tu manera',
    step02Desc: 'Escritura clásica, juegos de palabras (atrapa palabras que caen) o completa los espacios. Todos los modos registran tu WPM y precisión.',
    step03Title: 'Observa tu progreso',
    step03Desc: 'Rastrea WPM, precisión y dominio de cada tarjeta. Las más difíciles aparecen automáticamente con más frecuencia.',
    featuresLabel: 'CARACTERÍSTICAS',
    featuresTitle: 'Construido para el aprendizaje real.',
    feature1Title: 'Generación de tarjetas con IA',
    feature1Desc: 'Pega cualquier texto — letras, subtítulos, artículos. GPT-4o-mini extrae vocabulario y crea ejercicios de completar espacios. Sin trabajo manual.',
    feature2Title: '10 hermosos temas',
    feature2Desc: 'Oscuro, Claro, Dracula, Nord, Tokyo Night y más. Cambia al instante. Tu preferencia se guarda localmente.',
    feature3Title: '3 Modos de Juego',
    feature3Desc: 'Escritura clásica, juegos de palabras (palabras caen del cielo — escríbelas para destruirlas) y completa los espacios. Diferentes modos para no aburrirse.',
    feature4Title: 'Cualquier idioma, cualquier contenido',
    feature4Desc: 'Japonés, coreano, español, francés y más. Compatible con letras, subtítulos de películas (.srt) y mazos Anki.',
    getStartedLabel: 'COMENZAR',
    getStartedTitle: 'Empieza a aprender en segundos.',
    getStartedDesc: 'Pega letras, subtítulos o cualquier texto. La IA crea las tarjetas al instante.',

    whatIsTitle: '¿Qué es typee?',
    whatIsDesc: 'typee es una herramienta de aprendizaje de idiomas con IA. Pega letras de canciones o sube subtítulos — la IA extrae vocabulario y crea tarjetas de práctica. Luego elige tu juego: escritura clásica, juegos de palabras (palabras que caen del cielo) o completar espacios en blanco.',
    whatIsDetail1: 'Importa mazos Anki, pega letras o subtítulos de películas (.srt). La IA extrae vocabulario y genera tarjetas automáticamente.',
    whatIsDetail2: 'La escritura clásica construye memoria muscular. Los juegos de palabras entrenan velocidad. Completar espacios mejora la comprensión. Todos los modos usan el mismo mazo.',
    whatIsDetail3: 'Disponible en 6 idiomas de interfaz con más de 10 temas. Plan gratuito: 3 mazos, hasta 200 tarjetas cada uno. Pro desbloquea mazos ilimitados por $5/mes.',
    homeFaqTitle: 'Preguntas frecuentes',
    homeFaq1Q: '¿Qué es typee y cómo funciona?',
    homeFaq1A: 'typee es una app de aprendizaje de idiomas con IA. Pega letras o subtítulos (.srt) — la IA (GPT-4o-mini) crea tarjetas de vocabulario automáticamente. Practica con tres modos: escritura clásica, juegos de palabras o completar espacios. Cada sesión registra tu WPM, precisión y dominio.',
    homeFaq2Q: '¿Es typee gratis?',
    homeFaq2A: 'Sí. El plan gratuito incluye 3 mazos (hasta 200 tarjetas cada uno), todos los modos de práctica, todos los temas y estadísticas básicas. El plan Pro ($5/mes o $48/año) desbloquea mazos ilimitados.',
    homeFaq3Q: '¿Qué contenido puedo usar para crear tarjetas?',
    homeFaq3A: 'Puedes pegar letras de canciones, subir subtítulos (.srt), pegar texto o importar un mazo Anki (.apkg). La IA procesa el contenido y extrae tarjetas de vocabulario automáticamente.',
    homeFaq4Q: '¿Necesito un mazo Anki para usar typee?',
    homeFaq4A: 'No. Puedes crear mazos directamente desde cualquier contenido de texto con IA — pega letras o subtítulos y las tarjetas se generan automáticamente. La importación de Anki (.apkg) también está disponible.',
    homeFaq5Q: '¿Qué modos de juego hay disponibles?',
    homeFaq5A: 'typee ofrece tres modos: Escritura clásica (ve el frente, escribe la respuesta), juegos de palabras (las palabras caen desde arriba — escríbelas antes de que lleguen abajo) y Completar espacios (completa la palabra que falta). Todos registran WPM y precisión.',

    tryDemo: 'Probar sin mazo',
    demoSubtitle: 'Sin cuenta necesaria. Elige un mazo y empieza a escribir.',
    demoModeHintMeaning: 'Ve la palabra → escribe el significado en inglés',
    demoModeHintWord: 'Ve la palabra + pista en inglés → escribe la palabra',
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
    resultsUpgradePrompt: '¡Gran puntuación! Sigue tu progreso con Pro.',
    resultsUpgradeCta: 'Ver funciones Pro →',
    aiQuotaWarning: 'Última solicitud de IA por hoy.',
    aiQuotaUpgrade: '¿Necesitas más? Actualiza a Pro para 50/día →',
    proGateUnlock: 'Desbloquear con Pro',
    proGatePreview: 'Vista previa — actualiza para ver todos los datos',
    streakMilestone: '¡Increíble racha de {n} días! ¡Sigue así!',
    retentionStreakMilestone: '¡{n} días seguidos! ¡Estás en racha!',
    retentionPracticeToday: '¿Listo para practicar hoy? ¡Mantén tu racha!',
    retentionWelcomeBack: '¡Bienvenido de vuelta! Continuemos donde lo dejaste.',
    retentionDueCards: '{n} tarjetas para repasar. ¿Práctica rápida?',
    retentionStartBtn: 'Iniciar práctica',
    retentionDismiss: 'Cerrar',
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
    footerAbout: 'Acerca de',
    footerContact: 'Contacto',
    footerTerms: 'Términos de servicio',
    footerPrivacy: 'Política de privacidad',
    footerChangelog: 'Historial de cambios',
    changelogTitle: 'Historial de cambios',
    changelogIntro: 'Descubre las novedades de typee.',
    comingSoon: 'Próximamente.',

    aboutTitle: 'Acerca de typee',
    aboutMission: 'Nuestra misión',
    aboutMissionDesc: 'typee existe para hacer el aprendizaje de idiomas más inmersivo y efectivo. Transformando el contenido que amas — letras de canciones, subtítulos de películas, artículos — en práctica activa de escritura, ayudamos a construir memoria muscular y retener vocabulario durante más tiempo.',
    aboutStory: 'La historia',
    aboutStoryP1: 'typee nació de una idea simple: la mejor manera de aprender un idioma es con contenido que realmente amas. Canciones que pones en repeat, series que maratoneas, letras que no salen de tu cabeza — ahí vive el vocabulario real.',
    aboutStoryP2: 'Pero escuchar pasivamente no es suficiente. ¿Y si tuvieras que escribir cada palabra? Escribir fuerza el recuerdo activo — no puedes hacer trampa. Ya sea rellenando espacios de letras de K-pop o un juego de palabras con vocabulario de anime, cada tecla construye memoria real.',
    aboutStoryP3: 'typee se lanzó en 2026 como herramienta web gratuita. Pega letras de canciones o sube un archivo SRT — la IA extrae vocabulario y genera tarjetas en segundos. Practica con escritura, Rellena espacios o Word Rain. Sin descargas ni configuración complicada.',
    aboutWhyTitle: '¿Por qué escribir?',
    aboutWhy1: 'Recuerdo activo — producir la respuesta fortalece la memoria más que el reconocimiento.',
    aboutWhy2: 'El contexto importa — aprender palabras en frases que has escuchado (de canciones o series) las fija de una manera que el estudio aislado no puede.',
    aboutWhy3: 'Retroalimentación honesta — o lo escribes correctamente o no. Sin cuestionarte si realmente lo sabías.',
    aboutWhy4: 'Progreso medible — WPM y precisión te dan métricas concretas.',
    aboutTechTitle: 'Tecnología',
    aboutTechDesc: 'typee es una aplicación web Next.js alojada en Vercel. Los mazos se analizan en el navegador — tus archivos .apkg nunca salen de tu dispositivo. Usamos Supabase para autenticación y Stripe para pagos seguros.',

    contactTitle: 'Contáctanos',
    contactIntro: '¿Tienes una pregunta, solicitud de función o encontraste un error? Nos encantaría saber de ti.',
    contactEmailLabel: 'Envíanos un email',
    contactEmailDesc: 'Envíanos un email y te responderemos.',
    contactResponseTime: 'Normalmente respondemos en 24 horas.',
    contactTopics: '¿En qué podemos ayudarte?',
    contactTopic1: 'Reportes de errores y problemas técnicos',
    contactTopic2: 'Solicitudes de funciones y sugerencias',
    contactTopic3: 'Preguntas de facturación y suscripción',
    contactTopic4: 'Preguntas generales y comentarios',

    guideTitle: 'Guía de uso',
    guideIntro: 'typee convierte el contenido que amas en práctica de idiomas. Pega letras de canciones, sube archivos de subtítulos o importa un mazo de Anki — luego practica con escritura, Rellena espacios o Word Rain.',
    guideStep1Title: '1. Crea desde cualquier contenido',
    guideStep1Desc: 'Pega letras de canciones o subtítulos en la pestaña Media o sube un archivo .srt. También puedes importar un archivo Anki .apkg o crear tarjetas manualmente. La IA extrae vocabulario y tarjetas de relleno automáticamente.',
    guideStep2Title: '2. Elige un modo de práctica',
    guideStep2Desc: 'Selecciona tu mazo y elige cómo quieres practicar. Puedes escribir significados, escribir palabras o usar la revisión inteligente para enfocarte en las tarjetas difíciles.',
    guideStep3Title: '3. Escribe tus respuestas',
    guideStep3Desc: 'Ve la pregunta y escribe la respuesta. Obtienes retroalimentación instantánea carácter por carácter. Presiona Enter para enviar o salta las tarjetas que aún no conoces.',
    guideStep4Title: '4. Sigue tu progreso',
    guideStep4Desc: 'Después de cada sesión, ve tu precisión, velocidad (WPM) y cantidad de aciertos. Con el tiempo, rastrea los niveles de dominio de cada tarjeta.',
    guideModesTitle: 'Modos de práctica',
    guideModeFrontToBack: 'Escribir significado — Ve la palabra, escribe la definición/traducción.',
    guideModeBackToFront: 'Escribir palabra — Ve el significado/pista, escribe la palabra original.',
    guideModeSequential: 'Secuencial — Practica las tarjetas en orden.',
    guideModeRandom: 'Aleatorio — Mezcla las tarjetas en cada sesión.',
    guideModeDifficult: 'Difíciles primero — Las tarjetas que más fallas aparecen primero.',
    guideTipsTitle: 'Consejos para practicar mejor',
    guideTip1: 'Practica diariamente — incluso 5 minutos al día construyen un recuerdo sólido.',
    guideTip2: 'Usa el modo "Difíciles primero" para enfocarte en tus tarjetas más débiles.',
    guideTip3: 'Prueba ambos modos "Escribir significado" y "Escribir palabra" para un aprendizaje más profundo.',
    guideTip4: 'Revisa tu página de estadísticas regularmente para ver qué tarjetas necesitan más atención.',
    guideFormatsTitle: 'Entradas compatibles',
    guideFormatsDesc: 'typee acepta archivos .srt de subtítulos, .txt de letras y mazos Anki .apkg. También puedes pegar texto directamente o crear tarjetas manualmente. Se admiten cargas de CSV/TSV con detección automática de campos.',
    guideFaqTitle: 'Preguntas frecuentes',
    guideFaq1Q: '¿Es typee gratis?',
    guideFaq1A: '¡Sí! El plan gratuito incluye 3 mazos con hasta 200 tarjetas cada uno, todos los modos de práctica y estadísticas básicas. Actualiza a Pro para mazos ilimitados.',
    guideFaq2Q: '¿Qué idiomas son compatibles?',
    guideFaq2A: 'Cualquier idioma que funcione en Anki funciona en typee — japonés, coreano, chino, español, francés, alemán y más.',
    guideFaq3Q: '¿Puedo usar typee sin cuenta?',
    guideFaq3A: 'Sí. Puedes probar la demo o subir un mazo como invitado. Crea una cuenta gratuita para guardar tus mazos y seguir tu progreso.',
    guideFaq4Q: '¿Cómo funciona la revisión inteligente?',
    guideFaq4A: 'La revisión inteligente usa una puntuación de confianza que se actualiza según tu precisión. Las tarjetas que fallas frecuentemente aparecen más a menudo.',

    termsTitle: 'Términos de servicio',
    termsLastUpdated: 'Última actualización: marzo 2026',
    termsIntro: 'Bienvenido a typee. Al acceder o usar nuestro servicio, aceptas estos términos. Por favor, léelos con atención.',
    termsSection1Title: '1. Aceptación de los términos',
    termsSection1Desc: 'Al usar typee ("el Servicio"), aceptas quedar vinculado por estos Términos de servicio. Si no estás de acuerdo, no uses el Servicio.',
    termsSection2Title: '2. Descripción del servicio',
    termsSection2Desc: 'typee es una aplicación web de aprendizaje de idiomas. Proporcionamos herramientas para crear mazos de vocabulario desde canciones, subtítulos y texto, con modos de práctica: escritura, Rellena espacios y Juego de palabras. También se admite la importación de mazos de Anki.',
    termsSection3Title: '3. Cuentas de usuario',
    termsSection3Desc: 'Algunas funciones se pueden usar sin cuenta. Para guardar mazos y seguir el progreso, necesitas crear una cuenta mediante Google OAuth o correo electrónico.',
    termsSection4Title: '4. Contenido del usuario',
    termsSection4Desc: 'Conservas la propiedad del contenido que subes. Al subir contenido, nos otorgas una licencia limitada para almacenarlo y procesarlo con el fin de proporcionar el Servicio.',
    termsSection5Title: '5. Uso aceptable',
    termsSection5Desc: 'Aceptas no hacer un uso indebido del Servicio. Esto incluye: subir contenido dañino o ilegal, intentar interrumpir el Servicio, ingeniería inversa o scraping automatizado.',
    termsSection6Title: '6. Pagos y suscripciones',
    termsSection6Desc: 'El plan Pro se factura a través de Stripe. Puedes cancelar en cualquier momento. Los reembolsos se manejan caso por caso.',
    termsSection7Title: '7. Limitación de responsabilidad',
    termsSection7Desc: 'typee se proporciona "tal cual" sin garantías. No somos responsables de la pérdida de datos, interrupciones o daños derivados del uso del Servicio.',
    termsSection8Title: '8. Cambios en los términos',
    termsSection8Desc: 'Podemos actualizar estos términos periódicamente. El uso continuado del Servicio después de los cambios constituye aceptación.',

    privacyTitle: 'Política de privacidad',
    privacyLastUpdated: 'Última actualización: marzo 2026',
    privacyIntro: 'Tu privacidad nos importa. Esta política explica qué datos recopilamos, cómo los usamos y tus derechos sobre tu información.',
    privacySection1Title: '1. Información que recopilamos',
    privacySection1Desc: 'Información de cuenta (email, nombre) mediante Google OAuth o registro por correo. Mazos y tarjetas creados desde tu contenido, más datos de práctica (precisión, WPM, historial). Análisis básico de uso. La información de pago es procesada por Stripe.',
    privacySection2Title: '2. Cómo usamos tus datos',
    privacySection2Desc: 'Para proporcionar y mejorar el Servicio. Para guardar tus mazos, seguir el progreso y sincronizar entre dispositivos. No vendemos tus datos personales a terceros.',
    privacySection3Title: '3. Almacenamiento de datos',
    privacySection3Desc: 'Tus datos se almacenan de forma segura usando Supabase (alojado en AWS). Los datos de invitados se almacenan solo localmente en tu navegador.',
    privacySection4Title: '4. Cookies y almacenamiento local',
    privacySection4Desc: 'Usamos almacenamiento local para guardar tus preferencias. Los tokens de autenticación se almacenan de forma segura. No usamos cookies de rastreo de terceros.',
    privacySection5Title: '5. Servicios de terceros',
    privacySection5Desc: 'Google OAuth para autenticación. Stripe para procesamiento de pagos. Supabase para base de datos y autenticación.',
    privacySection6Title: '6. Tus derechos',
    privacySection6Desc: 'Puedes eliminar tu cuenta y todos los datos asociados en cualquier momento. Puedes exportar tus datos descargando tus mazos. Contáctanos para cualquier solicitud relacionada con datos.',
    privacySection7Title: '7. Contacto',
    privacySection7Desc: 'Si tienes preguntas sobre esta Política de privacidad, contáctanos a través de nuestra página de Contacto.',

    // Blog
    blogTitle: 'Blog',
    blogDescription: 'Explora la ciencia y las estrategias del aprendizaje de idiomas basado en la escritura.',
    blogReadMore: 'Leer más',
    blogMinRead: 'min',
    blogNoPosts: 'Aún no hay publicaciones. ¡Vuelve pronto!',
    blogBackToList: 'Volver al Blog',
    blogToc: 'Tabla de Contenidos',
    blogRelated: 'Artículos Relacionados',
    footerBlog: 'Blog',

    mediaTab: 'Medios',
    uploadMediaFile: 'Suelta aquí un archivo SRT o de letras',
    pasteSubtitles: 'Pega subtítulos, letras o texto aquí...',
    generateWithAI: 'Generar con IA',
    generating: 'Generando tarjetas con IA...',
    vocabularyCards: 'Vocabulario',
    clozeCards: 'Rellena espacios',
    bothCardTypes: 'Ambos',
    supportedFormats: 'Compatible con .srt, .txt, .lrc (máx. 2MB)',
    mediaNoContent: 'No se encontró contenido en el archivo',
    mediaPreview: 'Vista previa',
    generateMode: 'Tipo de tarjeta',
    lineCount: 'líneas',
    sourceLangLabel: 'Idioma origen',
    targetLangLabel: 'Idioma destino',
    sourceLangTooltip: 'El idioma de tu contenido (p. ej. el idioma de la canción o subtítulo)',
    targetLangTooltip: 'El idioma que quieres aprender / al que traducir',

    acidRain: 'Word Rain',
    fillBlank: 'Rellena espacios',
    classicTyping: 'Escritura Clásica',

    score: 'Puntos',
    combo: 'Combo',
    level: 'Nivel',
    gameOver: 'Fin del Juego',
    finalScore: 'Puntuación Final',
    playAgain: 'Jugar de nuevo',
    acidRainDesc: '¡Las palabras caen desde arriba — escríbelas para destruirlas!',
    fillBlankDesc: 'Rellena el espacio con la palabra correcta',
    backToFrontDesc: 'Ve la palabra → escríbela',
    wordTrain: 'Word Train',
    wordTrainDesc: '¡Ve el significado y escribe la palabra antes de que pase el tren!',
    wordTrainTimerDesc: '¡Haz combos para tiempo extra!',
    timeUp: '¡Se acabó el tiempo!',
    wordsCompleted: 'Palabras',
    pronunciation: 'Pronunciación',
    targetWord: 'Palabra objetivo',

    showHint: 'Ver pista de significado',
    hintTimerLabel: 'Pista de letra',
    fillInMissing: 'Escribe la palabra que falta',

    // Onboarding
    onboardingWelcomeTitle: 'Bienvenido a typee!',
    onboardingWelcomeDesc: 'Aprende idiomas escribiendo lo que te gusta. Pega letras, subtítulos o texto — la IA crea tarjetas de práctica al instante.',
    onboardingCreateTitle: 'Crea tu primer mazo',
    onboardingCreateDesc: 'Pega letras, sube subtítulos (.srt), importa un mazo Anki o crea tarjetas manualmente.',
    onboardingStartTitle: 'Empieza a aprender!',
    onboardingStartDesc: 'Crea un mazo para comenzar o prueba la demo primero.',
    onboardingNext: 'Siguiente',
    onboardingSkip: 'Saltar',
    onboardingDone: 'Vamos!',

    // Community Gallery
    explore: 'Explorar',
    exploreTitle: 'Mazos de la comunidad',
    exploreSubtitle: 'Descubre y clona mazos compartidos por la comunidad',
    searchDecks: 'Buscar mazos...',
    filterByLanguage: 'Filtrar por idioma',
    allLanguages: 'Todos los idiomas',
    sortRecent: 'Reciente',
    sortPopular: 'Popular',
    sortMostCloned: 'Más clonados',
    publishDeck: 'Publicar',
    unpublishDeck: 'Despublicar',
    likeDeck: 'Me gusta',
    cloneDeck: 'Clonar',
    cloneSuccess: '¡Clonado!',
    cloneError: 'Error al clonar. Inténtalo de nuevo.',
    cloneDeckLimit: 'Límite de mazos alcanzado. Actualiza a Pro para mazos ilimitados.',
    publishedBy: 'por',
    displayName: 'Nombre visible',
    displayNamePlaceholder: 'Ingresa tu nombre público...',
    setDisplayName: 'Establece tu nombre visible para publicar',
    noPublicDecks: 'Aún no hay mazos públicos. ¡Sé el primero en compartir!',
    cardPreviewCount: 'Mostrando {n} tarjetas',
    anonymous: 'Anónimo',
    signInToClone: 'Inicia sesión para dar me gusta y clonar mazos',

    aiTopicLabel: 'Tema',
    aiTopicPlaceholder: 'Ej: Vocabulario K-POP, Frases de viaje, Comida y cocina...',
    aiTopicRequired: 'Por favor ingresa un tema',
    aiTargetLang: 'Idioma',
    aiLevel: 'Nivel',
    aiBeginner: 'Principiante',
    aiIntermediate: 'Intermedio',
    aiAdvanced: 'Avanzado',
    aiCardCount: 'Tarjetas',
    aiGenerate: 'Generar tarjetas',
    aiGenerating: 'Generando...',
    aiPreview: 'Vista previa',
    aiQuotaRemaining: 'Usos de IA restantes',
    aiQuotaExceeded: 'Límite diario de IA alcanzado. Actualiza a Pro para más.',

    leaderboardTitle: 'Clasificación',
    leaderboardSubtitle: 'Mejores puntuaciones de la comunidad',
    leaderboardDaily: 'Hoy',
    leaderboardWeekly: 'Esta semana',
    leaderboardAllTime: 'Todo el tiempo',
    leaderboardPlayer: 'Jugador',
    leaderboardScore: 'Puntuación',
    leaderboardEmpty: 'Aún no hay puntuaciones. ¡Sé el primero!',

    // Goals
    goalSettings: 'Metas de práctica',
    goalSettingsDesc: 'Agregar nueva meta',
    dailyGoal: 'Diaria',
    weeklyGoal: 'Semanal',
    sessionsGoal: 'Sesiones',
    minutesGoal: 'Minutos',
    cardsGoal: 'Tarjetas',
    goalProgress: 'Progreso de metas',
    goalComplete: '¡Meta alcanzada!',
    goalCelebrationMsg: '¡Meta lograda! ¡Sigue así!',
    setGoal: 'Establecer meta',
    removeGoal: 'Eliminar',
    noGoalsYet: 'Aún no hay metas',

    // AI Coaching
    getAiTips: '✨ Obtener consejos de IA',
    aiCoachingTitle: 'Entrenamiento IA',
    aiCoachingLoading: 'Analizando tu sesión...',
    aiCoachingError: 'Error al obtener consejos. Inténtalo de nuevo.',
    aiTipsRemaining: '{n} usos de IA restantes hoy',
    retryBtn: 'Reintentar',

    // SRS Difficulty Rating
    rateAgain: 'Otra vez',
    rateHard: 'Difícil',
    rateGood: 'Bien',
    rateEasy: 'Fácil',
    rateHint: '¿Qué tan bien lo recordaste?',
    reviewSummary: '{cards} tarjetas pendientes en {decks} mazos',
    reviewNow: 'Repasar ahora',

    // XP & Level
    xpGained: '+{xp} XP',
    levelLabel: 'Nivel {level}',
    levelUp: '¡Subiste de nivel!',
    xpToNext: '{xp} XP para el siguiente nivel',
    xpThisSession: 'XP de esta sesión',

    // Achievements
    achievementsTab: 'Logros',
    achievementUnlocked: '¡Logro desbloqueado!',
    achievementLocked: 'Bloqueado',
    achievStreak3: 'Racha de 3 días',
    achievStreak7: 'Guerrero semanal',
    achievStreak30: 'Maestro mensual',
    achievStreak100: 'Racha de 100 días',
    achievSessions10: 'Primeros pasos',
    achievSessions50: 'Aprendiz dedicado',
    achievSessions100: 'Profesional',
    achievSessions500: 'Máquina de estudio',
    achievMastery10: 'Primera maestría',
    achievMastery50: 'Erudito de tarjetas',
    achievMastery100: 'Experto en maestría',
    achievSpeed40: 'Dedos rápidos',
    achievSpeed60: 'Demonio de velocidad',
    achievSpeed80: 'Mecanógrafo relámpago',
    achievCards100: 'Coleccionista',
    achievCards500: 'Entusiasta de tarjetas',
    achievCards1000: 'Maestro de tarjetas',
    achievVariety3: 'Explorador de modos',
    achievVariety5: 'Todoterreno',
  },

  zh: {
    appName: 'typee',
    subtitle: '上传你的Anki牌组。\n打字练习。\n提升记忆力。',
    description: '将Anki闪卡转换为打字练习。追踪WPM、准确率，更快掌握卡片内容。',
    footer: '打字中学习',

    signIn: '登录',
    signOut: '退出',
    signInWithGoogle: '使用Google继续',
    signInWithTwitter: '使用X继续',
    signInWithEmail: '使用邮箱继续',
    emailPlaceholder: '输入邮箱地址...',

    loginHeroTitle: '用喜欢的音乐和电影学语言',
    loginHeroDesc: '粘贴歌词、上传字幕文件或任意文本。AI即时生成卡片，通过打字、填空和单词游戏练习。',
    loginFeature1: '从歌词和字幕生成AI卡片',
    loginFeature2: '追踪WPM和准确率',
    loginFeature3: '填空和单词游戏模式',
    loginWelcome: '欢迎',
    loginDesc: '登录以保存进度并解锁所有功能。',
    loginOrDivider: '或',
    loginTryDemo: '无需账户即可体验',
    loginReassurance1: '免费包含3个牌组',
    loginReassurance2: '无需信用卡',

    myDecks: '我的牌组',
    uploadDeck: '上传牌组',
    noDeckYet: '还没有牌组。上传.apkg文件开始学习！',
    cards: '张',
    lastPracticed: '最近练习',
    deckLimitReached: '已达免费计划上限（3个牌组）。升级至Pro享无限牌组。',
    shareDeck: '分享牌组',
    shareTypetris: '分享Word Rain',
    shareWordTrain: '分享Word Train',
    linkCopied: '链接已复制！',

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
    nextCard: '下一个',
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
    shareResult: '分享结果',
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


    ttsLabel: '单词发音',
    confettiLabel: '彩纸效果',

    soundEffectsDesc: '打字时播放按键声音',


    ttsDesc: '完成单词后朗读发音',
    confettiDesc: '正确回答时显示彩纸动画',

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
    difficultFirstDesc: '优先显示错误最多的卡片。',
    smartReviewDesc: '基于间隔重复，优先显示到期复习的卡片，新卡穿插其中。',
    learning: '学习中',
    familiar: '熟悉',
    mastered: '已掌握',
    masteryProgress: '掌握进度',
    dueForReview: '待复习',
    dueToday: '待复习',
    cardsToReview: '需要复习的卡片',
    commonMistakes: '常见错误',
    vsLastSession: '与上次对比',
    showDetails: '你的输入',
    hideDetails: '隐藏',

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

    createDeck: '+ 创建',
    createDeckTitle: '创建新牌组',
    createDeckSubtitle: '通过文本、媒体文件或手动输入创建牌组',
    deckNameLabel: '牌组名称',
    deckNamePlaceholder: '例）基础韩语词汇',
    deckNameRequired: '请输入牌组名称。',
    cardsRequired: '请至少添加一张卡片。',
    cardSaveError: '保存卡片时出现错误。',
    columnFront: '单词（正面）',
    columnBack: '含义（背面）',
    columnPronunciation: '发音',
    columnStatus: '状态',
    fillInBlankSection: '填空题',
    addRow: '+ 添加行',
    addTenRows: '+ 添加10行',
    maxLabel: '（上限）',
    savingLabel: '保存中...',

    landingBadge: 'AI驱动 · 免费开始',
    landingHero1: '用喜欢的歌曲和电影',
    landingHero2: '学习语言。',
    landingSubtext: '粘贴歌词、上传字幕文件或任意文本。AI自动生成词汇卡片 — 用打字练习、单词游戏或填空题来学习。',
    startForFree: '免费开始',
    tryWithoutDeck: '无需卡组即可体验',
    landingKpopCta: '粘贴你喜欢的K-POP歌词开始学习',
    seeHowItWorks: '了解如何使用',
    howItWorksLabel: '使用方式',
    howItWorksTitle: '三步搞定。零阻力。',
    step01Title: '从任意内容创建',
    step01Desc: '粘贴歌词、上传字幕(.srt)或导入Anki牌组。AI自动提取词汇和填空卡片。',
    step02Title: '按你的方式练习',
    step02Desc: '选择你的游戏：经典打字、单词游戏（接住下落的单词）或填空题。所有模式均追踪WPM和准确率。',
    step03Title: '见证自己的进步',
    step03Desc: '随时间追踪每张卡片的WPM、准确率和掌握程度。最薄弱的卡片会自动更频繁出现。',
    featuresLabel: '功能特色',
    featuresTitle: '专为真实学习而打造。',
    feature1Title: 'AI卡片生成',
    feature1Desc: '粘贴任意文本——歌词、字幕、文章。GPT-4o-mini提取词汇并创建填空练习。无需手动操作。',
    feature2Title: '10种精美主题',
    feature2Desc: '深色、浅色、Dracula、Nord、Tokyo Night等。即时切换。偏好保存在本地。',
    feature3Title: '3种游戏模式',
    feature3Desc: '经典打字、单词游戏（单词从天而降——输入来消灭）和填空题。多种模式让学习不枯燥。',
    feature4Title: '任何语言，任何内容',
    feature4Desc: '日语、韩语、西班牙语、法语等。支持歌词、电影字幕(.srt)和Anki牌组。能粘贴的都能学。',
    getStartedLabel: '立即开始',
    getStartedTitle: '几秒内开始学习。',
    getStartedDesc: '粘贴歌词、字幕或任意文本，AI即刻创建卡片。',

    whatIsTitle: '什么是typee？',
    whatIsDesc: 'typee是AI驱动的语言学习工具。粘贴歌词或上传字幕——AI提取词汇并创建练习卡片。然后选择你的游戏：经典打字练习、单词游戏（单词从天而降）或填空句子练习。',
    whatIsDetail1: '导入Anki牌组、粘贴歌词或电影字幕(.srt)。AI自动提取词汇并生成卡片——无需手动操作。',
    whatIsDetail2: '经典打字建立肌肉记忆。单词游戏训练速度。填空题提升阅读理解。所有模式使用同一牌组。',
    whatIsDetail3: '支持6种界面语言和10多个主题。免费计划：3个牌组，每组最多200张卡片。Pro计划每月$5，无限牌组。',
    homeFaqTitle: '常见问题',
    homeFaq1Q: 'typee是什么？如何使用？',
    homeFaq1A: 'typee是AI驱动的语言学习应用。粘贴歌词或字幕(.srt)——AI（GPT-4o-mini）自动创建词汇卡片。用三种游戏模式练习：经典打字、单词游戏或填空题。每次练习追踪WPM、准确率和掌握程度。',
    homeFaq2Q: 'typee免费吗？',
    homeFaq2A: '是的。免费计划包括3个牌组（每组最多200张卡片）、所有练习模式、所有主题和基本统计。Pro计划（月$5或年$48）解锁无限牌组。',
    homeFaq3Q: '可以用什么内容创建卡片？',
    homeFaq3A: '可以粘贴歌词、上传字幕(.srt)、粘贴文本或导入Anki牌组(.apkg)。AI处理内容并自动提取词汇卡片和填空句子。',
    homeFaq4Q: '需要Anki牌组才能使用吗？',
    homeFaq4A: '不需要。可以直接从任意文本内容用AI创建牌组——粘贴歌词或字幕即可自动生成卡片。也支持导入Anki牌组(.apkg)。',
    homeFaq5Q: '有哪些游戏模式？',
    homeFaq5A: 'typee提供三种练习模式：经典打字（看正面、输入答案）、单词游戏（单词从顶部下落——输入来消灭）和填空题（完成句子中缺失的单词）。所有模式追踪WPM和准确率。',

    tryDemo: '无需牌组体验',
    demoSubtitle: '无需账户。选择牌组，立即开始打字练习。',
    demoModeHintMeaning: '看到单词 → 输入英语意思',
    demoModeHintWord: '看到单词 + 英语提示 → 输入单词',
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
    resultsUpgradePrompt: '好成绩！用Pro追踪你的学习趋势。',
    resultsUpgradeCta: '查看Pro功能 →',
    aiQuotaWarning: '今天最后一次AI请求。',
    aiQuotaUpgrade: '需要更多？升级Pro每天50次 →',
    proGateUnlock: '升级Pro解锁',
    proGatePreview: '预览 — 升级查看完整数据',
    streakMilestone: '惊人的{n}天连续！继续加油！',
    retentionStreakMilestone: '{n}天连续！你太棒了！',
    retentionPracticeToday: '准备好今天练习了吗？保持你的连续记录！',
    retentionWelcomeBack: '欢迎回来！让我们继续上次的学习吧。',
    retentionDueCards: '{n}张卡片待复习。快速练习一下？',
    retentionStartBtn: '开始练习',
    retentionDismiss: '关闭',
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
    footerAbout: '关于',
    footerContact: '联系我们',
    footerTerms: '服务条款',
    footerPrivacy: '隐私政策',
    footerChangelog: '更新日志',
    changelogTitle: '更新日志',
    changelogIntro: '查看 typee 的最新更新。',
    comingSoon: '即将推出。',

    aboutTitle: '关于 typee',
    aboutMission: '我们的使命',
    aboutMissionDesc: 'typee 旨在让语言学习更具沉浸感和效果。将你喜爱的内容——歌词、电影字幕、文章——转化为主动打字练习，帮助建立肌肉记忆、更久地记住词汇，并精确追踪进度。',
    aboutStory: '故事',
    aboutStoryP1: 'typee 源于一个简单的想法：学语言最好的方式是接触你真正热爱的内容。反复播放的歌曲、追的剧、脑海中萦绕的歌词——真正的词汇就在那里。',
    aboutStoryP2: '但被动收听是不够的。如果你必须打出每一个单词呢？打字迫使主动回忆——你无法作弊。无论是填写K-pop歌词的空白，还是用动漫词汇玩单词游戏，每次按键都在构建真实的记忆。',
    aboutStoryP3: 'typee 于 2026 年作为免费网络工具推出。粘贴歌词或上传 SRT 字幕文件——AI 在几秒内提取词汇并生成打字卡片。可以用打字练习、填空或 Word Rain 三种模式练习。无需下载，无需复杂设置——直接粘贴即可玩。',
    aboutWhyTitle: '为什么是打字？',
    aboutWhy1: '主动回忆——亲自产出答案比仅仅识别能更好地增强记忆。',
    aboutWhy2: '语境很重要——在你真正听过的句子（来自歌曲或剧集）中学习单词，比孤立的学习更能让单词牢记于心。',
    aboutWhy3: '诚实反馈——你要么打对，要么打错。不再猜测自己是否真的知道。',
    aboutWhy4: '可衡量的进步——WPM 和准确率提供"我知道"无法给出的具体指标。',
    aboutTechTitle: '技术栈',
    aboutTechDesc: 'typee 是托管在 Vercel 上的 Next.js 网络应用。牌组完全在浏览器中解析——你的 .apkg 文件不会离开设备。我们使用 Supabase 进行身份验证，Stripe 进行安全支付。',

    contactTitle: '联系我们',
    contactIntro: '有问题、功能请求或发现了bug？我们很乐意收到您的来信。',
    contactEmailLabel: '发送邮件',
    contactEmailDesc: '给我们发邮件，我们会尽快回复。',
    contactResponseTime: '我们通常在24小时内回复。',
    contactTopics: '我们能帮您什么？',
    contactTopic1: 'Bug报告和技术问题',
    contactTopic2: '功能请求和建议',
    contactTopic3: '账单和订阅问题',
    contactTopic4: '一般问题和反馈',

    guideTitle: '使用指南',
    guideIntro: 'typee 将你喜爱的内容转化为语言练习。粘贴歌词、上传字幕文件或导入 Anki 牌组——然后通过打字、填空或 Word Rain 模式练习。',
    guideStep1Title: '1. 从任意内容创建',
    guideStep1Desc: '在 Media 标签中粘贴歌词或字幕、上传 .srt 文件。也可以导入 Anki .apkg 文件或手动创建卡片。AI 会自动提取词汇和填空卡片。',
    guideStep2Title: '2. 选择练习模式',
    guideStep2Desc: '选择牌组并选择练习方式。你可以输入含义、输入单词，或使用智能复习来专注于薄弱卡片。',
    guideStep3Title: '3. 输入你的答案',
    guideStep3Desc: '看到提示后输入答案。你会获得逐字符的即时反馈。按Enter提交，或跳过还不会的卡片。',
    guideStep4Title: '4. 追踪你的进度',
    guideStep4Desc: '每次练习后查看准确率、速度（WPM）和正确数量。随时间推移追踪每张卡片的掌握程度和整体统计。',
    guideModesTitle: '练习模式',
    guideModeFrontToBack: '输入含义 — 看到单词，输入定义/翻译。',
    guideModeBackToFront: '输入单词 — 看到含义/提示，输入原始单词。',
    guideModeSequential: '顺序 — 按顺序练习卡片。',
    guideModeRandom: '随机 — 每次打乱卡片顺序。',
    guideModeDifficult: '困难优先 — 最常出错的卡片优先显示。',
    guideTipsTitle: '高效练习技巧',
    guideTip1: '每天练习——即使每天5分钟也能建立牢固的记忆。',
    guideTip2: '使用"困难优先"模式专注于薄弱卡片。',
    guideTip3: '交替使用"输入含义"和"输入单词"模式以加深学习。',
    guideTip4: '定期查看统计页面，了解哪些卡片需要更多关注。',
    guideFormatsTitle: '支持的输入方式',
    guideFormatsDesc: 'typee 支持 .srt 字幕文件、.txt 歌词和 Anki .apkg 牌组。你也可以直接粘贴文本或手动创建卡片。还支持带有自动字段检测的 CSV/TSV 上传。',
    guideFaqTitle: '常见问题',
    guideFaq1Q: 'typee免费吗？',
    guideFaq1A: '是的！免费计划包括3个牌组（每组最多200张卡片）、所有练习模式和基本统计。升级到Pro可获得无限牌组和高级功能。',
    guideFaq2Q: '支持哪些语言？',
    guideFaq2A: '在Anki中可用的所有语言都可以在typee中使用——日语、韩语、中文、西班牙语、法语、德语等。',
    guideFaq3Q: '可以不注册使用吗？',
    guideFaq3A: '可以。你可以试用演示或作为访客上传牌组。创建免费账户以保存牌组和追踪进度。',
    guideFaq4Q: '智能复习如何工作？',
    guideFaq4A: '智能复习使用基于准确率更新的信心分数。经常出错的卡片会更频繁地出现，已掌握的卡片则较少出现。',

    termsTitle: '服务条款',
    termsLastUpdated: '最后更新：2026年3月',
    termsIntro: '欢迎使用typee。使用我们的服务即表示您同意这些条款。请仔细阅读。',
    termsSection1Title: '1. 接受条款',
    termsSection1Desc: '使用typee（"服务"）即表示您同意受本服务条款的约束。如果您不同意，请不要使用本服务。',
    termsSection2Title: '2. 服务描述',
    termsSection2Desc: 'typee 是一款基于 Web 的语言学习应用程序。提供从歌曲、字幕和文本创建词汇牌组的工具，以及打字、填空和单词游戏等练习模式。也支持导入 Anki 牌组。',
    termsSection3Title: '3. 用户账户',
    termsSection3Desc: '部分功能无需账户即可使用。要保存牌组和追踪进度，需要通过Google OAuth或电子邮件创建账户。您有责任维护账户安全。',
    termsSection4Title: '4. 用户内容',
    termsSection4Desc: '您上传的内容（闪卡牌组、数据）的所有权归您所有。上传内容即表示您授予我们有限许可，用于存储和处理以提供服务。',
    termsSection5Title: '5. 可接受的使用',
    termsSection5Desc: '您同意不滥用本服务。包括：上传有害或非法内容、试图破坏服务、逆向工程或使用自动化工具抓取数据。',
    termsSection6Title: '6. 付款与订阅',
    termsSection6Desc: 'Pro计划通过Stripe计费。您可以随时取消。退款按个案处理。我们保留在合理通知后更改价格的权利。',
    termsSection7Title: '7. 责任限制',
    termsSection7Desc: 'typee按"原样"提供，不附带任何保证。我们不对因使用服务而导致的数据丢失、中断或损害负责。',
    termsSection8Title: '8. 条款变更',
    termsSection8Desc: '我们可能会不时更新这些条款。变更后继续使用服务即表示接受变更。重大变更将通过网站通知用户。',

    privacyTitle: '隐私政策',
    privacyLastUpdated: '最后更新：2026年3月',
    privacyIntro: '您的隐私对我们很重要。本政策说明我们收集哪些数据、如何使用以及您对信息的权利。',
    privacySection1Title: '1. 我们收集的信息',
    privacySection1Desc: '通过 Google OAuth 或邮箱注册的账户信息（邮箱、姓名）。从你的内容创建的牌组和卡片，以及练习数据（准确率、WPM、会话记录）。基本使用分析（页面浏览、功能使用）。支付信息由 Stripe 处理，我们不存储您的卡片信息。',
    privacySection2Title: '2. 我们如何使用您的数据',
    privacySection2Desc: '用于提供和改进服务。用于保存牌组、追踪进度和跨设备同步。用于处理Pro订阅付款。我们不会将您的个人数据出售给第三方。',
    privacySection3Title: '3. 数据存储',
    privacySection3Desc: '您的数据使用Supabase（托管在AWS上）安全存储。闪卡数据和练习记录与您的账户关联。访客数据仅存储在浏览器本地。',
    privacySection4Title: '4. Cookie和本地存储',
    privacySection4Desc: '我们使用本地存储来保存您的偏好设置（主题、语言、字体大小）。认证令牌安全存储。我们不使用第三方跟踪Cookie。',
    privacySection5Title: '5. 第三方服务',
    privacySection5Desc: 'Google OAuth用于身份验证。Stripe用于支付处理。Supabase用于数据库和认证。这些服务有各自的隐私政策。',
    privacySection6Title: '6. 您的权利',
    privacySection6Desc: '您可以随时删除账户及所有相关数据。您可以通过下载牌组来导出数据。您可以选择退出可选分析。如有数据相关请求，请通过联系页面联系我们。',
    privacySection7Title: '7. 联系方式',
    privacySection7Desc: '如果您对本隐私政策有疑问，请通过我们的联系页面联系我们。',

    // Blog
    blogTitle: '博客',
    blogDescription: '探索基于打字的语言学习背后的科学与策略。',
    blogReadMore: '阅读更多',
    blogMinRead: '分钟',
    blogNoPosts: '暂无文章，请稍后再来！',
    blogBackToList: '返回博客',
    blogToc: '目录',
    blogRelated: '相关文章',
    footerBlog: '博客',

    mediaTab: '媒体',
    uploadMediaFile: '将SRT或歌词文件拖放到此处',
    pasteSubtitles: '粘贴字幕、歌词或文本...',
    generateWithAI: 'AI生成',
    generating: 'AI正在生成卡片...',
    vocabularyCards: '词汇',
    clozeCards: '填空',
    bothCardTypes: '两者',
    supportedFormats: '支持.srt、.txt、.lrc文件（最大2MB）',
    mediaNoContent: '文件中未找到内容',
    mediaPreview: '预览',
    generateMode: '卡片类型',
    lineCount: '行',
    sourceLangLabel: '源语言',
    targetLangLabel: '目标语言',
    sourceLangTooltip: '内容所用的语言（例如歌曲或字幕的语言）',
    targetLangTooltip: '你想学习/翻译成的语言',

    acidRain: 'Word Rain',
    fillBlank: '填空',
    classicTyping: '经典打字',

    score: '分数',
    combo: '连击',
    level: '等级',
    gameOver: '游戏结束',
    finalScore: '最终分数',
    playAgain: '再来一次',
    acidRainDesc: '单词从上方落下——打字消灭它们！',
    fillBlankDesc: '用正确的单词填空',
    backToFrontDesc: '看到单词 → 直接输入',
    wordTrain: 'Word Train',
    wordTrainDesc: '看到单词含义，在列车驶过前完成输入！',
    wordTrainTimerDesc: '连击获得额外时间！',
    timeUp: '时间到！',
    wordsCompleted: '完成单词',
    pronunciation: '发音标记',
    targetWord: '目标单词',

    showHint: '查看释义提示',
    hintTimerLabel: '字母提示',
    fillInMissing: '输入缺失的单词',

    // Onboarding
    onboardingWelcomeTitle: '欢迎使用typee！',
    onboardingWelcomeDesc: '通过打字学习语言。粘贴歌词、字幕或文本，AI会立即创建练习卡片。',
    onboardingCreateTitle: '创建你的第一个牌组',
    onboardingCreateDesc: '粘贴歌词、上传字幕(.srt)、导入Anki牌组，或手动创建卡片。',
    onboardingStartTitle: '开始学习吧！',
    onboardingStartDesc: '创建牌组开始学习，或先试试演示。',
    onboardingNext: '下一步',
    onboardingSkip: '跳过',
    onboardingDone: '开始！',

    // Community Gallery
    explore: '探索',
    exploreTitle: '社区牌组',
    exploreSubtitle: '发现并克隆社区分享的牌组',
    searchDecks: '搜索牌组...',
    filterByLanguage: '按语言筛选',
    allLanguages: '所有语言',
    sortRecent: '最新',
    sortPopular: '热门',
    sortMostCloned: '克隆最多',
    publishDeck: '公开',
    unpublishDeck: '取消公开',
    likeDeck: '喜欢',
    cloneDeck: '克隆',
    cloneSuccess: '克隆成功！',
    cloneError: '克隆失败，请重试。',
    cloneDeckLimit: '已达牌组上限。升级到专业版可无限使用。',
    publishedBy: '作者',
    displayName: '显示名称',
    displayNamePlaceholder: '输入您的公开名称...',
    setDisplayName: '请设置显示名称以公开牌组',
    noPublicDecks: '暂无公开牌组，成为第一个分享者！',
    cardPreviewCount: '显示 {n} 张卡片',
    anonymous: '匿名',
    signInToClone: '登录后可点赞和克隆牌组',

    aiTopicLabel: '主题',
    aiTopicPlaceholder: '例如：K-POP词汇、旅行短语、美食与烹饪...',
    aiTopicRequired: '请输入主题',
    aiTargetLang: '语言',
    aiLevel: '级别',
    aiBeginner: '初级',
    aiIntermediate: '中级',
    aiAdvanced: '高级',
    aiCardCount: '卡片数',
    aiGenerate: '生成卡片',
    aiGenerating: '生成中...',
    aiPreview: '预览',
    aiQuotaRemaining: 'AI剩余次数',
    aiQuotaExceeded: '已达每日AI上限。升级到Pro获取更多次数。',

    leaderboardTitle: '排行榜',
    leaderboardSubtitle: '社区最高分',
    leaderboardDaily: '今天',
    leaderboardWeekly: '本周',
    leaderboardAllTime: '全部',
    leaderboardPlayer: '玩家',
    leaderboardScore: '分数',
    leaderboardEmpty: '暂无分数。成为第一个！',

    // Goals
    goalSettings: '练习目标',
    goalSettingsDesc: '添加新目标',
    dailyGoal: '每日',
    weeklyGoal: '每周',
    sessionsGoal: '次练习',
    minutesGoal: '分钟',
    cardsGoal: '张卡片',
    goalProgress: '目标进度',
    goalComplete: '目标完成！',
    goalCelebrationMsg: '目标达成！继续加油！',
    setGoal: '设置目标',
    removeGoal: '删除',
    noGoalsYet: '还没有设置目标',

    // AI Coaching
    getAiTips: '✨ 获取AI建议',
    aiCoachingTitle: 'AI教练',
    aiCoachingLoading: '正在分析您的练习...',
    aiCoachingError: '获取建议失败，请重试。',
    aiTipsRemaining: '今日剩余AI使用次数：{n}次',
    retryBtn: '重试',

    // SRS Difficulty Rating
    rateAgain: '再来',
    rateHard: '困难',
    rateGood: '良好',
    rateEasy: '简单',
    rateHint: '你记得多好？',
    reviewSummary: '{decks}个牌组中有{cards}张待复习',
    reviewNow: '立即复习',

    // XP & Level
    xpGained: '+{xp} XP',
    levelLabel: '等级 {level}',
    levelUp: '升级了！',
    xpToNext: '距下一级还需 {xp} XP',
    xpThisSession: '本次练习XP',

    // Achievements
    achievementsTab: '成就',
    achievementUnlocked: '成就解锁！',
    achievementLocked: '未解锁',
    achievStreak3: '3天连续',
    achievStreak7: '周冠军',
    achievStreak30: '月度大师',
    achievStreak100: '百日连续',
    achievSessions10: '初出茅庐',
    achievSessions50: '勤奋学习者',
    achievSessions100: '练习达人',
    achievSessions500: '学习机器',
    achievMastery10: '初次掌握',
    achievMastery50: '卡片学者',
    achievMastery100: '掌握专家',
    achievSpeed40: '快手',
    achievSpeed60: '速度恶魔',
    achievSpeed80: '闪电打字员',
    achievCards100: '卡片收藏家',
    achievCards500: '卡片爱好者',
    achievCards1000: '卡片大师',
    achievVariety3: '模式探索者',
    achievVariety5: '全能选手',
  },

  fr: {
    appName: 'typee',
    subtitle: 'Importez votre deck Anki.\nPratiquez la frappe.\nAméliorez votre mémoire.',
    description: 'Transformez vos cartes Anki en exercices de frappe. Suivez votre WPM, précision et maîtrisez vos cartes plus vite.',
    footer: 'Apprendre en tapant',

    signIn: 'Se connecter',
    signOut: 'Se déconnecter',
    signInWithGoogle: 'Continuer avec Google',
    signInWithTwitter: 'Continuer avec X',
    signInWithEmail: 'Continuer avec Email',
    emailPlaceholder: 'Entrez votre email...',

    loginHeroTitle: 'Apprenez les langues avec la musique et les films',
    loginHeroDesc: 'Collez des paroles, déposez des fichiers de sous-titres ou tout texte. L\'IA crée des cartes instantanément pour pratiquer avec frappe, texte à trous et jeux.',
    loginFeature1: 'Cartes IA depuis paroles et sous-titres',
    loginFeature2: 'Suivi WPM et précision',
    loginFeature3: 'Modes texte à trous et jeu de mots',
    loginWelcome: 'Bienvenue',
    loginDesc: 'Connectez-vous pour sauvegarder vos progrès et débloquer toutes les fonctionnalités.',
    loginOrDivider: 'ou',
    loginTryDemo: 'Essayer sans compte',
    loginReassurance1: '3 decks gratuits inclus',
    loginReassurance2: 'Aucune carte de crédit requise',

    myDecks: 'Mes Decks',
    uploadDeck: 'Importer un Deck',
    noDeckYet: 'Aucun deck pour l\'instant. Importez un fichier .apkg pour commencer !',
    cards: 'cartes',
    lastPracticed: 'Dernière pratique',
    deckLimitReached: 'Limite du plan gratuit atteinte (3 decks). Passez à Pro pour des decks illimités.',
    shareDeck: 'Partager le deck',
    shareTypetris: 'Partager Word Rain',
    shareWordTrain: 'Partager Word Train',
    linkCopied: 'Lien copié !',

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
    nextCard: 'Suivant',
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
    shareResult: 'Partager le résultat',
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


    ttsLabel: 'Prononciation des mots',
    confettiLabel: 'Effets de confettis',

    soundEffectsDesc: 'Joue des sons de touches en tapant',


    ttsDesc: 'Lit le mot à voix haute après l\'avoir complété',
    confettiDesc: 'Affiche une animation de confettis pour les bonnes réponses',

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
    difficultFirstDesc: 'Affiche en premier les cartes les plus souvent ratées.',
    smartReviewDesc: 'Priorise les cartes à réviser selon la répétition espacée. Les nouvelles cartes sont intercalées.',
    learning: 'En apprentissage',
    familiar: 'Familier',
    mastered: 'Maîtrisé',
    masteryProgress: 'Progression de maîtrise',
    dueForReview: 'À réviser',
    dueToday: 'à réviser',
    cardsToReview: 'Cartes à revoir',
    commonMistakes: 'Erreurs fréquentes',
    vsLastSession: 'vs Précédent',
    showDetails: 'Votre saisie',
    hideDetails: 'Masquer',

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

    createDeck: '+ Créer',
    createDeckTitle: 'Créer un Nouveau Deck',
    createDeckSubtitle: 'Depuis du texte, des fichiers multimédias ou saisie manuelle',
    deckNameLabel: 'Nom du Deck',
    deckNamePlaceholder: 'ex. Vocabulaire coréen de base',
    deckNameRequired: 'Veuillez entrer un nom pour le deck.',
    cardsRequired: 'Veuillez ajouter au moins une carte.',
    cardSaveError: 'Erreur lors de la sauvegarde des cartes.',
    columnFront: 'Mot (Recto)',
    columnBack: 'Signification (Verso)',
    columnPronunciation: 'Prononciation',
    columnStatus: 'Statut',
    fillInBlankSection: 'Texte à trous',
    addRow: '+ Ajouter une ligne',
    addTenRows: '+ Ajouter 10 lignes',
    maxLabel: '(max)',
    savingLabel: 'Sauvegarde...',

    landingBadge: 'IA incluse · Gratuit pour commencer',
    landingHero1: 'Apprenez avec vos chansons',
    landingHero2: 'et films préférés.',
    landingSubtext: 'Collez des paroles, déposez un fichier de sous-titres ou tout texte. L\'IA crée des cartes de vocabulaire — puis pratiquez avec la frappe, les jeux de mots ou des exercices à trous.',
    startForFree: 'Commencer gratuitement',
    tryWithoutDeck: 'Essayer sans paquet',
    landingKpopCta: 'Collez les paroles de votre chanson K-pop préférée pour commencer',
    seeHowItWorks: 'Voir comment ça marche',
    howItWorksLabel: 'COMMENT ÇA MARCHE',
    howItWorksTitle: 'Trois étapes. Zéro friction.',
    step01Title: 'Créez depuis n\'importe quel contenu',
    step01Desc: 'Collez des paroles, déposez un fichier de sous-titres (.srt) ou importez un deck Anki. L\'IA extrait le vocabulaire et crée des cartes automatiquement.',
    step02Title: 'Pratiquez à votre façon',
    step02Desc: 'Choisissez votre jeu : frappe classique, jeux de mots (attrapez les mots qui tombent) ou exercices à trous. Chaque mode suit votre WPM et précision.',
    step03Title: 'Observez vos progrès',
    step03Desc: 'Suivez WPM, précision et niveau de maîtrise pour chaque carte dans le temps. Vos cartes les plus difficiles reviennent plus souvent automatiquement.',
    featuresLabel: 'FONCTIONNALITÉS',
    featuresTitle: 'Conçu pour le vrai apprentissage.',
    feature1Title: 'Génération de cartes par IA',
    feature1Desc: 'Collez n\'importe quel texte — paroles, sous-titres, articles. GPT-4o-mini extrait le vocabulaire et crée des exercices à trous. Aucun travail manuel.',
    feature2Title: '10 beaux thèmes',
    feature2Desc: 'Sombre, Clair, Dracula, Nord, Tokyo Night et plus. Changez instantanément. Préférences sauvegardées localement.',
    feature3Title: '3 modes de jeu',
    feature3Desc: 'Frappe classique, jeux de mots (les mots tombent du ciel — tapez pour les détruire) et exercices à trous. Des modes variés pour rendre l\'étude engageante.',
    feature4Title: 'Toute langue, tout contenu',
    feature4Desc: 'Japonais, coréen, espagnol, français et plus. Fonctionne avec paroles, sous-titres (.srt) et decks Anki. Si vous pouvez le coller, vous pouvez l\'étudier.',
    getStartedLabel: 'COMMENCER',
    getStartedTitle: 'Commencez à apprendre en quelques secondes.',
    getStartedDesc: 'Collez des paroles, des sous-titres ou n\'importe quel texte. L\'IA crée les cartes instantanément.',

    whatIsTitle: "Qu'est-ce que typee ?",
    whatIsDesc: "typee est un outil d'apprentissage des langues propulsé par l'IA. Collez des paroles ou déposez des sous-titres — l'IA extrait le vocabulaire et crée des cartes. Choisissez ensuite votre jeu : frappe classique, jeux de mots (les mots tombent du ciel) ou exercices à trous. Vous construisez une vraie mémoire par le rappel actif, pas la révision passive.",
    whatIsDetail1: "Importez des decks Anki, collez des paroles ou des sous-titres (.srt). L'IA extrait automatiquement le vocabulaire et génère des cartes à trous — aucun travail manuel requis.",
    whatIsDetail2: "La frappe classique développe la mémoire musculaire. Les jeux de mots sont un mode de mots en chute rapide. Les exercices à trous testent la compréhension en lecture. Tous les modes utilisent le même deck.",
    whatIsDetail3: "Disponible en 6 langues d'interface avec plus de 10 thèmes. Plan gratuit : 3 decks jusqu'à 200 cartes chacun. Pro débloque les decks illimités à 5$/mois.",
    homeFaqTitle: 'Questions fréquentes',
    homeFaq1Q: "Qu'est-ce que typee et comment ça marche ?",
    homeFaq1A: "typee est une app d'apprentissage des langues par l'IA. Collez des paroles ou des sous-titres (.srt) — l'IA (GPT-4o-mini) extrait le vocabulaire et crée des cartes automatiquement. Pratiquez ensuite avec trois modes : frappe classique, jeux de mots (mots en chute) ou exercices à trous. Chaque session suit WPM, précision et maîtrise.",
    homeFaq2Q: 'typee est-il gratuit ?',
    homeFaq2A: "Oui. Le plan gratuit inclut 3 decks (jusqu'à 200 cartes chacun), tous les modes de pratique, tous les thèmes et les statistiques de base. Le plan Pro (5$/mois ou 48$/an) débloque les decks illimités.",
    homeFaq3Q: 'Quel contenu peut-on utiliser pour créer des cartes ?',
    homeFaq3A: "Collez des paroles, importez des sous-titres (.srt), collez du texte ou importez un deck Anki (.apkg). L'IA traite le contenu et extrait automatiquement des cartes de vocabulaire et des exercices à trous.",
    homeFaq4Q: "Ai-je besoin d'un deck Anki ?",
    homeFaq4A: "Non. Vous pouvez créer des decks directement depuis n'importe quel contenu texte grâce à l'IA — collez des paroles ou des sous-titres et les cartes sont générées automatiquement. L'import Anki (.apkg) est aussi pris en charge.",
    homeFaq5Q: "Quels modes de jeu sont disponibles ?",
    homeFaq5A: "typee propose trois modes : Frappe classique (voyez le recto, tapez la réponse), jeux de mots (les mots tombent du haut — tapez-les avant qu'ils atteignent le bas) et Exercices à trous (complétez les phrases avec le mot manquant). Tous les modes suivent WPM et précision.",

    tryDemo: 'Essayer sans deck',
    demoSubtitle: 'Sans compte. Choisissez un deck et commencez à taper.',
    demoModeHintMeaning: 'Voyez le mot → tapez la signification en anglais',
    demoModeHintWord: 'Voyez le mot + indice anglais → tapez le mot',
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
    resultsUpgradePrompt: 'Super score ! Suivez vos progrès avec Pro.',
    resultsUpgradeCta: 'Voir les fonctionnalités Pro →',
    aiQuotaWarning: 'Dernière requête IA pour aujourd\'hui.',
    aiQuotaUpgrade: 'Besoin de plus ? Passez à Pro pour 50/jour →',
    proGateUnlock: 'Débloquer avec Pro',
    proGatePreview: 'Aperçu — passez à Pro pour voir toutes les données',
    streakMilestone: 'Incroyable série de {n} jours ! Continuez !',
    retentionStreakMilestone: '{n} jours consécutifs ! Vous êtes en feu !',
    retentionPracticeToday: 'Prêt à pratiquer aujourd\'hui ? Maintenez votre série !',
    retentionWelcomeBack: 'Bon retour ! Reprenons là où vous en étiez.',
    retentionDueCards: '{n} cartes à réviser. Pratique rapide ?',
    retentionStartBtn: 'Commencer',
    retentionDismiss: 'Fermer',
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
    footerAbout: 'À propos',
    footerContact: 'Nous contacter',
    footerTerms: "Conditions d'utilisation",
    footerPrivacy: 'Politique de confidentialité',
    footerChangelog: 'Journal des mises à jour',
    changelogTitle: 'Journal des mises à jour',
    changelogIntro: 'Découvrez les nouveautés de typee.',
    comingSoon: 'Bientôt disponible.',

    aboutTitle: 'À propos de typee',
    aboutMission: 'Notre mission',
    aboutMissionDesc: "typee existe pour rendre l'apprentissage des langues plus immersif et efficace. En transformant le contenu que vous aimez — paroles de chansons, sous-titres de films, articles — en pratique active de frappe, nous vous aidons à construire la mémoire musculaire et retenir le vocabulaire.",
    aboutStory: "L'histoire",
    aboutStoryP1: "typee est né d'une idée simple : la meilleure façon d'apprendre une langue est de s'immerger dans le contenu qu'on aime vraiment. Les chansons qu'on écoute en boucle, les séries qu'on regarde d'une traite, les paroles qui restent en tête — c'est là que vit le vrai vocabulaire.",
    aboutStoryP2: "Mais écouter passivement ne suffit pas. Et si vous deviez taper chaque mot ? La frappe force le rappel actif — impossible de tricher. Qu'il s'agisse de compléter des lacunes dans des paroles de K-pop ou d'un jeu de mots avec du vocabulaire d'anime, chaque touche construit une vraie mémoire.",
    aboutStoryP3: "typee a été lancé en 2026 comme outil web gratuit. Collez des paroles de chanson ou déposez un fichier de sous-titres SRT — l'IA extrait le vocabulaire et génère des cartes en quelques secondes. Pratiquez avec la frappe, les textes à trous ou Word Rain. Sans téléchargement ni configuration complexe.",
    aboutWhyTitle: 'Pourquoi la frappe ?',
    aboutWhy1: 'Rappel actif — produire la réponse renforce la mémoire plus que la reconnaissance seule.',
    aboutWhy2: "Le contexte compte — apprendre des mots dans des phrases qu'on a vraiment entendues (de chansons ou de séries) les fixe d'une façon que l'étude isolée ne permet pas.",
    aboutWhy3: 'Retour honnête — vous tapez correctement ou non. Plus de doute sur ce que vous saviez vraiment.',
    aboutWhy4: 'Progrès mesurables — WPM et précision fournissent des métriques concrètes.',
    aboutTechTitle: 'Technologie',
    aboutTechDesc: "typee est une application web Next.js hébergée sur Vercel. Les paquets sont analysés dans le navigateur — vos fichiers .apkg ne quittent jamais votre appareil. Nous utilisons Supabase pour l'authentification et Stripe pour les paiements sécurisés.",

    contactTitle: 'Nous contacter',
    contactIntro: "Vous avez une question, une demande de fonctionnalité ou trouvé un bug ? Nous serions ravis d'avoir de vos nouvelles.",
    contactEmailLabel: 'Envoyez-nous un email',
    contactEmailDesc: 'Envoyez-nous un email et nous vous répondrons.',
    contactResponseTime: 'Nous répondons généralement sous 24 heures.',
    contactTopics: 'Comment pouvons-nous vous aider ?',
    contactTopic1: 'Rapports de bugs et problèmes techniques',
    contactTopic2: 'Demandes de fonctionnalités et suggestions',
    contactTopic3: 'Questions de facturation et abonnement',
    contactTopic4: 'Questions générales et commentaires',

    guideTitle: "Guide d'utilisation",
    guideIntro: "typee transforme le contenu que vous aimez en pratique de langues. Collez des paroles de chanson, déposez des fichiers de sous-titres ou importez un paquet Anki — puis pratiquez avec la frappe, les textes à trous ou Word Rain.",
    guideStep1Title: '1. Créez depuis n\'importe quel contenu',
    guideStep1Desc: "Collez des paroles ou sous-titres dans l'onglet Media ou déposez un fichier .srt. Vous pouvez aussi importer un fichier Anki .apkg ou créer des cartes manuellement. L'IA extrait automatiquement le vocabulaire et les cartes à trous.",
    guideStep2Title: '2. Choisissez un mode de pratique',
    guideStep2Desc: "Sélectionnez votre paquet et choisissez comment vous voulez pratiquer. Vous pouvez taper les significations, taper les mots ou utiliser la révision intelligente.",
    guideStep3Title: '3. Tapez vos réponses',
    guideStep3Desc: "Voyez l'invite et tapez la réponse. Vous obtenez un retour instantané caractère par caractère. Appuyez sur Entrée pour soumettre ou passez les cartes que vous ne connaissez pas encore.",
    guideStep4Title: '4. Suivez vos progrès',
    guideStep4Desc: "Après chaque session, consultez votre précision, vitesse (WPM) et nombre de bonnes réponses. Au fil du temps, suivez les niveaux de maîtrise de chaque carte.",
    guideModesTitle: 'Modes de pratique',
    guideModeFrontToBack: 'Taper la signification — Voyez le mot, tapez la définition/traduction.',
    guideModeBackToFront: "Taper le mot — Voyez la signification/indice, tapez le mot d'origine.",
    guideModeSequential: "Séquentiel — Pratiquez les cartes dans l'ordre.",
    guideModeRandom: 'Aléatoire — Mélangez les cartes à chaque session.',
    guideModeDifficult: "Difficiles d'abord — Les cartes que vous ratez le plus apparaissent en premier.",
    guideTipsTitle: 'Conseils pour mieux pratiquer',
    guideTip1: 'Pratiquez quotidiennement — même 5 minutes par jour construisent une mémoire solide.',
    guideTip2: 'Utilisez le mode "Difficiles d\'abord" pour vous concentrer sur vos cartes les plus faibles.',
    guideTip3: 'Essayez les deux modes "Taper la signification" et "Taper le mot" pour un apprentissage plus profond.',
    guideTip4: 'Consultez régulièrement votre page de statistiques pour voir quelles cartes nécessitent plus d\'attention.',
    guideFormatsTitle: 'Entrées prises en charge',
    guideFormatsDesc: "typee accepte les fichiers de sous-titres .srt, les paroles .txt et les paquets Anki .apkg. Vous pouvez aussi coller du texte directement ou créer des cartes manuellement. Les imports CSV/TSV avec détection automatique des champs sont également pris en charge.",
    guideFaqTitle: 'FAQ',
    guideFaq1Q: 'typee est-il gratuit ?',
    guideFaq1A: "Oui ! Le plan gratuit inclut 3 paquets avec jusqu'à 200 cartes chacun, tous les modes de pratique et les statistiques de base. Passez à Pro pour des paquets illimités.",
    guideFaq2Q: 'Quelles langues sont prises en charge ?',
    guideFaq2A: "Toute langue qui fonctionne dans Anki fonctionne dans typee — japonais, coréen, chinois, espagnol, français, allemand et plus.",
    guideFaq3Q: 'Puis-je utiliser typee sans compte ?',
    guideFaq3A: "Oui. Vous pouvez essayer la démo ou télécharger un paquet en tant qu'invité. Créez un compte gratuit pour sauvegarder vos paquets.",
    guideFaq4Q: 'Comment fonctionne la révision intelligente ?',
    guideFaq4A: "La révision intelligente utilise un score de confiance qui se met à jour en fonction de votre précision. Les cartes que vous ratez fréquemment apparaissent plus souvent.",

    termsTitle: "Conditions d'utilisation",
    termsLastUpdated: 'Dernière mise à jour : mars 2026',
    termsIntro: "Bienvenue sur typee. En accédant ou en utilisant notre service, vous acceptez ces conditions. Veuillez les lire attentivement.",
    termsSection1Title: '1. Acceptation des conditions',
    termsSection1Desc: "En utilisant typee (« le Service »), vous acceptez d'être lié par ces Conditions d'utilisation. Si vous n'êtes pas d'accord, veuillez ne pas utiliser le Service.",
    termsSection2Title: '2. Description du service',
    termsSection2Desc: "typee est une application web d'apprentissage des langues. Nous fournissons des outils pour créer des jeux de cartes de vocabulaire à partir de chansons, sous-titres et textes, avec des modes de pratique : frappe, textes à trous et jeu de mots. L'importation de paquets Anki est également prise en charge.",
    termsSection3Title: '3. Comptes utilisateurs',
    termsSection3Desc: "Certaines fonctionnalités sont utilisables sans compte. Pour sauvegarder des paquets et suivre les progrès, vous devez créer un compte via Google OAuth ou email.",
    termsSection4Title: '4. Contenu utilisateur',
    termsSection4Desc: "Vous conservez la propriété du contenu que vous importez. En important du contenu, vous nous accordez une licence limitée pour le stocker et le traiter afin de fournir le Service.",
    termsSection5Title: '5. Utilisation acceptable',
    termsSection5Desc: "Vous acceptez de ne pas faire un usage abusif du Service. Cela inclut : importer du contenu nuisible ou illégal, tenter de perturber le Service, la rétro-ingénierie ou le scraping automatisé.",
    termsSection6Title: '6. Paiements et abonnements',
    termsSection6Desc: "Le plan Pro est facturé via Stripe. Vous pouvez annuler à tout moment. Les remboursements sont traités au cas par cas.",
    termsSection7Title: '7. Limitation de responsabilité',
    termsSection7Desc: "typee est fourni « tel quel » sans garanties. Nous ne sommes pas responsables des pertes de données, interruptions ou dommages résultant de l'utilisation du Service.",
    termsSection8Title: '8. Modification des conditions',
    termsSection8Desc: "Nous pouvons mettre à jour ces conditions périodiquement. L'utilisation continue du Service après les modifications constitue une acceptation.",

    privacyTitle: 'Politique de confidentialité',
    privacyLastUpdated: 'Dernière mise à jour : mars 2026',
    privacyIntro: "Votre vie privée nous tient à cœur. Cette politique explique quelles données nous collectons, comment nous les utilisons et vos droits concernant vos informations.",
    privacySection1Title: '1. Informations que nous collectons',
    privacySection1Desc: "Informations de compte (email, nom) via Google OAuth ou inscription par email. Jeux de cartes et cartes créés depuis votre contenu, plus données de pratique (précision, WPM, historique des sessions). Analyses d'utilisation de base. Les informations de paiement sont traitées par Stripe.",
    privacySection2Title: '2. Comment nous utilisons vos données',
    privacySection2Desc: "Pour fournir et améliorer le Service. Pour sauvegarder vos paquets, suivre les progrès et synchroniser entre appareils. Nous ne vendons pas vos données personnelles à des tiers.",
    privacySection3Title: '3. Stockage des données',
    privacySection3Desc: "Vos données sont stockées de manière sécurisée via Supabase (hébergé sur AWS). Les données d'invités sont stockées uniquement localement dans votre navigateur.",
    privacySection4Title: '4. Cookies et stockage local',
    privacySection4Desc: "Nous utilisons le stockage local pour sauvegarder vos préférences. Les jetons d'authentification sont stockés de manière sécurisée. Nous n'utilisons pas de cookies de suivi tiers.",
    privacySection5Title: '5. Services tiers',
    privacySection5Desc: "Google OAuth pour l'authentification. Stripe pour le traitement des paiements. Supabase pour la base de données et l'authentification.",
    privacySection6Title: '6. Vos droits',
    privacySection6Desc: "Vous pouvez supprimer votre compte et toutes les données associées à tout moment. Vous pouvez exporter vos données en téléchargeant vos paquets. Contactez-nous pour toute demande relative aux données.",
    privacySection7Title: '7. Contact',
    privacySection7Desc: "Si vous avez des questions sur cette Politique de confidentialité, contactez-nous via notre page de Contact.",

    // Blog
    blogTitle: 'Blog',
    blogDescription: "Découvrez la science et les stratégies de l'apprentissage des langues par la frappe.",
    blogReadMore: 'Lire la suite',
    blogMinRead: 'min',
    blogNoPosts: "Pas encore d'articles. Revenez bientôt !",
    blogBackToList: 'Retour au Blog',
    blogToc: 'Table des matières',
    blogRelated: 'Articles connexes',
    footerBlog: 'Blog',

    mediaTab: 'Médias',
    uploadMediaFile: 'Déposez un fichier SRT ou de paroles ici',
    pasteSubtitles: 'Collez des sous-titres, paroles ou texte ici...',
    generateWithAI: 'Générer avec IA',
    generating: 'Génération de cartes avec IA...',
    vocabularyCards: 'Vocabulaire',
    clozeCards: 'Texte à trous',
    bothCardTypes: 'Les deux',
    supportedFormats: 'Fichiers .srt, .txt, .lrc pris en charge (max 2 Mo)',
    mediaNoContent: 'Aucun contenu trouvé dans le fichier',
    mediaPreview: 'Aperçu',
    generateMode: 'Type de carte',
    lineCount: 'lignes',
    sourceLangLabel: 'Langue source',
    targetLangLabel: 'Langue cible',
    sourceLangTooltip: 'La langue de votre contenu (ex : la langue de la chanson ou du sous-titre)',
    targetLangTooltip: 'La langue que vous souhaitez apprendre / dans laquelle traduire',

    acidRain: 'Word Rain',
    fillBlank: 'Texte à trous',
    classicTyping: 'Frappe Classique',

    score: 'Score',
    combo: 'Combo',
    level: 'Niveau',
    gameOver: 'Partie Terminée',
    finalScore: 'Score Final',
    playAgain: 'Rejouer',
    acidRainDesc: 'Les mots tombent du ciel — tapez-les pour les détruire !',
    fillBlankDesc: 'Complétez le blanc avec le mot manquant',
    backToFrontDesc: 'Voyez le mot → tapez-le',
    wordTrain: 'Word Train',
    wordTrainDesc: 'Voyez la signification — tapez le mot avant que le train ne passe !',
    wordTrainTimerDesc: 'Enchaînez pour du temps bonus !',
    timeUp: 'Temps écoulé !',
    wordsCompleted: 'Mots',
    pronunciation: 'Prononciation',
    targetWord: 'Mot cible',

    showHint: 'Voir indice de sens',
    hintTimerLabel: 'Indice lettre',
    fillInMissing: 'Tapez le mot manquant',

    // Onboarding
    onboardingWelcomeTitle: 'Bienvenue sur typee !',
    onboardingWelcomeDesc: "Apprenez les langues en tapant ce que vous aimez. Collez des paroles, sous-titres ou texte — l'IA crée des cartes de pratique instantanément.",
    onboardingCreateTitle: 'Créez votre premier deck',
    onboardingCreateDesc: "Collez des paroles, importez des sous-titres (.srt), un deck Anki, ou créez des cartes manuellement.",
    onboardingStartTitle: 'Commencez à apprendre !',
    onboardingStartDesc: 'Créez un deck pour commencer ou essayez la démo.',
    onboardingNext: 'Suivant',
    onboardingSkip: 'Passer',
    onboardingDone: "C'est parti !",

    // Community Gallery
    explore: 'Explorer',
    exploreTitle: 'Decks communautaires',
    exploreSubtitle: 'Découvrez et clonez des decks partagés par la communauté',
    searchDecks: 'Rechercher des decks...',
    filterByLanguage: 'Filtrer par langue',
    allLanguages: 'Toutes les langues',
    sortRecent: 'Récent',
    sortPopular: 'Populaire',
    sortMostCloned: 'Plus clonés',
    publishDeck: 'Publier',
    unpublishDeck: 'Dépublier',
    likeDeck: "J'aime",
    cloneDeck: 'Cloner',
    cloneSuccess: 'Cloné !',
    cloneError: 'Échec du clonage. Réessayez.',
    cloneDeckLimit: 'Limite de decks atteinte. Passez à Pro pour des decks illimités.',
    publishedBy: 'par',
    displayName: 'Nom affiché',
    displayNamePlaceholder: 'Entrez votre nom public...',
    setDisplayName: 'Définissez votre nom affiché pour publier',
    noPublicDecks: 'Pas encore de decks publics. Soyez le premier à partager !',
    cardPreviewCount: 'Affichage de {n} cartes',
    anonymous: 'Anonyme',
    signInToClone: 'Connectez-vous pour aimer et cloner des decks',

    aiTopicLabel: 'Sujet',
    aiTopicPlaceholder: 'Ex : Vocabulaire K-POP, Phrases de voyage, Cuisine...',
    aiTopicRequired: 'Veuillez entrer un sujet',
    aiTargetLang: 'Langue',
    aiLevel: 'Niveau',
    aiBeginner: 'Débutant',
    aiIntermediate: 'Intermédiaire',
    aiAdvanced: 'Avancé',
    aiCardCount: 'Cartes',
    aiGenerate: 'Générer des cartes',
    aiGenerating: 'Génération...',
    aiPreview: 'Aperçu',
    aiQuotaRemaining: 'Utilisations IA restantes',
    aiQuotaExceeded: 'Limite quotidienne IA atteinte. Passez à Pro pour plus.',

    leaderboardTitle: 'Classement',
    leaderboardSubtitle: 'Meilleurs scores de la communauté',
    leaderboardDaily: "Aujourd'hui",
    leaderboardWeekly: 'Cette semaine',
    leaderboardAllTime: 'Tout le temps',
    leaderboardPlayer: 'Joueur',
    leaderboardScore: 'Score',
    leaderboardEmpty: 'Pas encore de scores. Soyez le premier !',

    // Goals
    goalSettings: "Objectifs d'entraînement",
    goalSettingsDesc: 'Ajouter un nouvel objectif',
    dailyGoal: 'Quotidien',
    weeklyGoal: 'Hebdomadaire',
    sessionsGoal: 'Sessions',
    minutesGoal: 'Minutes',
    cardsGoal: 'Cartes',
    goalProgress: 'Progression',
    goalComplete: 'Objectif atteint !',
    goalCelebrationMsg: 'Objectif accompli ! Continuez comme ça !',
    setGoal: "Définir l'objectif",
    removeGoal: 'Supprimer',
    noGoalsYet: 'Aucun objectif défini',

    // AI Coaching
    getAiTips: '✨ Obtenir des conseils IA',
    aiCoachingTitle: 'Coaching IA',
    aiCoachingLoading: 'Analyse de votre session...',
    aiCoachingError: 'Impossible de récupérer les conseils. Réessayez.',
    aiTipsRemaining: '{n} utilisations IA restantes aujourd\'hui',
    retryBtn: 'Réessayer',

    // SRS Difficulty Rating
    rateAgain: 'Encore',
    rateHard: 'Difficile',
    rateGood: 'Bien',
    rateEasy: 'Facile',
    rateHint: 'À quel point vous en souvenez-vous ?',
    reviewSummary: '{cards} cartes à réviser dans {decks} paquets',
    reviewNow: 'Réviser maintenant',

    // XP & Level
    xpGained: '+{xp} XP',
    levelLabel: 'Niveau {level}',
    levelUp: 'Niveau supérieur !',
    xpToNext: '{xp} XP pour le prochain niveau',
    xpThisSession: 'XP de cette session',

    // Achievements
    achievementsTab: 'Succès',
    achievementUnlocked: 'Succès débloqué !',
    achievementLocked: 'Verrouillé',
    achievStreak3: '3 jours consécutifs',
    achievStreak7: 'Guerrier hebdomadaire',
    achievStreak30: 'Maître mensuel',
    achievStreak100: '100 jours consécutifs',
    achievSessions10: 'Premiers pas',
    achievSessions50: 'Apprenant assidu',
    achievSessions100: 'Pro de la pratique',
    achievSessions500: 'Machine à étudier',
    achievMastery10: 'Première maîtrise',
    achievMastery50: 'Érudit des cartes',
    achievMastery100: 'Expert en maîtrise',
    achievSpeed40: 'Doigts rapides',
    achievSpeed60: 'Démon de vitesse',
    achievSpeed80: 'Dactylographe éclair',
    achievCards100: 'Collectionneur',
    achievCards500: 'Passionné de cartes',
    achievCards1000: 'Maître des cartes',
    achievVariety3: 'Explorateur de modes',
    achievVariety5: 'Touche-à-tout',
  },
};
