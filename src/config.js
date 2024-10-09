export const DASHBOARD_PATH = '/dashboard/default';
export const HORIZONTAL_MAX_ITEM = 7;

export const MenuOrientation = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

export const ThemeMode = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const ThemeDirection = {
  LTR: 'ltr',
  RTL: 'rtl'
};

const config = {
  menuOrientation: MenuOrientation.VERTICAL,
  miniDrawer: false,
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 5,
  outlinedFilled: true,
  mode: ThemeMode.LIGHT,
  presetColor: 'theme2',
  i18n: 'en',
  themeDirection: ThemeDirection.LTR,
  container: false
};

export default config;
