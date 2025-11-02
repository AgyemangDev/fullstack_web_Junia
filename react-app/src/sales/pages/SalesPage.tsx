import { useEffect, useState } from 'react'
import {
  Card,
  Modal,
  Form,
  Select,
  Button,
  Popconfirm,
  message,
  Typography,
  Table,
} from 'antd'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useSaleProvider, type Sale } from '../providers/useSaleProvider'
import { useAuth } from '../../auth/AuthContext'
import { useBookProvider } from '../../books/providers/useBookProvider'
import type { BookModel } from '../../books/BookModel'

const { Title } = Typography

export function SalesPage() {
  const { sales, loadSales, createSale, deleteSale } = useSaleProvider()
  const { books, loadBooks } = useBookProvider()
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [availableBooks, setAvailableBooks] = useState<BookModel[]>([])

  // Check if user is librarian
  const isLibrarian = user?.role === 'librarian'

  useEffect(() => {
    loadSales()
    loadBooks()
  }, [loadSales, loadBooks])

  useEffect(() => {
    // Filter available books
    const available = books.filter(book => book.isAvailable)
    setAvailableBooks(available)
  }, [books])

  const handleCreate = () => {
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleSubmit = async (values: { bookId: string }) => {
    setLoading(true)
    try {
      await createSale({
        userId: user?.id || '',
        bookId: values.bookId,
        saleDate: new Date().toISOString(),
      })
      message.success('Sale recorded successfully')
      setIsModalOpen(false)
      form.resetFields()
      loadSales()
      loadBooks()
    } catch {
      message.error('Error recording sale')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteSale(id)
      message.success('Sale deleted successfully')
    } catch {
      message.error('Error deleting')
    }
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'saleDate',
      key: 'saleDate',
      render: (date: string) => new Date(date).toLocaleDateString('en-US'),
    },
    {
      title: 'Book',
      key: 'book',
      render: (_: unknown, record: Sale) =>
        record.book
          ? `${record.book.title}${record.book.author ? ` - ${record.book.author.firstName} ${record.book.author.lastName}` : ''}`
          : 'Book not found',
    },
    {
      title: 'User',
      key: 'user',
      render: (_: unknown, record: Sale) =>
        record.user
          ? `${record.user.firstName} ${record.user.lastName}`
          : 'User not found',
    },
    ...(isLibrarian
      ? [
          {
            title: 'Action',
            key: 'action',
            render: (_: unknown, record: Sale) => (
              <Popconfirm
                title="Delete sale"
                description="Are you sure you want to delete this sale?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            ),
          },
        ]
      : []),
  ]

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
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <Title
          level={2}
          style={{
            color: '#395E66',
            fontSize: '2.5rem',
            fontWeight: 600,
          }}
        >
          Sales / Loans
        </Title>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={handleCreate}
          size="large"
          style={{
            backgroundColor: '#395E66',
            borderColor: '#395E66',
          }}
        >
          New Sale
        </Button>
      </div>

      <Card
        style={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Table
          columns={columns}
          dataSource={sales}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={
          <Title level={4} style={{ color: '#395E66', margin: 0 }}>
            New Sale
          </Title>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
          form.resetFields()
        }}
        onOk={() => form.submit()}
        okText="Record"
        confirmLoading={loading}
        okButtonProps={{
          style: {
            backgroundColor: '#395E66',
            borderColor: '#395E66',
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
            label="Book"
            name="bookId"
            rules={[{ required: true, message: 'Please select a book' }]}
          >
            <Select placeholder="Select an available book">
              {availableBooks.map(book => (
                <Select.Option key={book.id} value={book.id}>
                  {book.title} - {book.author.firstName} {book.author.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {availableBooks.length === 0 && (
            <Typography.Text type="secondary">
              No books available
            </Typography.Text>
          )}
        </Form>
      </Modal>
    </div>
  )
}
