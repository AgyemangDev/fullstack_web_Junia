import {
  Skeleton,
  Typography,
  Tag,
  Image,
  Badge,
  Card,
  Row,
  Col,
  Divider,
  Button,
  Space,
  Input,
} from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect, useState } from 'react'
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books/index'
import type { UpdateBookModel } from '../BookModel'
import { Modal } from 'antd'
import { EditBookButton } from '../components/EditBookButton'
import { useThemeColors } from '../../hooks/useThemeColors'

const { Title, Text, Paragraph } = Typography

interface BookDetailsProps {
  id: string
  onUpdate: (id: string, input: UpdateBookModel) => void
  onDelete: (id: string) => void
}

export const BookDetails = ({ id, onUpdate, onDelete }: BookDetailsProps) => {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id)
  const colors = useThemeColors()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (book) {
      setTitle(book.title)
    }
  }, [book])

  const handleDelete = () => {
    console.log('Opening delete confirmation for:', id)
    Modal.confirm({
      title: 'Delete book',
      content: `Are you sure you want to delete "${book?.title}"?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await onDelete(id)
        navigate({ to: booksRoute.to })
      },
    })
  }

  const handleSave = () => {
    onUpdate(id, { title })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTitle(book?.title || '')
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div
        style={{
          padding: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          background: colors.bg,
          minHeight: '100vh',
        }}
      >
        <Skeleton active />
      </div>
    )
  }

  if (!book) {
    return (
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          background: colors.bg,
          minHeight: '100vh',
          color: colors.text,
        }}
      >
        <Text>No book found.</Text>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '100vh',
        background: colors.bg,
        color: colors.text,
      }}
    >
      {/* Header with Back link and Actions */}
      <div
        style={{
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <Link
          to={booksRoute.to}
          style={{
            color: colors.primary,
            fontSize: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
          }}
        >
          <ArrowLeftOutlined /> Back to list
        </Link>

        {isEditing ? (
          <Space>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleSave}
              size="middle"
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              }}
            >
              Save
            </Button>
            <Button
              icon={<CloseOutlined />}
              onClick={handleCancel}
              size="middle"
            >
              Cancel
            </Button>
          </Space>
        ) : (
          <Space>
            <EditBookButton book={book} onUpdate={onUpdate} />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              size="middle"
            >
              Delete
            </Button>
          </Space>
        )}
      </div>

      <Row gutter={[32, 32]}>
        {/* Left Column - Book Cover */}
        <Col xs={24} md={10} lg={8}>
          <Card
            bordered
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.border,
              boxShadow: `0 4px 12px ${colors.shadow}`,
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'sticky',
              top: '2rem',
            }}
          >
            {book.photoUrl ? (
              <Image
                src={book.photoUrl}
                alt={book.title}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
                preview
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '500px',
                  background: colors.lightBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                }}
              >
                <Text style={{ color: colors.textSecondary }}>
                  No cover available
                </Text>
              </div>
            )}

            {/* Availability Badge */}
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <Badge
                status={book.isAvailable ? 'success' : 'error'}
                text={
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: book.isAvailable ? '#52c41a' : '#ff4d4f',
                    }}
                  >
                    {book.isAvailable ? (
                      <>
                        <CheckCircleOutlined /> Available
                      </>
                    ) : (
                      <>
                        <CloseCircleOutlined /> Not available
                      </>
                    )}
                  </span>
                }
              />
            </div>
          </Card>
        </Col>

        {/* Right Column - Book Details */}
        <Col xs={24} md={14} lg={16}>
          <div style={{ textAlign: 'left' }}>
            {/* Book Title */}
            {isEditing ? (
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  height: 'auto',
                  padding: '8px 12px',
                  backgroundColor: colors.inputBg,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                placeholder="Book title"
              />
            ) : (
              <Title
                level={1}
                style={{ marginBottom: '0.5rem', color: colors.primary }}
              >
                {book.title}
              </Title>
            )}

            {/* Metadata */}
            <div
              style={{
                marginBottom: '2rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <Tag
                color="blue"
                style={{ fontSize: '14px', padding: '4px 12px' }}
              >
                {book.genre}
              </Tag>
              <Text style={{ fontSize: '16px', color: colors.textSecondary }}>
                Published in {book.yearPublished}
              </Text>
            </div>

            <Divider style={{ borderColor: colors.border }} />

            {/* Description */}
            {book.description && (
              <div style={{ marginBottom: '2rem' }}>
                <Title level={4} style={{ color: colors.primary }}>
                  Description
                </Title>
                <Paragraph
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: colors.text,
                  }}
                >
                  {book.description}
                </Paragraph>
              </div>
            )}

            <Divider style={{ borderColor: colors.border }} />

            {/* Author Section */}
            <div>
              <Title level={4} style={{ color: colors.primary }}>
                About the author
              </Title>
              <Title
                level={5}
                style={{
                  marginTop: '1rem',
                  marginBottom: '0.5rem',
                  color: colors.text,
                }}
              >
                {book.author.firstName} {book.author.lastName}
              </Title>

              {book.author.nationality && (
                <Text
                  style={{
                    display: 'block',
                    marginBottom: '1rem',
                    color: colors.textSecondary,
                  }}
                >
                  {book.author.nationality}
                </Text>
              )}

              {book.author.biography && (
                <Paragraph
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: colors.text,
                  }}
                >
                  {book.author.biography}
                </Paragraph>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <style>{`
        .ant-typography {
          color: ${colors.text} !important;
        }
        .ant-typography-secondary {
          color: ${colors.textSecondary} !important;
        }
        .ant-divider {
          border-color: ${colors.border} !important;
        }
        .ant-tag {
          background-color: ${colors.lightBg} !important;
          color: ${colors.text} !important;
          border-color: ${colors.border} !important;
        }
        .ant-tag-blue {
          background-color: #395E66 !important;
          color: #ffffff !important;
          border-color: #395E66 !important;
        }
        .ant-badge-status-text {
          color: ${colors.text} !important;
        }
      `}</style>
    </div>
  )
}
