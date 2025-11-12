import { useEffect, useState } from 'react'
import { Button, Card, Row, Col, Typography, message } from 'antd'
import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import {
  useAuthorProvider,
  type CreateAuthor,
} from '../providers/useAuthorProvider'
import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from '@tanstack/react-router'
import AuthorFormModal from '../components/AuthorFormModal'

const { Title, Text } = Typography

export function AuthorsPage() {
  const navigate = useNavigate()
  const { authors, loadAuthors, createAuthor } = useAuthorProvider()
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isLibrarian = user?.role === 'librarian'

  useEffect(() => {
    loadAuthors()
  }, [loadAuthors])

  const handleCreate = async (values: CreateAuthor) => {
    try {
      await createAuthor(values)
      message.success('Author added successfully')
      setIsModalOpen(false)
    } catch {
      message.error('Error adding author')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <Title
          level={2}
          style={{ color: '#395E66', fontSize: '2.5rem', fontWeight: 600 }}
        >
          Author Management
        </Title>

        {isLibrarian && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            size="large"
            style={{ backgroundColor: '#395E66', borderColor: '#395E66' }}
          >
            Add Author
          </Button>
        )}
      </div>

      <Row gutter={[16, 16]}>
        {authors.map(author => (
          <Col key={author.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              onClick={() => navigate({ to: `/authors/${author.id}` })}
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              cover={
                author.photo ? (
                  <img
                    src={author.photo}
                    alt={`${author.firstName} ${author.lastName}`}
                    style={{
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: '12px 12px 0 0',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        'linear-gradient(135deg, #395E66 0%, #2a4850 100%)',
                      borderRadius: '12px 12px 0 0',
                    }}
                  >
                    <UserOutlined
                      style={{ fontSize: 64, color: 'rgba(255,255,255,0.3)' }}
                    />
                  </div>
                )
              }
            >
              <Card.Meta
                title={
                  <div style={{ color: '#395E66', fontWeight: 600 }}>
                    {author.firstName} {author.lastName}
                  </div>
                }
                description={
                  <div>
                    {author.nationality && (
                      <Text type="secondary">{author.nationality}</Text>
                    )}
                    {author.biography && (
                      <div style={{ marginTop: '8px' }}>
                        <Text ellipsis>{author.biography}</Text>
                      </div>
                    )}
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <AuthorFormModal
        open={isModalOpen}
        title="Add New Author"
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        okText="Create"
      />
    </div>
  )
}
