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
    deckLimitReached: 'Free plan limit reached (3 decks). Upgrade to Pro for unlimited decks.',

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
    deckLimitReached: '무료 플랜 한도 도달 (3개 덱). Pro로 업그레이드하면 무제한입니다.',

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
    deckLimitReached: '無料プランの上限です（3デッキ）。Proにアップグレードで無制限。',

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
    deckLimitReached: 'Límite del plan gratuito (3 mazos). Mejora a Pro para mazos ilimitados.',

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
    deckLimitReached: '已达免费计划上限（3个牌组）。升级至Pro享无限牌组。',

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
    deckLimitReached: 'Limite du plan gratuit atteinte (3 decks). Passez à Pro pour des decks illimités.',

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
  },
};
