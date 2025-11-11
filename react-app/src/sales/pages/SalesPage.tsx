import { useEffect, useState } from 'react'
import { Card, message } from 'antd'
import { useSaleProvider } from '../providers/useSaleProvider'
import { useAuth } from '../../auth/AuthContext'
import { useBookProvider } from '../../books/providers/useBookProvider'
import { SalesHeader } from './components/SalesHeader'
import { SalesTable } from './components/SalesTable'
import { NewSaleModal } from './components/NewSaleModal'
import type { BookModel } from '../../books/BookModel'

interface NewSaleFormValues {
  buyerId: string
  bookId: string
}

export function SalesPage() {
  const { sales, loadSales, createSale, deleteSale } = useSaleProvider()
  const { books, loadBooks } = useBookProvider()
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [availableBooks, setAvailableBooks] = useState<BookModel[]>([])

  const isLibrarian = user?.role === 'librarian'

  useEffect(() => {
    void loadSales()
    void loadBooks()
  }, [loadSales, loadBooks])

  useEffect(() => {
    setAvailableBooks(books.filter(book => book.isAvailable))
  }, [books])

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteSale(id)
      message.success('Sale deleted successfully')
    } catch (error) {
      console.error('Error deleting sale:', error)
      message.error('Error deleting sale')
    }
  }

  const handleCreateSale = async (values: NewSaleFormValues): Promise<void> => {
    try {
      await createSale({
        buyerId: values.buyerId,
        bookId: values.bookId,
        saleDate: new Date().toISOString(),
      })
      message.success('Sale recorded successfully')
      setIsModalOpen(false)
      void loadSales()
      void loadBooks()
    } catch (error) {
      console.error('Error recording sale:', error)
      message.error('Error recording sale')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '2rem',
      }}
    >
      <SalesHeader onCreate={() => setIsModalOpen(true)} />
      <Card
        style={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <SalesTable
          sales={sales}
          isLibrarian={isLibrarian}
          onDelete={handleDelete}
        />
      </Card>

      <NewSaleModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableBooks={availableBooks}
        onSubmit={handleCreateSale}
      />
    </div>
  )
}
