import { Outlet } from '@tanstack/react-router'
import { useThemeColors } from '../../hooks/useThemeColors'
import { BookList } from '../components/BookList'

export function BooksPage() {
  const colors = useThemeColors()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.headerBgGradient,
        color: colors.text,
      }}
    >
      <BookList />
      <Outlet />
    </div>
  )
}
