import { useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import { Card, Col, Row, Button } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface BookListItemProps {
  book: BookModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function BookListItem({ book, onDelete, onUpdate }: BookListItemProps) {
  const [title, setTitle] = useState(book.title)
  const [isEditing, setIsEditing] = useState(false)

  const onCancelEdit = () => {
    setIsEditing(false)
    setTitle(book.title)
  }

  const onValidateEdit = () => {
    onUpdate(book.id, { title })
    setIsEditing(false)
  }

  return (
    <Card
      title={
        isEditing ? (
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: '100%' }}
          />
        ) : (
          <Link to={`/books/$bookId`} params={{ bookId: book.id }}>
            {book.title} - {book.yearPublished}
          </Link>
        )
      }
      style={{ width: '100%', marginBottom: '1rem' }}
      actions={[
        isEditing ? (
          <>
            <Button type="primary" onClick={onValidateEdit}>
              <CheckOutlined />
            </Button>
            <Button onClick={onCancelEdit}>
              <CloseOutlined />
            </Button>
          </>
        ) : (
          <Button type="primary" onClick={() => setIsEditing(true)}>
            <EditOutlined />
          </Button>
        ),
        // eslint-disable-next-line react/jsx-key
        <Button type="primary" danger onClick={() => onDelete(book.id)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <p>
        <strong>Author:</strong> {book.author.firstName} {book.author.lastName}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>Available:</strong> {book.isAvailable ? 'Yes' : 'No'}
      </p>
    </Card>
  )
}

interface BookListProps {
  books: BookModel[]
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function BookList({ books, onDelete, onUpdate }: BookListProps) {
  return (
    <Row gutter={[16, 16]}>
      {books.map(book => (
        <Col
          key={book.id}
          xs={12} // mobile: 2 per row
          sm={12} // small screens: 2 per row
          md={6} // medium+ screens: 4 per row
        >
          <BookListItem book={book} onDelete={onDelete} onUpdate={onUpdate} />
        </Col>
      ))}
    </Row>
  )
}
