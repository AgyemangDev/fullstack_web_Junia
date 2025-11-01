import { useEffect } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { CreateBookModal } from './CreateBookModal'
import { Row, Col, Grid } from 'antd'
import Search from './Search'
import { PlusOutlined } from '@ant-design/icons'

const { useBreakpoint } = Grid

export function BookList() {
  const { books, loadBooks, createBook } = useBookProvider()
  const screens = useBreakpoint() // Detect screen size

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
          <CreateBookModal
            onCreate={createBook}
            // If mobile (xs), show only the plus icon
            buttonProps={{
              icon: <PlusOutlined />,
              type: 'primary',
              size: screens.xs ? 'small' : 'middle',
              children: screens.xs ? null : 'Create Book',
            }}
          />
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
