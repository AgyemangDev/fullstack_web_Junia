import { useEffect } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { Row, Col } from 'antd'
import Search from './Search'
import { CreateBookButton } from './CreateBookButton'


export function BookList() {
  const { books, loadBooks, createBook } = useBookProvider()


  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  return (
    <>
      {/* Top bar with search and create */}
      <Row
        justify="space-between"
        align="middle"
        gutter={[16, 16]}
        style={{ padding: '1rem' }}
      >
        <Col flex="auto">
          <Search />
        </Col>

        <Col>
         <CreateBookButton onCreate={createBook} />
        </Col>
      </Row>

      {/* Book list */}
      <Row gutter={[16, 16]} style={{ padding: '0 .5rem' }}>
        {books.map(book => (
          <Col
            key={book.id}
            xs={24} // mobile: 1 per row
            sm={12} // small screens: 2 per row
            md={8} // medium screens: 3 per row
            lg={6} // large screens: 4 per row
          >
            <BookListItem book={book} />
          </Col>
        ))}
      </Row>
    </>
  )
}
