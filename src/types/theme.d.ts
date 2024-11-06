/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components'

type ThemeType = {
  informative: { danger: string }
  background: {
    default: string
  }
  primary: {
    main: string
  }
  secondary: {
    main: string
  }
  text: {
    primary: string
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

declare module 'react' {
  interface DOMAttributes<T> {
    css?: CSSProp
  }
}
