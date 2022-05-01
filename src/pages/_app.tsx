import React, { useState } from 'react'
import { AppProps } from 'next/app'
import { ThemeContext } from '../data/context/ThemeContext'
import { ThemeProvider } from 'styled-components'
import { themeDark, themeLight } from '../styles/theme'
import GlobalStyle from '../styles/global'
import { AuthProvider } from '../data/context/AuthContext'

type Theme = 'dark' | ''

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState<Theme>('dark')

  function changeTheme() {
    setTheme(theme === '' ? 'dark' : '')
  }

  return (
    <AuthProvider>
      <ThemeContext.Provider
        value={{
          theme: theme,
          changeTheme
        }}
      >
        <ThemeProvider
          theme={theme && theme === 'dark' ? themeDark : themeLight}
        >
          <Component {...pageProps} />
          <GlobalStyle />
        </ThemeProvider>
      </ThemeContext.Provider>
    </AuthProvider>
  )
}

export default MyApp
