import { createContext } from 'react'

type Theme = 'dark' | ''

type ThemeContextProps = {
  theme: Theme
  changeTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps | null>(null)
