import { useEffect, useState } from 'react'
import { Button, Popconfirm, message, Typography, List } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  useAuthorProvider,
  type Author,
  type Book,
  type CreateAuthor,
} from '../providers/useAuthorProvider'
import AuthorFormModal from '../components/AuthorFormModal'
import { BookListItem } from '../../books/components/BookListItem'
import type { BookModel } from '../../books/BookModel'

const { Title, Text } = Typography

export const AuthorDetails = ({ id }: { id: string }) => {
  const { authors, loadAuthors, updateAuthor, deleteAuthor, getBooksByAuthor } =
    useAuthorProvider()
  const [author, setAuthor] = useState<Author | null>(null)
  const [books, setBooks] = useState<BookModel[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        await loadAuthors()
        const apiBooks = await getBooksByAuthor(id)
        const foundAuthor = authors.find(a => a.id === id)

        const mappedBooks: BookModel[] = apiBooks.map((b: Book) => ({
          id: b.id,
          title: b.title,
          genre: (b.genre as BookModel['genre']) || 'Fiction',
          yearPublished: b.publicationYear || 0,
          photoUrl: b.cover || '',
          description: '',
          isAvailable: true,
          numberOfBooks: 1,
          author: foundAuthor
            ? {
                id: foundAuthor.id,
                firstName: foundAuthor.firstName,
                lastName: foundAuthor.lastName,
                biography: foundAuthor.biography || '',
                nationality: foundAuthor.nationality || '',
              }
            : {
                id: '',
                firstName: '',
                lastName: '',
                biography: '',
                nationality: '',
              },
        }))
        setBooks(mappedBooks)
      } catch (err) {
        console.error(err)
        message.error('Error loading author details')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    const found = authors.find(a => a.id === id)
    if (found) setAuthor(found)
  }, [authors, id])

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

  if (loading) return <p>Loading author details...</p>
  if (!author) return <p>Author not found</p>

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={3}>{`${author.firstName} ${author.lastName}`}</Title>
      {author.nationality && <Text type="secondary">{author.nationality}</Text>}
      {author.biography && (
        <p style={{ marginTop: '1rem' }}>{author.biography}</p>
      )}
      {author.photo && (
        <img
          src={author.photo}
          alt={`${author.firstName} ${author.lastName}`}
          style={{ marginTop: '1rem', maxWidth: '200px', borderRadius: '8px' }}
        />
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

      <div style={{ marginTop: '2rem' }}>
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
