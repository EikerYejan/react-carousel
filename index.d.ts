import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string
      primary: string
      secondary: string
      accent: string
      error: string
      warning: string
      info: string
    }
  }
}
