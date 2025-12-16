import type { availableThemeColors } from './constants';

export type ThemeAppearance = 'inherit' | 'light' | 'dark';

export type ThemeColor = (typeof availableThemeColors)[number];

export type ThemeSetting = {
  appearance: ThemeAppearance;
  accentColor: ThemeColor;
};

export type UserSettings = { id: 'user-settings'; theme: ThemeSetting };
