import { DefaultTheme } from 'styled-components'

export const themeColor =
  (key: keyof DefaultTheme['colors']) =>
  ({ theme }: { theme: DefaultTheme }) => {
    return theme.colors?.[key]
  }

export const theme: DefaultTheme = {
  colors: {
    white: '#fff',
    primary: '#00bcd4',
    secondary: '#ff9800',
    accent: '#ff5722',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
  },
}
