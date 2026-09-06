import { Platform } from 'react-native';

const tintColorLight = '#c5573e'; // Mộc Terracotta
const tintColorDark = '#e07a63';

export const Colors = {
  light: {
    text: '#292724',
    textMuted: '#7c776e',
    background: '#f8f7f3',
    card: '#ffffff',
    tint: tintColorLight,
    icon: '#7c776e',
    tabIconDefault: '#9c978d',
    tabIconSelected: tintColorLight,
    border: '#e6decb',
    primary: '#c5573e',
    primaryLight: '#faece8',
    primaryDark: '#a8452e',
    success: '#2f6844',
    successLight: '#eaf3ed',
    warning: '#b26a1b',
    warningLight: '#fcf4e8',
    danger: '#d32f2f',
    dangerLight: '#fde8e8',
    sandDark: '#ebe4d3',
  },
  dark: {
    text: '#f8f7f3',
    textMuted: '#a8a296',
    background: '#1a1917',
    card: '#292724',
    tint: tintColorDark,
    icon: '#a8a296',
    tabIconDefault: '#6e6a62',
    tabIconSelected: tintColorDark,
    border: '#3d3933',
    primary: '#e07a63',
    primaryLight: '#3a2622',
    primaryDark: '#c5573e',
    success: '#4caf50',
    successLight: '#1e3323',
    warning: '#ffb74d',
    warningLight: '#382a15',
    danger: '#ef5350',
    dangerLight: '#3d1c1c',
    sandDark: '#36332d',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "'DM Sans', system-ui, -apple-system, sans-serif",
    serif: "'Fraunces', Georgia, serif",
    rounded: "'DM Sans', sans-serif",
    mono: "monospace",
  },
});
