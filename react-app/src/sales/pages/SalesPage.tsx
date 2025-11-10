import { useEffect, useState, useCallback } from 'react'
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
  Empty,
  Statistic,
  Row,
  Col,
  Space,
  Tag,
} from 'antd'
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  FormOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import { useSaleProvider, type Sale } from '../providers/useSaleProvider'
import { useAuth } from '../../auth/AuthContext'
import { useBookProvider } from '../../books/providers/useBookProvider'
import { useThemeColors } from '../../hooks/useThemeColors'
import type { BookModel } from '../../books/BookModel'
import type { ColumnsType } from 'antd/es/table'

const { Text } = Typography

interface CreateSaleValues {
  bookId: string
}

export function SalesPage() {
  const { sales, loadSales, createSale, deleteSale } = useSaleProvider()
  const { books, loadBooks } = useBookProvider()
  const { user } = useAuth()
  const colors = useThemeColors()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [availableBooks, setAvailableBooks] = useState<BookModel[]>([])

  const isLibrarian = user?.role === 'librarian'

  useEffect(() => {
    void loadSales()
    void loadBooks()
  }, [loadSales, loadBooks])

  useEffect(() => {
    const available = books.filter(book => book.isAvailable)
    setAvailableBooks(available)
  }, [books])

  const handleCreate = useCallback(() => {
    form.resetFields()
    setIsModalOpen(true)
  }, [form])

  const handleSubmit = useCallback(
    async (values: CreateSaleValues) => {
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
        await loadSales()
        await loadBooks()
      } catch {
        message.error('Error recording sale')
      } finally {
        setLoading(false)
      }
    },
    [createSale, user?.id, form, loadSales, loadBooks],
  )

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteSale(id)
        message.success('Sale deleted successfully')
        await loadSales()
      } catch {
        message.error('Error deleting')
      }
    },
    [deleteSale, loadSales],
  )

  const borrowedCount = sales.filter(s => !s.returned).length
  const returnedCount = sales.filter(s => s.returned).length

  const actionColumn: ColumnsType<Sale> = [
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (_: unknown, record: Sale) => (
        <Popconfirm
          title="Delete sale record"
          description="Are you sure you want to delete this record? This action cannot be undone."
          onConfirm={() => void handleDelete(record.id)}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      ),
    },
  ]

  const columns: ColumnsType<Sale> = [
    {
      title: 'Date',
      dataIndex: 'saleDate',
      key: 'saleDate',
      width: '12%',
      render: (date: string) => (
        <Text style={{ color: colors.text }}>
          {new Date(date).toLocaleDateString('en-US')}
        </Text>
      ),
    },
    {
      title: 'Book',
      key: 'book',
      width: '30%',
      render: (_: unknown, record: Sale) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ color: colors.text }}>
            {record.book?.title || 'Book not found'}
          </Text>
          <Text
            type="secondary"
            style={{ fontSize: '12px', color: colors.textSecondary }}
          >
            {record.book?.author
              ? `${record.book.author.firstName} ${record.book.author.lastName}`
              : 'Unknown Author'}
          </Text>
        </Space>
      ),
    },
    {
      title: 'User',
      key: 'user',
      width: '20%',
      render: (_: unknown, record: Sale) => (
        <Text style={{ color: colors.text }}>
          {record.user
            ? `${record.user.firstName} ${record.user.lastName}`
            : 'User not found'}
        </Text>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: '15%',
      render: (_: unknown, record: Sale) => (
        <Tag
          color={record.returned ? 'green' : 'blue'}
          style={{
            borderRadius: '4px',
            padding: '4px 12px',
          }}
        >
          {record.returned ? 'Returned' : 'Borrowed'}
        </Tag>
      ),
    },
    ...(isLibrarian ? actionColumn : []),
  ]

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          background: colors.headerBgGradient,
          color: colors.text,
          padding: '2.5rem',
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
              Loans & Sales
            </h1>
            <p style={{ color: '#ffffff', margin: '0.5rem 0 0 0' }}>
              Manage book borrowing and returns
            </p>
          </div>

          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={handleCreate}
            size="large"
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.primary,
              fontWeight: 600,
            }}
          >
            New Sale
          </Button>
        </div>

        <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              }}
              bordered
            >
              <Statistic
                title={
                  <span style={{ color: colors.textSecondary }}>
                    Total Records
                  </span>
                }
                value={sales.length}
                valueStyle={{ color: colors.text, fontSize: '32px' }}
                prefix={<FormOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              }}
              bordered
            >
              <Statistic
                title={
                  <span style={{ color: colors.textSecondary }}>
                    Currently Borrowed
                  </span>
                }
                value={borrowedCount}
                valueStyle={{ color: '#3b82f6', fontSize: '32px' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              }}
              bordered
            >
              <Statistic
                title={
                  <span style={{ color: colors.textSecondary }}>Returned</span>
                }
                value={returnedCount}
                valueStyle={{ color: '#10b981', fontSize: '32px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              }}
              bordered
            >
              <Statistic
                title={
                  <span style={{ color: colors.textSecondary }}>
                    Available Books
                  </span>
                }
                value={availableBooks.length}
                valueStyle={{ color: colors.text, fontSize: '32px' }}
              />
            </Card>
          </Col>
        </Row>

        <Card
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.border,
          }}
          bordered
        >
          <h3
            style={{
              color: colors.text,
              margin: '0 0 1.5rem 0',
              fontWeight: 600,
            }}
          >
            All Records
          </h3>

          <Table
            columns={columns}
            dataSource={sales}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1200 }}
            locale={{
              emptyText: (
                <Empty
                  description="No records yet"
                  style={{ color: colors.textSecondary }}
                />
              ),
            }}
          />
        </Card>

        <Modal
          title={<span style={{ color: colors.text }}>Record New Sale</span>}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false)
            form.resetFields()
          }}
          onOk={() => form.submit()}
          okText="Record Sale"
          cancelText="Cancel"
          confirmLoading={loading}
          style={{
            backgroundColor: colors.cardBg,
          }}
          bodyStyle={{
            backgroundColor: colors.cardBg,
          }}
          okButtonProps={{
            style: {
              backgroundColor: colors.primary,
              borderColor: colors.primary,
            },
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
            style={{ marginTop: '1rem' }}
          >
            <Form.Item
              label={<span style={{ color: colors.text }}>Select Book</span>}
              name="bookId"
              rules={[{ required: true, message: 'Please select a book' }]}
            >
              <Select
                placeholder="Choose an available book..."
                className="dark-select"
                options={availableBooks.map(book => ({
                  label: `${book.title} - ${book.author.firstName} ${book.author.lastName}`,
                  value: book.id,
                }))}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <style>{`
        .ant-table-wrapper {
          background-color: ${colors.cardBg} !important;
        }
        .ant-table {
          background-color: ${colors.cardBg} !important;
          color: ${colors.text} !important;
        }
        .ant-table-container {
          background-color: ${colors.cardBg} !important;
        }
        .ant-table-thead > tr > th {
          background-color: ${colors.cardBg} !important;
          color: ${colors.text} !important;
          border-color: ${colors.border} !important;
        }
        .ant-table-tbody > tr {
          background-color: ${colors.cardBg} !important;
        }
        .ant-table-tbody > tr > td {
          background-color: ${colors.cardBg} !important;
          color: ${colors.text} !important;
          border-color: ${colors.border} !important;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: ${colors.lightBg} !important;
        }
        .ant-table-pagination {
          background-color: ${colors.cardBg} !important;
        }
        .ant-pagination-item,
        .ant-pagination-item-link {
          background-color: ${colors.cardBg} !important;
          border-color: ${colors.border} !important;
          color: ${colors.text} !important;
        }
        .ant-pagination-item-active {
          background-color: ${colors.primary} !important;
          border-color: ${colors.primary} !important;
        }
        .ant-empty-description {
          color: ${colors.textSecondary} !important;
        }
        .dark-select .ant-select-selector {
          background-color: ${colors.inputBg} !important;
          border-color: ${colors.border} !important;
        }
        .dark-select .ant-select-selection-item {
          color: ${colors.text} !important;
        }
      `}</style>
    </>
  )
}
