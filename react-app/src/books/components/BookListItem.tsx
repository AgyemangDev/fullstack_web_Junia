import type { BookModel } from '../BookModel'
import { Card, Badge, Typography } from 'antd'
import { BookOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

const { Text } = Typography

interface BookListItemProps {
  book: BookModel
}

export function BookListItem({ book }: BookListItemProps) {
  return (
    <Link
      to={`/books/$bookId`}
      params={{ bookId: book.id }}
      style={{ textDecoration: 'none' }}
    >
      <Card
        hoverable
        styles={{ body: { padding: 0 } }}
        style={{
          overflow: 'hidden',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
      >
        <div style={{ position: 'relative', height: 300 }}>
          {/* Book Cover Image */}
          {book.photoUrl ? (
            <img
              src={book.photoUrl}
              alt={book.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #395E66 0%, #2a4850 100%)',
                color: '#999',
              }}
            >
              <BookOutlined
                style={{ fontSize: 48, color: 'rgba(255, 255, 255, 0.3)' }}
              />
            </div>
          )}

          {/* Availability Badge at Top */}
          <Badge.Ribbon
            text={book.isAvailable ? 'Available' : 'Borrowed'}
            color={book.isAvailable ? 'green' : 'red'}
            style={{ top: 10, right: -5 }}
          />

          {/* Text Overlay at Bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)',
              padding: '40px 16px 16px',
              color: 'white',
            }}
          >
            <Text
              strong
              style={{
                fontSize: 18,
                color: 'white',
                display: 'block',
                marginBottom: 8,
              }}
            >
              {book.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.9)',
                display: 'block',
              }}
            >
              {book.author.firstName} {book.author.lastName}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.7)',
                display: 'block',
              }}
            >
              {book.genre} • {book.yearPublished}
            </Text>
          </div>
        </div>
      </Card>
    </Link>
  )
}
