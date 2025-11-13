import { useEffect, useState } from 'react'
import { Button, Popconfirm, message, Typography, List, Spin } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  useAuthorProvider,
  type Author,
  type CreateAuthor,
} from '../providers/useAuthorProvider'
import AuthorFormModal from '../components/AuthorFormModal'
import { BookListItem } from '../../books/components/BookListItem'
import type { BookModel } from '../../books/BookModel'

const { Title, Text } = Typography

export const AuthorDetails = ({ id }: { id: string }) => {
  const { loadAuthors, updateAuthor, deleteAuthor, getBooksByAuthor } =
    useAuthorProvider()

  const [author, setAuthor] = useState<Author | null>(null)
  const [books, setBooks] = useState<BookModel[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const loadedAuthors = await loadAuthors()
        const foundAuthor = loadedAuthors.find(a => a.id === id)

        if (!foundAuthor) {
          message.error('Author not found')
          return
        }

        setAuthor(foundAuthor)

        const apiBooks = await getBooksByAuthor(id)
        setBooks(apiBooks)
      } catch (err) {
        console.error('Error loading author details:', err)
        message.error('Error loading author details')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleUpdate = async (values: CreateAuthor) => {
    try {
      await updateAuthor(id, values)
      message.success('Author updated successfully')
      setIsModalOpen(false)
    } catch {
      message.error('Error updating author')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteAuthor(id)
      message.success('Author deleted successfully')
    } catch {
      message.error('Error deleting author')
    }
  }

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <Spin size="large" tip="Loading author details..." />
      </div>
    )

  if (!author) return <p style={{ textAlign: 'center' }}>Author not found.</p>

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {author.photo && (
          <img
            src={author.photo}
            alt={`${author.firstName} ${author.lastName}`}
            style={{
              maxWidth: '200px',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            }}
          />
        )}

        <div>
          <Title level={3}>{`${author.firstName} ${author.lastName}`}</Title>
          {author.nationality && (
            <Text type="secondary">{author.nationality}</Text>
          )}
          {author.biography && (
            <p style={{ marginTop: '1rem', maxWidth: 600 }}>
              {author.biography}
            </p>
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => setIsModalOpen(true)}
              style={{ marginRight: '1rem' }}
            >
              Edit
            </Button>

            <Popconfirm
              title="Delete author?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <Title level={4}>Books by this author</Title>
        {books.length === 0 ? (
          <Text type="secondary">No books found for this author.</Text>
        ) : (
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={books}
            renderItem={book => (
              <List.Item>
                <BookListItem book={book} />
              </List.Item>
            )}
          />
        )}
      </div>

      <AuthorFormModal
        open={isModalOpen}
        title="Edit Author"
        initialValues={author}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleUpdate}
        okText="Update"
      />
    </div>
  )
}

export default AuthorDetails
