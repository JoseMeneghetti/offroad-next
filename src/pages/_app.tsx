import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { ThemeContext } from '../data/context/ThemeContext'
import { ThemeProvider } from 'styled-components'
import { themeDark, themeLight } from '../styles/theme'
import GlobalStyle from '../styles/global'
import { AuthProvider } from '../data/context/AuthContext'
import Menu from '../components/Menu/Menu'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState<string>('dark')

  function changeTheme() {
    const newTheme = theme === '' ? 'dark' : ''
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setTheme(savedTheme)
  }, [])

  return (
    <AuthProvider>
      <ThemeContext.Provider
        value={{
          theme,
          changeTheme
        }}
      >
        <ThemeProvider
          theme={theme && theme === 'light' ? themeLight : themeDark}
        >
          <Menu />
          <Component {...pageProps} />
          <GlobalStyle />
        </ThemeProvider>
      </ThemeContext.Provider>
    </AuthProvider>
  )
}

export default MyApp
