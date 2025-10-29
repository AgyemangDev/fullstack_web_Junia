import { useEffect } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { CreateBookModal } from './CreateBookModal'
import { Row, Col } from 'antd'

export function BookList() {
  const { books, loadBooks, deleteBook, updateBook, createBook } =
    useBookProvider()

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  return (
    <>
      <CreateBookModal onCreate={createBook} />
      <Row gutter={[16, 16]} style={{ padding: '0 .5rem' }}>
        {books.map(book => (
          <Col
            key={book.id}
            xs={12} // mobile: 2 per row
            sm={12} // small screens: 2 per row
            md={6} // medium+ screens: 4 per row
          >
            <BookListItem
              book={book}
              onDelete={deleteBook}
              onUpdate={updateBook}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}
