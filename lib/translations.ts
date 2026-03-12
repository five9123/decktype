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
    signInWithTwitter: 'Continue with X',
    signInWithEmail: 'Continue with Email',
    emailPlaceholder: 'Enter your email...',

    loginHeroTitle: 'Turn flashcards into typing mastery',
    loginHeroDesc: 'Upload your Anki deck, practice typing, and track your progress with smart spaced repetition.',
    loginFeature1: 'Smart spaced repetition',
    loginFeature2: 'Track WPM & accuracy',
    loginFeature3: 'Any language, any deck',
    loginWelcome: 'Welcome',
    loginDesc: 'Sign in to save your progress and unlock all features.',
    loginOrDivider: 'or',
    loginTryDemo: 'Try without an account',
    loginReassurance1: '1 free deck included',
    loginReassurance2: 'No credit card required',

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
    createDeckSubtitle: 'From URL, text, or enter cards manually',
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

    landingBadge: 'Free to start · No subscription required',
    landingHero1: 'Type it. Learn it.',
    landingHero2: 'Master any deck.',
    landingSubtext: 'Turn your Anki flashcards into a typing practice session. Build muscle memory, track WPM, and actually remember what you study.',
    startForFree: 'Start for Free',
    tryWithoutDeck: 'Try without a Deck',
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

    whatIsTitle: 'What is typee?',
    whatIsDesc: 'typee is a web-based typing practice tool designed for Anki users. Instead of passively reviewing flashcards, you actively type your answers — building stronger muscle memory and deeper recall. Upload any .apkg deck file and practice typing your cards while tracking real-time WPM and accuracy statistics.',
    whatIsDetail1: 'Works with any Anki deck: language vocabulary, medical terms, history facts, programming concepts, and more. typee parses your deck instantly in the browser — no server upload needed.',
    whatIsDetail2: 'The Smart Review system adapts to your performance using spaced repetition. Cards you struggle with appear more frequently, while mastered cards gradually fade back — just like Anki, but with typing as the active recall method.',
    whatIsDetail3: 'Available in 6 interface languages (English, Korean, Japanese, Chinese, Spanish, French) with 10+ editor themes. Free to start with 1 deck and up to 100 cards. Pro plan unlocks unlimited decks for $5/month.',
    homeFaqTitle: 'Frequently Asked Questions',
    homeFaq1Q: 'What is typee and how does it work?',
    homeFaq1A: 'typee is a typing practice app for Anki flashcard users. Upload your .apkg deck file, and typee converts each card into a typing exercise. You see the front of a card and type the answer. The app tracks your WPM (words per minute), accuracy, and mastery level for every card.',
    homeFaq2Q: 'Is typee free to use?',
    homeFaq2A: 'Yes. The free plan includes 1 deck with up to 100 cards, all practice modes, all themes, and basic statistics. The Pro plan ($5/month or $48/year) unlocks unlimited decks, advanced progress tracking, and priority support.',
    homeFaq3Q: 'What languages does typee support?',
    homeFaq3A: 'typee supports any language that works in Anki. This includes Japanese, Korean, Chinese, Spanish, French, German, Arabic, Thai, and many more. The app handles IME input for CJK languages and uses Unicode grapheme segmentation for accurate character-level feedback.',
    homeFaq4Q: 'Do I need an Anki account to use typee?',
    homeFaq4A: 'No. typee is a standalone web app. You just need an .apkg file exported from Anki. You can also try the built-in demo decks without uploading anything or creating an account.',
    homeFaq5Q: 'How is typee different from regular Anki review?',
    homeFaq5A: 'Anki uses passive recognition — you see a card and rate how well you knew it. typee adds active recall through typing. You must physically type the answer, which builds stronger muscle memory and deeper retention. typee also tracks your typing speed and accuracy over time.',

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
    comingSoon: 'Coming soon.',

    aboutTitle: 'About typee',
    aboutMission: 'Our Mission',
    aboutMissionDesc: 'typee exists to make flashcard learning more effective through active recall. By turning passive review into typing practice, we help students build stronger muscle memory, retain knowledge longer, and track their progress with precision.',
    aboutStory: 'The Story',
    aboutStoryP1: 'typee was born from a simple frustration: Anki is great for spaced repetition, but the review process is too passive. You see a card, think about the answer, flip it over, and rate yourself. There\'s no way to know if you truly remember the answer or if you\'re just recognizing familiar text.',
    aboutStoryP2: 'What if you had to type the answer? Typing forces active recall — you can\'t cheat. Every keystroke reveals whether you really know the material. Plus, typing itself is a form of muscle memory, reinforcing the neural pathways for each piece of knowledge.',
    aboutStoryP3: 'typee launched in 2026 as a free web tool. Upload any Anki .apkg deck, and instantly start typing practice with real-time WPM tracking, accuracy stats, and adaptive spaced repetition. No downloads, no complicated setup — just upload and type.',
    aboutWhyTitle: 'Why Typing?',
    aboutWhy1: 'Active recall — physically producing the answer strengthens memory more than recognition alone.',
    aboutWhy2: 'Muscle memory — repeated typing builds automatic recall, especially for language vocabulary and CJK characters.',
    aboutWhy3: 'Honest feedback — you either type it correctly or you don\'t. No more over-rating your confidence in Anki reviews.',
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
    guideIntro: 'typee turns your Anki flashcards into typing practice sessions. Type answers instead of flipping cards — build muscle memory and retain vocabulary faster.',
    guideStep1Title: '1. Upload Your Deck',
    guideStep1Desc: 'Go to the Upload page and drag & drop your .apkg file. typee will automatically parse your cards and extract front/back fields.',
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
    guideFormatsTitle: 'Supported Formats',
    guideFormatsDesc: 'typee supports .apkg files exported from Anki. You can also create decks manually using the Create Deck feature. CSV/TSV uploads with auto-detected field mapping are also supported.',
    guideFaqTitle: 'FAQ',
    guideFaq1Q: 'Is typee free?',
    guideFaq1A: 'Yes! The free plan includes 1 deck with up to 100 cards, all practice modes, and basic stats. Upgrade to Pro for unlimited decks and advanced features.',
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
    termsSection2Desc: 'typee is a web-based application that converts Anki flashcards into typing practice sessions. We provide tools for uploading decks, practicing vocabulary through typing, and tracking learning progress.',
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
    privacySection1Desc: 'Account info (email, name) via Google OAuth or email sign-up. Uploaded flashcard decks and practice data (accuracy, WPM, session history). Basic usage analytics (page views, feature usage). Payment info is processed by Stripe — we do not store your card details.',
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
  },

  ko: {
    appName: 'typee',
    subtitle: 'Anki 덱을 업로드하세요.\n타이핑으로 연습하세요.\n기억력을 높이세요.',
    description: 'Anki 플래시카드를 타이핑 연습으로 변환합니다. WPM, 정확도를 추적하고 카드를 더 빠르게 마스터하세요.',
    footer: 'typee — Anki와 타이핑 연습의 만남',

    signIn: '로그인',
    signOut: '로그아웃',
    signInWithGoogle: 'Google로 계속',
    signInWithTwitter: 'X로 계속',
    signInWithEmail: '이메일로 계속',
    emailPlaceholder: '이메일을 입력하세요...',

    loginHeroTitle: '플래시카드를 타이핑 마스터리로',
    loginHeroDesc: 'Anki 덱을 업로드하고, 타이핑으로 연습하며, 스마트 복습으로 진행률을 추적하세요.',
    loginFeature1: '스마트 간격 반복',
    loginFeature2: 'WPM과 정확도 추적',
    loginFeature3: '모든 언어, 모든 덱',
    loginWelcome: '환영합니다',
    loginDesc: '진행 상황을 저장하고 모든 기능을 이용하려면 로그인하세요.',
    loginOrDivider: '또는',
    loginTryDemo: '가입 없이 체험하기',
    loginReassurance1: '무료로 1개 덱 사용 가능',
    loginReassurance2: '신용카드 필요 없음',

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
    createDeckSubtitle: 'URL, 텍스트 또는 직접 카드를 입력하여 덱을 만드세요',
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

    landingBadge: '무료 시작 · 구독 불필요',
    landingHero1: '타이핑하고. 배우고.',
    landingHero2: '어떤 덱이든 마스터하세요.',
    landingSubtext: 'Anki 플래시카드를 타이핑 연습 세션으로 변환하세요. 근육 기억을 키우고, WPM을 추적하고, 공부한 내용을 실제로 기억하세요.',
    startForFree: '무료로 시작',
    tryWithoutDeck: '덱 없이 체험하기',
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

    whatIsTitle: 'typee란?',
    whatIsDesc: 'typee는 Anki 사용자를 위한 웹 기반 타이핑 연습 도구입니다. 플래시카드를 수동적으로 복습하는 대신, 답을 직접 타이핑하여 더 강한 근육 기억과 깊은 회상력을 키울 수 있습니다. .apkg 덱 파일을 업로드하고 실시간 WPM 및 정확도를 추적하며 카드를 타이핑하세요.',
    whatIsDetail1: '어떤 Anki 덱이든 사용 가능: 언어 어휘, 의학 용어, 역사, 프로그래밍 개념 등. typee는 브라우저에서 즉시 덱을 파싱합니다 — 서버 업로드가 필요 없습니다.',
    whatIsDetail2: '스마트 리뷰 시스템은 간격 반복을 사용하여 성과에 맞게 조정됩니다. 어려운 카드는 더 자주, 숙달한 카드는 점차 덜 나타납니다.',
    whatIsDetail3: '6개 언어 인터페이스(영어, 한국어, 일본어, 중국어, 스페인어, 프랑스어)와 10+ 에디터 테마. 1개 덱, 최대 100장 무료. Pro 플랜은 월 $5.',
    homeFaqTitle: '자주 묻는 질문',
    homeFaq1Q: 'typee는 무엇이고 어떻게 작동하나요?',
    homeFaq1A: 'typee는 Anki 플래시카드 사용자를 위한 타이핑 연습 앱입니다. .apkg 덱 파일을 업로드하면 각 카드가 타이핑 연습으로 변환됩니다. 카드 앞면을 보고 답을 타이핑하세요. WPM, 정확도, 숙달도를 추적합니다.',
    homeFaq2Q: 'typee는 무료인가요?',
    homeFaq2A: '네. 무료 플랜에는 1개 덱(최대 100장), 모든 연습 모드, 모든 테마, 기본 통계가 포함됩니다. Pro 플랜(월 $5 또는 연 $48)은 무제한 덱, 고급 진행 추적, 우선 지원을 제공합니다.',
    homeFaq3Q: '어떤 언어를 지원하나요?',
    homeFaq3A: 'Anki에서 작동하는 모든 언어를 지원합니다. 일본어, 한국어, 중국어, 스페인어, 프랑스어, 독일어, 아랍어, 태국어 등. CJK 언어의 IME 입력과 유니코드 자소 분할을 지원합니다.',
    homeFaq4Q: 'Anki 계정이 필요한가요?',
    homeFaq4A: '아니요. typee는 독립적인 웹 앱입니다. Anki에서 내보낸 .apkg 파일만 있으면 됩니다. 계정 없이 내장 데모 덱도 체험할 수 있습니다.',
    homeFaq5Q: '일반 Anki 복습과 어떻게 다른가요?',
    homeFaq5A: 'Anki는 수동적 인식을 사용합니다. typee는 타이핑을 통한 능동적 회상을 추가합니다. 답을 직접 타이핑해야 하므로 더 강한 근육 기억과 깊은 기억력이 형성됩니다.',

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
    comingSoon: '준비 중입니다.',

    aboutTitle: 'typee 소개',
    aboutMission: '미션',
    aboutMissionDesc: 'typee는 능동적 회상을 통해 플래시카드 학습을 더 효과적으로 만들기 위해 존재합니다. 수동적 복습을 타이핑 연습으로 전환하여 더 강한 근육 기억, 더 오래 지속되는 지식 보유, 정밀한 진행 추적을 도와줍니다.',
    aboutStory: '이야기',
    aboutStoryP1: 'typee는 단순한 불편함에서 탄생했습니다. Anki는 간격 반복에 뛰어나지만, 복습 과정이 너무 수동적입니다. 카드를 보고, 답을 생각하고, 뒤집고, 자기 평가를 합니다. 정말로 답을 기억하는지 아닌지 알 수 없습니다.',
    aboutStoryP2: '답을 타이핑해야 한다면? 타이핑은 능동적 회상을 강제합니다 — 속일 수 없습니다. 모든 키 입력이 실제로 자료를 알고 있는지 드러냅니다. 게다가 타이핑 자체가 근육 기억의 한 형태로, 각 지식에 대한 신경 경로를 강화합니다.',
    aboutStoryP3: 'typee는 2026년 무료 웹 도구로 출시되었습니다. Anki .apkg 덱을 업로드하면 실시간 WPM 추적, 정확도 통계, 적응형 간격 반복과 함께 즉시 타이핑 연습을 시작할 수 있습니다.',
    aboutWhyTitle: '왜 타이핑인가?',
    aboutWhy1: '능동적 회상 — 답을 직접 생산하면 인식만 하는 것보다 기억이 강화됩니다.',
    aboutWhy2: '근육 기억 — 반복적인 타이핑이 자동 회상을 구축합니다. 특히 언어 어휘와 CJK 문자에 효과적입니다.',
    aboutWhy3: '정직한 피드백 — 정확히 타이핑하거나 못하거나. Anki 복습에서 자신감을 과대평가할 수 없습니다.',
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
    guideIntro: 'typee는 Anki 플래시카드를 타이핑 연습 세션으로 변환합니다. 카드를 넘기는 대신 답을 직접 타이핑하여 근육 기억을 만들고 어휘를 더 빠르게 기억하세요.',
    guideStep1Title: '1. 덱 업로드',
    guideStep1Desc: '업로드 페이지에서 .apkg 파일을 드래그 앤 드롭하세요. typee가 자동으로 카드를 파싱하고 앞면/뒷면 필드를 추출합니다.',
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
    guideFormatsTitle: '지원 형식',
    guideFormatsDesc: 'typee는 Anki에서 내보낸 .apkg 파일을 지원합니다. 덱 만들기 기능으로 직접 덱을 만들 수도 있습니다. 필드 자동 감지 기능이 있는 CSV/TSV 업로드도 지원합니다.',
    guideFaqTitle: '자주 묻는 질문',
    guideFaq1Q: 'typee는 무료인가요?',
    guideFaq1A: '네! 무료 플랜에는 1개의 덱(최대 100장), 모든 연습 모드, 기본 통계가 포함됩니다. Pro로 업그레이드하면 무제한 덱과 고급 기능을 이용할 수 있습니다.',
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
    termsSection2Desc: 'typee는 Anki 플래시카드를 타이핑 연습 세션으로 변환하는 웹 애플리케이션입니다. 덱 업로드, 타이핑을 통한 어휘 연습, 학습 진행 추적 도구를 제공합니다.',
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
    privacySection1Desc: 'Google OAuth 또는 이메일 가입을 통한 계정 정보(이메일, 이름). 업로드한 플래시카드 덱과 연습 데이터(정확도, WPM, 세션 기록). 기본적인 사용 분석(페이지 조회, 기능 사용). 결제 정보는 Stripe에서 처리되며 카드 정보를 저장하지 않습니다.',
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
  },

  ja: {
    appName: 'typee',
    subtitle: 'Ankiデッキをアップロード。\nタイピングで練習。\n記憶力を向上。',
    description: 'Ankiフラッシュカードをタイピング練習に変換。WPM・精度を追跡してカードをマスターしよう。',
    footer: 'typee — Ankiとタイピング練習の融合',

    signIn: 'ログイン',
    signOut: 'ログアウト',
    signInWithGoogle: 'Googleで続ける',
    signInWithTwitter: 'Xで続ける',
    signInWithEmail: 'メールで続ける',
    emailPlaceholder: 'メールアドレスを入力...',

    loginHeroTitle: 'フラッシュカードをタイピング練習に',
    loginHeroDesc: 'Ankiデッキをアップロードして、タイピングで練習し、スマートな間隔反復で進捗を追跡しましょう。',
    loginFeature1: 'スマート間隔反復',
    loginFeature2: 'WPMと正確度を追跡',
    loginFeature3: 'あらゆる言語、あらゆるデッキ',
    loginWelcome: 'ようこそ',
    loginDesc: 'ログインして進捗を保存し、すべての機能をご利用ください。',
    loginOrDivider: 'または',
    loginTryDemo: 'アカウントなしで体験',
    loginReassurance1: '無料で1デッキ利用可能',
    loginReassurance2: 'クレジットカード不要',

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
    createDeckSubtitle: 'URL、テキスト、または手動でカードを入力してデッキを作成',
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

    landingBadge: '無料で始める · サブスク不要',
    landingHero1: '打って。学んで。',
    landingHero2: 'どんなデッキもマスターしよう。',
    landingSubtext: 'AnkiフラッシュカードをタイピングPracticeセッションに変換。筋肉記憶を鍛え、WPMを追跡し、学んだことを本当に覚えましょう。',
    startForFree: '無料で始める',
    tryWithoutDeck: 'デッキなしで試す',
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

    whatIsTitle: 'typeeとは？',
    whatIsDesc: 'typeeはAnkiユーザーのためのウェブベースのタイピング練習ツールです。フラッシュカードを受動的に復習する代わりに、答えを積極的にタイピングすることで、より強い筋肉記憶とより深い想起力を構築します。.apkgデッキファイルをアップロードし、リアルタイムのWPMと精度を追跡しながらカードをタイピングしましょう。',
    whatIsDetail1: 'どんなAnkiデッキでも使用可能：言語の語彙、医学用語、歴史、プログラミング概念など。typeeはブラウザで即座にデッキを解析します。',
    whatIsDetail2: 'スマートレビューシステムは間隔反復を使用してパフォーマンスに適応します。苦手なカードはより頻繁に、習得したカードは徐々に少なく表示されます。',
    whatIsDetail3: '6言語のインターフェース（英語、韓国語、日本語、中国語、スペイン語、フランス語）と10以上のエディターテーマ。1デッキ最大100枚まで無料。Proプランは月額$5。',
    homeFaqTitle: 'よくある質問',
    homeFaq1Q: 'typeeとは何ですか？どのように動作しますか？',
    homeFaq1A: 'typeeはAnkiフラッシュカードユーザーのためのタイピング練習アプリです。.apkgデッキファイルをアップロードすると、各カードがタイピング練習に変換されます。カードの表面を見て答えをタイピングします。WPM、精度、習得レベルを追跡します。',
    homeFaq2Q: 'typeeは無料ですか？',
    homeFaq2A: 'はい。無料プランには1デッキ（最大100枚）、すべての練習モード、すべてのテーマ、基本統計が含まれます。Proプラン（月額$5または年額$48）で無制限デッキ、高度な進捗追跡、優先サポートが利用できます。',
    homeFaq3Q: 'どの言語に対応していますか？',
    homeFaq3A: 'Ankiで動作するすべての言語に対応しています。日本語、韓国語、中国語、スペイン語、フランス語、ドイツ語、アラビア語、タイ語など。CJK言語のIME入力とUnicode書記素分割に対応しています。',
    homeFaq4Q: 'Ankiアカウントは必要ですか？',
    homeFaq4A: 'いいえ。typeeは独立したウェブアプリです。Ankiからエクスポートした.apkgファイルがあれば十分です。アカウントなしで内蔵デモデッキも体験できます。',
    homeFaq5Q: '通常のAnki復習とどう違いますか？',
    homeFaq5A: 'Ankiは受動的な認識を使用します。typeeはタイピングによる能動的な想起を追加します。答えを実際にタイピングすることで、より強い筋肉記憶と深い記憶定着が形成されます。',

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
    comingSoon: '準備中です。',

    aboutTitle: 'typeeについて',
    aboutMission: 'ミッション',
    aboutMissionDesc: 'typeeは、能動的想起を通じてフラッシュカード学習をより効果的にするために存在します。受動的な復習をタイピング練習に変換し、より強い筋肉記憶、より長い知識保持、正確な進捗追跡を実現します。',
    aboutStory: 'ストーリー',
    aboutStoryP1: 'typeeはシンプルな不満から生まれました。Ankiは間隔反復に優れていますが、復習プロセスは受動的すぎます。カードを見て、答えを考え、裏返して、自己評価する。本当に答えを覚えているかどうかは分かりません。',
    aboutStoryP2: '答えをタイピングしなければならないとしたら？タイピングは能動的想起を強制します — ごまかせません。すべてのキー入力が、本当に教材を知っているかどうかを明らかにします。',
    aboutStoryP3: 'typeeは2026年に無料ウェブツールとしてリリースされました。Anki .apkgデッキをアップロードすると、リアルタイムWPM追跡、精度統計、適応型間隔反復でタイピング練習を即座に開始できます。',
    aboutWhyTitle: 'なぜタイピング？',
    aboutWhy1: '能動的想起 — 答えを自分で生産することで、認識だけよりも記憶が強化されます。',
    aboutWhy2: '筋肉記憶 — 繰り返しのタイピングが自動的な想起を構築します。特に語彙とCJK文字に効果的です。',
    aboutWhy3: '正直なフィードバック — 正確にタイピングするか、しないか。Ankiレビューで自信を過大評価できません。',
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
    guideIntro: 'typeeはAnkiフラッシュカードをタイピング練習セッションに変換します。カードをめくる代わりに答えをタイピングして、筋肉記憶を構築し、語彙をより早く定着させましょう。',
    guideStep1Title: '1. デッキをアップロード',
    guideStep1Desc: 'アップロードページで.apkgファイルをドラッグ＆ドロップしてください。typeeが自動的にカードを解析し、表面/裏面のフィールドを抽出します。',
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
    guideFormatsTitle: '対応フォーマット',
    guideFormatsDesc: 'typeeはAnkiからエクスポートした.apkgファイルに対応しています。デッキ作成機能で手動でデッキを作ることもできます。フィールド自動検出付きのCSV/TSVアップロードにも対応しています。',
    guideFaqTitle: 'よくある質問',
    guideFaq1Q: 'typeeは無料ですか？',
    guideFaq1A: 'はい！無料プランには1デッキ（最大100枚）、全練習モード、基本統計が含まれます。Proにアップグレードすると無制限のデッキと高度な機能が利用できます。',
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
    termsSection2Desc: 'typeeはAnkiフラッシュカードをタイピング練習セッションに変換するWebアプリケーションです。デッキのアップロード、タイピングによる語彙練習、学習進捗の追跡ツールを提供します。',
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
    privacySection1Desc: 'Google OAuthまたはメール登録によるアカウント情報（メール、名前）。アップロードしたフラッシュカードデッキと練習データ（精度、WPM、セッション履歴）。基本的な使用分析（ページビュー、機能使用）。支払い情報はStripeで処理され、カード情報は保存しません。',
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
  },

  es: {
    appName: 'typee',
    subtitle: 'Sube tu mazo Anki.\nPractica escribiendo.\nMejora tu memoria.',
    description: 'Convierte tus tarjetas Anki en práctica de escritura. Mide tu WPM, precisión y domina tus tarjetas más rápido.',
    footer: 'typee — Anki se une a la práctica de escritura',

    signIn: 'Iniciar sesión',
    signOut: 'Cerrar sesión',
    signInWithGoogle: 'Continuar con Google',
    signInWithTwitter: 'Continuar con X',
    signInWithEmail: 'Continuar con Email',
    emailPlaceholder: 'Introduce tu email...',

    loginHeroTitle: 'Convierte flashcards en dominio de escritura',
    loginHeroDesc: 'Sube tu mazo Anki, practica escribiendo y sigue tu progreso con repetición espaciada inteligente.',
    loginFeature1: 'Repetición espaciada inteligente',
    loginFeature2: 'Seguimiento de WPM y precisión',
    loginFeature3: 'Cualquier idioma, cualquier mazo',
    loginWelcome: 'Bienvenido',
    loginDesc: 'Inicia sesión para guardar tu progreso y desbloquear todas las funciones.',
    loginOrDivider: 'o',
    loginTryDemo: 'Probar sin cuenta',
    loginReassurance1: '1 mazo gratis incluido',
    loginReassurance2: 'No se requiere tarjeta de crédito',

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
    createDeckSubtitle: 'Desde URL, texto o introduce tarjetas manualmente',
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

    landingBadge: 'Gratis · Sin suscripción',
    landingHero1: 'Escríbelo. Apréndelo.',
    landingHero2: 'Domina cualquier mazo.',
    landingSubtext: 'Convierte tus tarjetas Anki en sesiones de práctica de mecanografía. Desarrolla memoria muscular, rastrea WPM y recuerda de verdad lo que estudias.',
    startForFree: 'Empezar gratis',
    tryWithoutDeck: 'Probar sin mazo',
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

    whatIsTitle: '¿Qué es typee?',
    whatIsDesc: 'typee es una herramienta web de práctica de escritura diseñada para usuarios de Anki. En lugar de revisar pasivamente tus tarjetas, escribes activamente las respuestas, construyendo una memoria muscular más fuerte y un recuerdo más profundo.',
    whatIsDetail1: 'Funciona con cualquier mazo de Anki: vocabulario de idiomas, términos médicos, historia, conceptos de programación y más. typee analiza tu mazo al instante en el navegador.',
    whatIsDetail2: 'El sistema de Revisión Inteligente se adapta a tu rendimiento usando repetición espaciada. Las tarjetas difíciles aparecen con más frecuencia, mientras que las dominadas se muestran menos.',
    whatIsDetail3: 'Disponible en 6 idiomas de interfaz con más de 10 temas. Gratis para empezar con 1 mazo y hasta 100 tarjetas. Plan Pro a $5/mes.',
    homeFaqTitle: 'Preguntas frecuentes',
    homeFaq1Q: '¿Qué es typee y cómo funciona?',
    homeFaq1A: 'typee es una app de práctica de escritura para usuarios de tarjetas Anki. Sube tu archivo .apkg y cada tarjeta se convierte en un ejercicio de escritura. Rastrea tu WPM, precisión y nivel de dominio.',
    homeFaq2Q: '¿Es typee gratis?',
    homeFaq2A: 'Sí. El plan gratuito incluye 1 mazo (hasta 100 tarjetas), todos los modos de práctica, todos los temas y estadísticas básicas. El plan Pro ($5/mes o $48/año) desbloquea mazos ilimitados.',
    homeFaq3Q: '¿Qué idiomas soporta typee?',
    homeFaq3A: 'typee soporta cualquier idioma que funcione en Anki: japonés, coreano, chino, español, francés, alemán, árabe, tailandés y más.',
    homeFaq4Q: '¿Necesito una cuenta de Anki?',
    homeFaq4A: 'No. typee es una app web independiente. Solo necesitas un archivo .apkg exportado de Anki. También puedes probar los mazos demo sin crear una cuenta.',
    homeFaq5Q: '¿Cómo es diferente typee de la revisión normal de Anki?',
    homeFaq5A: 'Anki usa reconocimiento pasivo. typee añade recuerdo activo a través de la escritura. Al escribir físicamente las respuestas, construyes una memoria muscular más fuerte.',

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
    comingSoon: 'Próximamente.',

    aboutTitle: 'Acerca de typee',
    aboutMission: 'Nuestra misión',
    aboutMissionDesc: 'typee existe para hacer el aprendizaje con tarjetas más efectivo a través del recuerdo activo. Al convertir la revisión pasiva en práctica de escritura, ayudamos a construir una memoria muscular más fuerte y un seguimiento preciso del progreso.',
    aboutStory: 'La historia',
    aboutStoryP1: 'typee nació de una simple frustración: Anki es excelente para la repetición espaciada, pero el proceso de revisión es demasiado pasivo. Ves una tarjeta, piensas en la respuesta, la volteas y te calificas. No hay forma de saber si realmente recuerdas la respuesta.',
    aboutStoryP2: '¿Y si tuvieras que escribir la respuesta? Escribir fuerza el recuerdo activo — no puedes hacer trampa. Cada tecla revela si realmente conoces el material.',
    aboutStoryP3: 'typee se lanzó en 2026 como herramienta web gratuita. Sube cualquier mazo .apkg de Anki y comienza a practicar con seguimiento WPM en tiempo real, estadísticas de precisión y repetición espaciada adaptativa.',
    aboutWhyTitle: '¿Por qué escribir?',
    aboutWhy1: 'Recuerdo activo — producir la respuesta fortalece la memoria más que el reconocimiento.',
    aboutWhy2: 'Memoria muscular — la escritura repetida construye recuerdo automático, especialmente para vocabulario.',
    aboutWhy3: 'Retroalimentación honesta — o lo escribes correctamente o no. Sin sobrevalorar tu confianza.',
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
    guideIntro: 'typee convierte tus tarjetas de Anki en sesiones de práctica de escritura. Escribe las respuestas en lugar de voltear tarjetas — construye memoria muscular y retén vocabulario más rápido.',
    guideStep1Title: '1. Sube tu mazo',
    guideStep1Desc: 'Ve a la página de carga y arrastra tu archivo .apkg. typee analizará automáticamente tus tarjetas y extraerá los campos de frente/reverso.',
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
    guideFormatsTitle: 'Formatos compatibles',
    guideFormatsDesc: 'typee soporta archivos .apkg exportados desde Anki. También puedes crear mazos manualmente. Se admiten cargas de CSV/TSV con detección automática de campos.',
    guideFaqTitle: 'Preguntas frecuentes',
    guideFaq1Q: '¿Es typee gratis?',
    guideFaq1A: '¡Sí! El plan gratuito incluye 1 mazo con hasta 100 tarjetas, todos los modos de práctica y estadísticas básicas. Actualiza a Pro para mazos ilimitados.',
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
    termsSection2Desc: 'typee es una aplicación web que convierte tarjetas de Anki en sesiones de práctica de escritura. Proporcionamos herramientas para subir mazos, practicar vocabulario y seguir el progreso.',
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
    privacySection1Desc: 'Información de cuenta (email, nombre) mediante Google OAuth o registro por correo. Mazos de tarjetas subidos y datos de práctica. Análisis básico de uso. La información de pago es procesada por Stripe.',
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
  },

  zh: {
    appName: 'typee',
    subtitle: '上传你的Anki牌组。\n打字练习。\n提升记忆力。',
    description: '将Anki闪卡转换为打字练习。追踪WPM、准确率，更快掌握卡片内容。',
    footer: 'typee — Anki与打字练习的结合',

    signIn: '登录',
    signOut: '退出',
    signInWithGoogle: '使用Google继续',
    signInWithTwitter: '使用X继续',
    signInWithEmail: '使用邮箱继续',
    emailPlaceholder: '输入邮箱地址...',

    loginHeroTitle: '将闪卡变为打字练习',
    loginHeroDesc: '上传你的Anki牌组，通过打字练习，配合智能间隔重复追踪你的进度。',
    loginFeature1: '智能间隔重复',
    loginFeature2: '追踪WPM和准确率',
    loginFeature3: '任何语言，任何牌组',
    loginWelcome: '欢迎',
    loginDesc: '登录以保存进度并解锁所有功能。',
    loginOrDivider: '或',
    loginTryDemo: '无需账户即可体验',
    loginReassurance1: '免费包含1个牌组',
    loginReassurance2: '无需信用卡',

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
    createDeckSubtitle: '通过URL、文本或手动输入创建牌组',
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

    landingBadge: '免费开始 · 无需订阅',
    landingHero1: '打字。学习。',
    landingHero2: '掌握任何牌组。',
    landingSubtext: '将你的Anki闪卡转换为打字练习课程。建立肌肉记忆，追踪WPM，真正记住你学的内容。',
    startForFree: '免费开始',
    tryWithoutDeck: '无需卡组即可体验',
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

    whatIsTitle: '什么是typee？',
    whatIsDesc: 'typee是为Anki用户设计的网页版打字练习工具。不再被动复习闪卡，而是主动输入答案——建立更强的肌肉记忆和更深的记忆。上传.apkg牌组文件，实时跟踪WPM和准确率。',
    whatIsDetail1: '支持任何Anki牌组：语言词汇、医学术语、历史、编程概念等。typee在浏览器中即时解析牌组，无需服务器上传。',
    whatIsDetail2: '智能复习系统使用间隔重复根据你的表现进行调整。难的卡片出现更频繁，已掌握的卡片逐渐减少。',
    whatIsDetail3: '支持6种界面语言和10多个编辑器主题。免费使用1个牌组（最多100张卡片）。Pro计划每月$5。',
    homeFaqTitle: '常见问题',
    homeFaq1Q: 'typee是什么？如何使用？',
    homeFaq1A: 'typee是Anki闪卡用户的打字练习应用。上传.apkg牌组文件，每张卡片会转换为打字练习。查看卡片正面并输入答案，追踪WPM、准确率和掌握程度。',
    homeFaq2Q: 'typee免费吗？',
    homeFaq2A: '是的。免费计划包括1个牌组（最多100张卡片）、所有练习模式、所有主题和基本统计。Pro计划（月$5或年$48）解锁无限牌组。',
    homeFaq3Q: 'typee支持哪些语言？',
    homeFaq3A: '支持Anki中所有可用的语言：日语、韩语、中文、西班牙语、法语、德语、阿拉伯语、泰语等。',
    homeFaq4Q: '需要Anki账户吗？',
    homeFaq4A: '不需要。typee是独立的网页应用。只需要从Anki导出的.apkg文件。也可以不创建账户直接试用内置演示牌组。',
    homeFaq5Q: 'typee和普通Anki复习有什么区别？',
    homeFaq5A: 'Anki使用被动识别。typee通过打字添加主动回忆。物理输入答案可以建立更强的肌肉记忆和更深的记忆保持。',

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
    comingSoon: '即将推出。',

    aboutTitle: '关于 typee',
    aboutMission: '我们的使命',
    aboutMissionDesc: 'typee 通过主动回忆让闪卡学习更有效。将被动复习转化为打字练习，帮助建立更强的肌肉记忆、更长久的知识保留和精确的进度追踪。',
    aboutStory: '故事',
    aboutStoryP1: 'typee 源于一个简单的困扰：Anki 的间隔重复很棒，但复习过程太被动了。你看到卡片，想答案，翻转，自我评分。你无法知道自己是否真正记住了答案。',
    aboutStoryP2: '如果你必须打出答案呢？打字迫使主动回忆——你无法作弊。每次按键都揭示你是否真正掌握了材料。',
    aboutStoryP3: 'typee 于 2026 年作为免费网络工具推出。上传任何 Anki .apkg 牌组，即可开始带有实时 WPM 追踪、准确率统计和自适应间隔重复的打字练习。',
    aboutWhyTitle: '为什么是打字？',
    aboutWhy1: '主动回忆——亲自产出答案比仅仅识别能更好地增强记忆。',
    aboutWhy2: '肌肉记忆——重复打字建立自动回忆，特别适合语言词汇和 CJK 字符。',
    aboutWhy3: '诚实反馈——你要么打对，要么打错。不再在 Anki 复习中高估自己的信心。',
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
    guideIntro: 'typee将你的Anki闪卡转化为打字练习。用打字代替翻卡——建立肌肉记忆，更快地记住词汇。',
    guideStep1Title: '1. 上传你的牌组',
    guideStep1Desc: '前往上传页面，拖放你的.apkg文件。typee会自动解析卡片并提取正面/背面字段。',
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
    guideFormatsTitle: '支持的格式',
    guideFormatsDesc: 'typee支持从Anki导出的.apkg文件。你也可以使用创建牌组功能手动创建。还支持带有自动字段检测的CSV/TSV上传。',
    guideFaqTitle: '常见问题',
    guideFaq1Q: 'typee免费吗？',
    guideFaq1A: '是的！免费计划包括1个牌组（最多100张卡片）、所有练习模式和基本统计。升级到Pro可获得无限牌组和高级功能。',
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
    termsSection2Desc: 'typee是一个将Anki闪卡转化为打字练习的Web应用程序。我们提供上传牌组、通过打字练习词汇和追踪学习进度的工具。',
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
    privacySection1Desc: '通过Google OAuth或邮箱注册的账户信息（邮箱、姓名）。上传的闪卡牌组和练习数据（准确率、WPM、会话记录）。基本使用分析（页面浏览、功能使用）。支付信息由Stripe处理，我们不存储您的卡片信息。',
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
  },

  fr: {
    appName: 'typee',
    subtitle: 'Importez votre deck Anki.\nPratiquez la frappe.\nAméliorez votre mémoire.',
    description: 'Transformez vos cartes Anki en exercices de frappe. Suivez votre WPM, précision et maîtrisez vos cartes plus vite.',
    footer: 'typee — Anki rencontre la pratique de frappe',

    signIn: 'Se connecter',
    signOut: 'Se déconnecter',
    signInWithGoogle: 'Continuer avec Google',
    signInWithTwitter: 'Continuer avec X',
    signInWithEmail: 'Continuer avec Email',
    emailPlaceholder: 'Entrez votre email...',

    loginHeroTitle: 'Transformez vos flashcards en pratique de frappe',
    loginHeroDesc: 'Importez votre deck Anki, pratiquez la frappe et suivez vos progrès avec la répétition espacée intelligente.',
    loginFeature1: 'Répétition espacée intelligente',
    loginFeature2: 'Suivi WPM et précision',
    loginFeature3: 'Toute langue, tout deck',
    loginWelcome: 'Bienvenue',
    loginDesc: 'Connectez-vous pour sauvegarder vos progrès et débloquer toutes les fonctionnalités.',
    loginOrDivider: 'ou',
    loginTryDemo: 'Essayer sans compte',
    loginReassurance1: '1 deck gratuit inclus',
    loginReassurance2: 'Aucune carte de crédit requise',

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
    createDeckSubtitle: 'Depuis une URL, du texte ou saisie manuelle',
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

    landingBadge: 'Gratuit · Sans abonnement',
    landingHero1: 'Tapez. Apprenez.',
    landingHero2: 'Maîtrisez n\'importe quel deck.',
    landingSubtext: 'Transformez vos cartes Anki en sessions de pratique de frappe. Développez la mémoire musculaire, suivez votre WPM et retenez vraiment ce que vous étudiez.',
    startForFree: 'Commencer gratuitement',
    tryWithoutDeck: 'Essayer sans paquet',
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

    whatIsTitle: "Qu'est-ce que typee ?",
    whatIsDesc: "typee est un outil web de pratique de frappe conçu pour les utilisateurs d'Anki. Au lieu de réviser passivement vos cartes, vous tapez activement les réponses — construisant une mémoire musculaire plus forte et un rappel plus profond.",
    whatIsDetail1: "Fonctionne avec n'importe quel deck Anki : vocabulaire, termes médicaux, histoire, concepts de programmation et plus. typee analyse votre deck instantanément dans le navigateur.",
    whatIsDetail2: "Le système de Révision Intelligente s'adapte à vos performances en utilisant la répétition espacée. Les cartes difficiles apparaissent plus souvent, les cartes maîtrisées moins fréquemment.",
    whatIsDetail3: "Disponible en 6 langues d'interface avec plus de 10 thèmes. Gratuit pour commencer avec 1 deck et jusqu'à 100 cartes. Plan Pro à 5$/mois.",
    homeFaqTitle: 'Questions fréquentes',
    homeFaq1Q: "Qu'est-ce que typee et comment ça marche ?",
    homeFaq1A: "typee est une app de pratique de frappe pour les utilisateurs de cartes Anki. Téléchargez votre fichier .apkg et chaque carte devient un exercice de frappe. Suivez votre WPM, précision et niveau de maîtrise.",
    homeFaq2Q: 'typee est-il gratuit ?',
    homeFaq2A: "Oui. Le plan gratuit inclut 1 deck (jusqu'à 100 cartes), tous les modes de pratique, tous les thèmes et les statistiques de base. Le plan Pro (5$/mois ou 48$/an) débloque les decks illimités.",
    homeFaq3Q: 'Quelles langues typee supporte-t-il ?',
    homeFaq3A: "typee supporte toutes les langues qui fonctionnent dans Anki : japonais, coréen, chinois, espagnol, français, allemand, arabe, thaï et plus.",
    homeFaq4Q: "Ai-je besoin d'un compte Anki ?",
    homeFaq4A: "Non. typee est une app web indépendante. Vous avez juste besoin d'un fichier .apkg exporté d'Anki. Vous pouvez aussi essayer les decks de démonstration sans créer de compte.",
    homeFaq5Q: "En quoi typee est-il différent de la révision Anki normale ?",
    homeFaq5A: "Anki utilise la reconnaissance passive. typee ajoute le rappel actif par la frappe. En tapant physiquement les réponses, vous construisez une mémoire musculaire plus forte.",

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
    comingSoon: 'Bientôt disponible.',

    aboutTitle: 'À propos de typee',
    aboutMission: 'Notre mission',
    aboutMissionDesc: "typee existe pour rendre l'apprentissage par cartes plus efficace grâce au rappel actif. En transformant la révision passive en pratique de frappe, nous aidons à construire une mémoire musculaire plus forte et un suivi précis des progrès.",
    aboutStory: "L'histoire",
    aboutStoryP1: "typee est né d'une simple frustration : Anki est excellent pour la répétition espacée, mais le processus de révision est trop passif. Vous voyez une carte, pensez à la réponse, la retournez et vous auto-évaluez. Impossible de savoir si vous connaissez vraiment la réponse.",
    aboutStoryP2: "Et si vous deviez taper la réponse ? La frappe force le rappel actif — impossible de tricher. Chaque touche révèle si vous maîtrisez vraiment le contenu.",
    aboutStoryP3: "typee a été lancé en 2026 comme outil web gratuit. Téléchargez n'importe quel paquet .apkg d'Anki et commencez la pratique avec suivi WPM en temps réel, statistiques de précision et répétition espacée adaptative.",
    aboutWhyTitle: 'Pourquoi la frappe ?',
    aboutWhy1: 'Rappel actif — produire la réponse renforce la mémoire plus que la reconnaissance seule.',
    aboutWhy2: 'Mémoire musculaire — la frappe répétée construit le rappel automatique, surtout pour le vocabulaire.',
    aboutWhy3: 'Retour honnête — vous tapez correctement ou non. Plus de surestimation de confiance.',
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
    guideIntro: "typee transforme vos cartes Anki en sessions de pratique de frappe. Tapez les réponses au lieu de retourner les cartes — développez la mémoire musculaire et retenez le vocabulaire plus rapidement.",
    guideStep1Title: '1. Téléchargez votre paquet',
    guideStep1Desc: "Allez sur la page d'import et glissez-déposez votre fichier .apkg. typee analysera automatiquement vos cartes et extraira les champs recto/verso.",
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
    guideFormatsTitle: 'Formats pris en charge',
    guideFormatsDesc: "typee prend en charge les fichiers .apkg exportés depuis Anki. Vous pouvez aussi créer des paquets manuellement. Les imports CSV/TSV avec détection automatique des champs sont également pris en charge.",
    guideFaqTitle: 'FAQ',
    guideFaq1Q: 'typee est-il gratuit ?',
    guideFaq1A: "Oui ! Le plan gratuit inclut 1 paquet avec jusqu'à 100 cartes, tous les modes de pratique et les statistiques de base. Passez à Pro pour des paquets illimités.",
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
    termsSection2Desc: "typee est une application web qui convertit les cartes Anki en sessions de pratique de frappe. Nous fournissons des outils pour importer des paquets, pratiquer le vocabulaire et suivre les progrès.",
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
    privacySection1Desc: "Informations de compte (email, nom) via Google OAuth ou inscription par email. Paquets de cartes importés et données de pratique. Analyses d'utilisation de base. Les informations de paiement sont traitées par Stripe.",
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
  },
};
