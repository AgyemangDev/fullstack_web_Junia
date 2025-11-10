import { useEffect, useState } from 'react'
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
  Typography,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useAuthorProvider } from '../providers/useAuthorProvider'
import { useAuth } from '../../auth/AuthContext'
import { useThemeColors } from '../../hooks/useThemeColors'

const { Text } = Typography

export function AuthorsPage() {
  const { authors, loadAuthors, createAuthor, updateAuthor, deleteAuthor } =
    useAuthorProvider()
  const { user } = useAuth()
  const colors = useThemeColors()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<{
    id: string
    firstName: string
    lastName: string
    biography?: string
    nationality?: string
    photo?: string
  } | null>(null)
  const [form] = Form.useForm()

  // Check if user is librarian
  const isLibrarian = user?.role === 'librarian'

  useEffect(() => {
    void loadAuthors()
  }, [loadAuthors])

  const handleCreate = () => {
    setEditingAuthor(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleEdit = (author: {
    id: string
    firstName: string
    lastName: string
    biography?: string
    nationality?: string
    photo?: string
  }) => {
    setEditingAuthor(author)
    form.setFieldsValue(author)
    setIsModalOpen(true)
  }

  const handleSubmit = async (values: {
    firstName: string
    lastName: string
    biography?: string
    nationality?: string
    photo?: string
  }) => {
    try {
      if (editingAuthor) {
        await updateAuthor(editingAuthor.id, values)
        message.success('Author updated successfully')
      } else {
        await createAuthor(values)
        message.success('Author created successfully')
      }
      setIsModalOpen(false)
      form.resetFields()
    } catch {
      message.error('Error saving')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteAuthor(id)
      message.success('Author deleted successfully')
    } catch {
      message.error('Error deleting')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.headerBgGradient,
        padding: '2.5rem',
        color: colors.text,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
          gap: '1rem',
        }}
      >
        <div>
          <h1
            style={{
              color: '#ffffff',
              fontSize: '2.8rem',
              fontWeight: 700,
              margin: 0,
            }}
          >
            Author Management
          </h1>
          <p style={{ color: '#ffffff', margin: '0.5rem 0 0 0' }}>
            Manage library authors and their information
          </p>
        </div>
        {isLibrarian && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            size="large"
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.primary,
              fontWeight: 600,
            }}
          >
            Add an Author
          </Button>
        )}
      </div>

      <Row gutter={[16, 16]}>
        {authors.map(author => (
          <Col key={author.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                borderRadius: '12px',
                boxShadow: `0 4px 12px ${colors.shadow}`,
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
                border: `1px solid ${colors.border}`,
              }}
              cover={
                author.photo ? (
                  <img
                    alt={author.firstName}
                    src={author.photo}
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
                      background: colors.gradientBg,
                      borderRadius: '12px 12px 0 0',
                    }}
                  >
                    <UserOutlined
                      style={{
                        fontSize: 64,
                        color: 'rgba(255, 255, 255, 0.3)',
                      }}
                    />
                  </div>
                )
              }
              actions={
                isLibrarian
                  ? [
                      <Button
                        key="edit"
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(author)}
                        style={{ color: colors.primary }}
                      >
                        Edit
                      </Button>,
                      <Popconfirm
                        key="delete"
                        title="Delete author"
                        description="Are you sure you want to delete this author?"
                        onConfirm={() => handleDelete(author.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="text" danger icon={<DeleteOutlined />}>
                          Delete
                        </Button>
                      </Popconfirm>,
                    ]
                  : []
              }
            >
              <Card.Meta
                title={
                  <div
                    style={{
                      color: colors.text,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                  >
                    {`${author.firstName} ${author.lastName}`}
                  </div>
                }
                description={
                  <div>
                    {author.nationality && (
                      <Text
                        style={{
                          fontSize: '0.95rem',
                          color: colors.textSecondary,
                        }}
                      >
                        {author.nationality}
                      </Text>
                    )}
                    {author.biography && (
                      <div style={{ marginTop: '8px' }}>
                        <Text
                          ellipsis
                          style={{
                            fontSize: '0.9rem',
                            color: colors.textSecondary,
                          }}
                        >
                          {author.biography}
                        </Text>
                      </div>
                    )}
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={
          <div style={{ color: colors.text }}>
            {editingAuthor ? 'Edit Author' : 'Create Author'}
          </div>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
          form.resetFields()
        }}
        onOk={() => form.submit()}
        okText={editingAuthor ? 'Update' : 'Create'}
        okButtonProps={{
          style: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
          },
        }}
        styles={{
          content: {
            backgroundColor: colors.cardBg,
            color: colors.text,
          },
          header: {
            backgroundColor: colors.cardBg,
            borderBottom: `1px solid ${colors.border}`,
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label={<span style={{ color: colors.text }}>First Name</span>}
            name="firstName"
            rules={[{ required: true, message: 'First name is required' }]}
          >
            <Input
              style={{
                backgroundColor: colors.inputBg,
                color: colors.text,
                borderColor: colors.border,
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: colors.text }}>Last Name</span>}
            name="lastName"
            rules={[{ required: true, message: 'Last name is required' }]}
          >
            <Input
              style={{
                backgroundColor: colors.inputBg,
                color: colors.text,
                borderColor: colors.border,
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: colors.text }}>Nationality</span>}
            name="nationality"
          >
            <Input
              placeholder="Ex: French"
              style={{
                backgroundColor: colors.inputBg,
                color: colors.text,
                borderColor: colors.border,
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: colors.text }}>Biography</span>}
            name="biography"
          >
            <Input.TextArea
              rows={4}
              placeholder="Author biography..."
              style={{
                backgroundColor: colors.inputBg,
                color: colors.text,
                borderColor: colors.border,
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: colors.text }}>Photo URL</span>}
            name="photo"
          >
            <Input
              placeholder="https://..."
              style={{
                backgroundColor: colors.inputBg,
                color: colors.text,
                borderColor: colors.border,
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      <style>{`
        .ant-card {
          background-color: ${colors.cardBg} !important;
          border-color: ${colors.border} !important;
        }
        .ant-card-head {
          background-color: ${colors.cardBg} !important;
          border-color: ${colors.border} !important;
        }
        .ant-input,
        .ant-input-textarea textarea {
          background-color: ${colors.inputBg} !important;
          color: ${colors.text} !important;
          border-color: ${colors.border} !important;
        }
        .ant-input::placeholder,
        .ant-input-textarea textarea::placeholder {
          color: ${colors.textSecondary} !important;
        }
      `}</style>
    </div>
  )
}
