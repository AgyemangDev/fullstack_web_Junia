import { useEffect, useState } from 'react'
import { Button, Popconfirm, message, Typography } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  useAuthorProvider,
  type Author,
  type UpdateAuthor,
} from '../providers/useAuthorProvider'
import AuthorFormModal from '../components/AuthorFormModal'

const { Title, Text } = Typography

export const AuthorDetails = ({ id }: { id: string }) => {
  const { authors, loadAuthors, updateAuthor, deleteAuthor } =
    useAuthorProvider()
  const [author, setAuthor] = useState<Author | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadAuthors()
  }, [loadAuthors])

  useEffect(() => {
    const found = authors.find(a => a.id === id)
    if (found) setAuthor(found)
  }, [authors, id])

  const handleUpdate = async (values: UpdateAuthor) => {
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

  if (!author) return <p>Loading author details...</p>

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
