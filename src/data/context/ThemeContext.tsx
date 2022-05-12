import { createContext } from 'react'

type ThemeContextProps = {
  theme: string
  changeTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps | null>(null)
