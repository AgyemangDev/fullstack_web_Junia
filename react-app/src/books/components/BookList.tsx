import { useEffect, useState } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { Row, Col, Select, Space, Typography } from 'antd'
import Search from './Search'
import { CreateBookButton } from './CreateBookButton'
import { BookGenre, type BookModel } from '../BookModel'
import { useAuth } from '../../auth/AuthContext'
import { useThemeColors } from '../../hooks/useThemeColors'

const { Title } = Typography

export function BookList() {
  const { books, loadBooks, createBook } = useBookProvider()
  const { user } = useAuth()
  const colors = useThemeColors()
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
    void loadBooks()
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
            color: '#ffffff',
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
              style={{
                marginRight: '8px',
                fontSize: '1rem',
                fontWeight: 500,
                color: colors.text,
              }}
            >
              Genre:
            </span>
            <Select
              placeholder="All genres"
              allowClear
              style={{ width: 200 }}
              value={selectedGenre}
              onChange={setSelectedGenre}
              popupMatchSelectWidth={false}
              optionLabelProp="label"
              getPopupContainer={trigger => trigger.parentElement}
            >
              <Select.Option value="">
                <span style={{ color: colors.text }}>All genres</span>
              </Select.Option>
              {Object.entries(BookGenre).map(([key, value]) => (
                <Select.Option key={key} value={value}>
                  <span style={{ color: colors.text }}>{value}</span>
                </Select.Option>
              ))}
            </Select>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Space>
            <span
              style={{
                marginRight: '8px',
                fontSize: '1rem',
                fontWeight: 500,
                color: colors.text,
              }}
            >
              Availability:
            </span>
            <Select
              placeholder="All"
              allowClear
              style={{ width: 150 }}
              value={availableFilter}
              onChange={setAvailableFilter}
              popupMatchSelectWidth={false}
              getPopupContainer={trigger => trigger.parentElement}
            >
              <Select.Option value={true}>
                <span style={{ color: colors.text }}>Available</span>
              </Select.Option>
              <Select.Option value={false}>
                <span style={{ color: colors.text }}>Borrowed</span>
              </Select.Option>
            </Select>
          </Space>
        </Col>
      </Row>

      {/* Book list */}
      {filteredBooks.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: '#ffffff' }}>No books found</p>
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

      <style>{`
        /* Select input styling */
        .ant-select-selector {
          background-color: ${colors.inputBg} !important;
          border-color: ${colors.border} !important;
        }
        .ant-select-selection-item {
          color: ${colors.text} !important;
        }
        .ant-select-arrow {
          color: ${colors.text} !important;
        }
        .ant-select-clear {
          color: ${colors.text} !important;
        }
        
        /* Dropdown menu */
        .ant-select-dropdown {
          background-color: ${colors.cardBg} !important;
        }
        
        /* All select items */
        .ant-select-item {
          background-color: ${colors.cardBg} !important;
          color: ${colors.text} !important;
        }
        
        /* Option items */
        .ant-select-item-option {
          background-color: ${colors.cardBg} !important;
          color: ${colors.text} !important;
        }
        
        /* Hover state */
        .ant-select-item-option:hover {
          background-color: ${colors.lightBg} !important;
        }
        
        /* Selected state */
        .ant-select-item-option-selected {
          background-color: ${colors.lightBg} !important;
          color: ${colors.text} !important;
        }
        
        .ant-select-item-option-selected:hover {
          background-color: ${colors.lightBg} !important;
        }
        
        /* Active state */
        .ant-select-item-option-active {
          background-color: ${colors.lightBg} !important;
          color: ${colors.text} !important;
        }
      `}</style>
    </>
  )
}
