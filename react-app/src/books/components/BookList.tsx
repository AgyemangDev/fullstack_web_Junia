import { useEffect, useState } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { Row, Col, Select, Space, Typography } from 'antd'
import Search from './Search'
import { CreateBookButton } from './CreateBookButton'
import { BookGenre, type BookModel } from '../BookModel'
import { useAuth } from '../../auth/AuthContext'

const { Title } = Typography

export function BookList() {
  const { books, loadBooks, createBook } = useBookProvider()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(
    undefined,
  )
  const [availableFilter, setAvailableFilter] = useState<boolean | undefined>(
    undefined,
  )

  // Vérifier si l'utilisateur est bibliothécaire
  const isLibrarian = user?.role === 'librarian'

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  // Filtrer les livres selon la recherche, le genre et la disponibilité
  const filteredBooks = books.filter((book: BookModel) => {
    const matchesSearch =
      searchTerm === '' ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${book.author.firstName} ${book.author.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    // Gérer le cas où selectedGenre est une chaîne vide (tous les genres)
    const matchesGenre =
      !selectedGenre || selectedGenre === '' || book.genre === selectedGenre

    const matchesAvailability =
      availableFilter === undefined || book.isAvailable === availableFilter

    return matchesSearch && matchesGenre && matchesAvailability
  })

  return (
    <>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          padding: '2rem 2rem 0 2rem',
        }}
      >
        <Title
          level={2}
          style={{
            color: '#395E66',
            fontSize: '2.5rem',
            fontWeight: 600,
            margin: 0,
          }}
        >
          Book Catalog
        </Title>
        {isLibrarian && <CreateBookButton onCreate={createBook} />}
      </div>

      {/* Top bar with search and filters */}
      <Row
        justify="space-between"
        align="middle"
        gutter={[16, 16]}
        style={{ padding: '0 2rem 1rem 2rem' }}
      >
        <Col flex="auto">
          <Search onSearch={setSearchTerm} />
        </Col>
      </Row>

      {/* Filters */}
      <Row gutter={[16, 16]} style={{ padding: '0 2rem 1rem 2rem' }}>
        <Col xs={24} sm={12} md={8}>
          <Space>
            <span
              style={{ marginRight: '8px', fontSize: '1rem', fontWeight: 500 }}
            >
              Genre:
            </span>
            <Select
              placeholder="All genres"
              allowClear
              style={{ width: 200 }}
              value={selectedGenre}
              onChange={setSelectedGenre}
            >
              <Select.Option value="">All genres</Select.Option>
              {Object.entries(BookGenre).map(([key, value]) => (
                <Select.Option key={key} value={value}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Space>
            <span
              style={{ marginRight: '8px', fontSize: '1rem', fontWeight: 500 }}
            >
              Availability:
            </span>
            <Select
              placeholder="All"
              allowClear
              style={{ width: 150 }}
              value={availableFilter}
              onChange={setAvailableFilter}
            >
              <Select.Option value={true}>Available</Select.Option>
              <Select.Option value={false}>Borrowed</Select.Option>
            </Select>
          </Space>
        </Col>
      </Row>

      {/* Book list */}
      {filteredBooks.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>No books found</p>
        </div>
      ) : (
        <Row gutter={[16, 16]} style={{ padding: '0 1.5rem 2rem 1.5rem' }}>
          {filteredBooks.map((book: BookModel) => (
            <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
              <BookListItem book={book} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}
