import { useTheme } from '../contexts/ThemeContext'

export function useThemeColors() {
  const { isDarkMode } = useTheme()

  return {
    bg: isDarkMode ? '#0a0e27' : '#ffffff',
    cardBg: isDarkMode ? '#1f1f1f' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#1a1a1a',
    textSecondary: isDarkMode ? '#b3b3b3' : '#666666',
    headerText: isDarkMode ? '#ffffff' : '#1a1a1a',
    primary: '#395E66',
    primaryColor: '#395E66',
    border: isDarkMode ? '#434343' : '#e0e0e0',
    shadow: isDarkMode ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.08)',
    lightBg: isDarkMode ? '#2a2a2a' : '#f5f7fa',
    inputBg: isDarkMode ? '#2a2a2a' : '#ffffff',
    headerBgGradient: isDarkMode
      ? 'linear-gradient(to bottom, #0a0e27 0%, #1a1a2e 100%)'
      : 'linear-gradient(to bottom, #395E66 0%, #2a4850 100%)',
    gradientBg: isDarkMode
      ? 'linear-gradient(135deg, #1f1f1f 0%, #0a0e27 100%)'
      : 'linear-gradient(135deg, #395E66 0%, #2a4850 100%)',
  }
}
