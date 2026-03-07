// ── Theme Definitions Registry ──

export type ThemeId =
  | 'dark'
  | 'light'
  | 'dracula'
  | 'nord'
  | 'solarized-dark'
  | 'catppuccin-mocha'
  | 'gruvbox'
  | 'tokyo-night'
  | 'one-dark'
  | 'rose-pine';

export interface ThemeColors {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  correct: string;
  incorrect: string;
}

export interface ThemeDefinition {
  id: ThemeId;
  nameKey: string; // translation key
  colors: ThemeColors;
}

export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

export const FONT_SIZE_MAP: Record<FontSize, string> = {
  small: '1rem',
  medium: '1.25rem',
  large: '1.5rem',
  xlarge: '2rem',
};

export const THEMES: ThemeDefinition[] = [
  {
    id: 'dark',
    nameKey: 'themeDark',
    colors: {
      bg: '#202124',
      surface: '#292A2D',
      surface2: '#3C4043',
      border: '#5F6368',
      text: '#E8EAED',
      muted: '#9AA0A6',
      accent: '#BD93F9',
      correct: '#4ADE80',
      incorrect: '#F87171',
    },
  },
  {
    id: 'light',
    nameKey: 'themeLight',
    colors: {
      bg: '#FFFFFF',
      surface: '#F1F3F4',
      surface2: '#E8EAED',
      border: '#DADCE0',
      text: '#202124',
      muted: '#5F6368',
      accent: '#7C3AED',
      correct: '#16A34A',
      incorrect: '#DC2626',
    },
  },
  {
    id: 'dracula',
    nameKey: 'themeDracula',
    colors: {
      bg: '#282A36',
      surface: '#343746',
      surface2: '#44475A',
      border: '#6272A4',
      text: '#F8F8F2',
      muted: '#6272A4',
      accent: '#BD93F9',
      correct: '#50FA7B',
      incorrect: '#FF5555',
    },
  },
  {
    id: 'nord',
    nameKey: 'themeNord',
    colors: {
      bg: '#2E3440',
      surface: '#3B4252',
      surface2: '#434C5E',
      border: '#4C566A',
      text: '#ECEFF4',
      muted: '#D8DEE9',
      accent: '#88C0D0',
      correct: '#A3BE8C',
      incorrect: '#BF616A',
    },
  },
  {
    id: 'solarized-dark',
    nameKey: 'themeSolarized',
    colors: {
      bg: '#002B36',
      surface: '#073642',
      surface2: '#0A4050',
      border: '#586E75',
      text: '#FDF6E3',
      muted: '#839496',
      accent: '#268BD2',
      correct: '#859900',
      incorrect: '#DC322F',
    },
  },
  {
    id: 'catppuccin-mocha',
    nameKey: 'themeCatppuccin',
    colors: {
      bg: '#1E1E2E',
      surface: '#313244',
      surface2: '#45475A',
      border: '#585B70',
      text: '#CDD6F4',
      muted: '#A6ADC8',
      accent: '#CBA6F7',
      correct: '#A6E3A1',
      incorrect: '#F38BA8',
    },
  },
  {
    id: 'gruvbox',
    nameKey: 'themeGruvbox',
    colors: {
      bg: '#282828',
      surface: '#3C3836',
      surface2: '#504945',
      border: '#665C54',
      text: '#EBDBB2',
      muted: '#A89984',
      accent: '#FE8019',
      correct: '#B8BB26',
      incorrect: '#FB4934',
    },
  },
  {
    id: 'tokyo-night',
    nameKey: 'themeTokyoNight',
    colors: {
      bg: '#1A1B26',
      surface: '#24283B',
      surface2: '#2F3549',
      border: '#3B4261',
      text: '#C0CAF5',
      muted: '#565F89',
      accent: '#7AA2F7',
      correct: '#9ECE6A',
      incorrect: '#F7768E',
    },
  },
  {
    id: 'one-dark',
    nameKey: 'themeOneDark',
    colors: {
      bg: '#282C34',
      surface: '#2C313C',
      surface2: '#363C49',
      border: '#4B5263',
      text: '#ABB2BF',
      muted: '#636D83',
      accent: '#61AFEF',
      correct: '#98C379',
      incorrect: '#E06C75',
    },
  },
  {
    id: 'rose-pine',
    nameKey: 'themeRosePine',
    colors: {
      bg: '#191724',
      surface: '#1F1D2E',
      surface2: '#26233A',
      border: '#403D52',
      text: '#E0DEF4',
      muted: '#908CAA',
      accent: '#C4A7E7',
      correct: '#9CCFD8',
      incorrect: '#EB6F92',
    },
  },
];

export function getThemeById(id: ThemeId): ThemeDefinition {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

/** Apply theme colors as CSS custom properties on <html> */
export function applyTheme(id: ThemeId): void {
  const theme = getThemeById(id);
  const root = document.documentElement;
  root.setAttribute('data-theme', id);
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

/** Check if a theme has a light background */
export function isLightTheme(id: ThemeId): boolean {
  return id === 'light';
}
