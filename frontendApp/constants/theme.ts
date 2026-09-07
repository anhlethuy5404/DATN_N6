import { Platform } from 'react-native';

const tintColorLight = '#004ac6'; // Nexus Royal Blue
const tintColorDark = '#b4c5ff';

export const Colors = {
  light: {
    text: '#0b1c30',
    textMuted: '#737686',
    background: '#f8f9ff',
    card: '#ffffff',
    tint: tintColorLight,
    icon: '#434655',
    tabIconDefault: '#737686',
    tabIconSelected: tintColorLight,
    border: '#c3c6d7',
    primary: '#004ac6',
    primaryLight: '#dce9ff',
    primaryDark: '#00318b',
    secondary: '#712ae2',
    secondaryLight: '#eedcff',
    success: '#007d55',
    successLight: '#d1f4e0',
    warning: '#b26a1b',
    warningLight: '#fcf4e8',
    danger: '#ba1a1a',
    dangerLight: '#ffdad6',
    surfaceSubtle: '#edf1fc',
  },
  dark: {
    text: '#e2e8f8',
    textMuted: '#a8adb9',
    background: '#0a0e1a',
    card: '#131929',
    tint: tintColorDark,
    icon: '#a8adb9',
    tabIconDefault: '#6e7484',
    tabIconSelected: tintColorDark,
    border: '#2a344d',
    primary: '#b4c5ff',
    primaryLight: '#1f3560',
    primaryDark: '#004ac6',
    secondary: '#d2bbff',
    secondaryLight: '#3f1f77',
    success: '#6ddba0',
    successLight: '#0d3824',
    warning: '#ffb74d',
    warningLight: '#382a15',
    danger: '#ffb4ab',
    dangerLight: '#410002',
    surfaceSubtle: '#182035',
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
