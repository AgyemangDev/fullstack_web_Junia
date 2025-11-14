import { Outlet } from '@tanstack/react-router'
import { BookList } from '../components/BookList'

export function BooksPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <BookList />
      <Outlet />
    </div>
  )
}
