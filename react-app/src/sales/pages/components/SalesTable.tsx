import { useMemo } from 'react'
import {
  Button,
  Popconfirm,
  Table,
  Image,
  Space,
  Tag,
  Typography,
  List,
  Card,
  Grid,
} from 'antd'
import {
  DeleteOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
} from '@ant-design/icons'

const { Text } = Typography
const { useBreakpoint } = Grid

export function SalesTable({ sales, isLibrarian, onDelete }) {
  const screens = useBreakpoint()
  const isMobile = !screens.md // md breakpoint = tablet/desktop boundary

  const columns = useMemo(
    () => [
      {
        title: 'Book',
        key: 'book',
        width: 280,
        render: (_, record) => (
          <Space size="middle" align="start">
            <Image
              src={record.book?.photoUrl || 'https://via.placeholder.com/60'}
              alt={record.book?.title || 'Book cover'}
              width={60}
              height={80}
              style={{
                objectFit: 'cover',
                borderRadius: 4,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
              preview={false}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text strong style={{ display: 'block', marginBottom: 4 }}>
                {record.book?.title || 'Unknown Book'}
              </Text>
              <Text type="secondary" style={{ fontSize: 13, display: 'block' }}>
                by{' '}
                {record.book?.author
                  ? `${record.book.author.firstName} ${record.book.author.lastName}`
                  : 'Unknown Author'}
              </Text>
              {record.book?.price && (
                <Tag color="green" style={{ marginTop: 4 }}>
                  ${record.book.price}
                </Tag>
              )}
            </div>
          </Space>
        ),
        responsive: ['md'],
      },
      {
        title: 'Buyer',
        key: 'buyer',
        width: 200,
        render: (_, record) => (
          <Space direction="vertical" size="small">
            <Space size="small">
              <UserOutlined style={{ color: '#1890ff' }} />
              <Text strong>
                {record.buyer
                  ? `${record.buyer.firstName} ${record.buyer.lastName}`
                  : 'Unknown'}
              </Text>
            </Space>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.buyer?.email || ''}
            </Text>
            <Tag color={record.buyer?.role === 'member' ? 'blue' : 'purple'}>
              {record.buyer?.role || 'N/A'}
            </Tag>
          </Space>
        ),
        responsive: ['lg'],
      },
      {
        title: 'Librarian',
        key: 'librarian',
        width: 180,
        render: (_, record) => (
          <Space direction="vertical" size="small">
            <Text>
              {record.librarian
                ? `${record.librarian.firstName} ${record.librarian.lastName}`
                : 'Unknown'}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.librarian?.email || ''}
            </Text>
          </Space>
        ),
        responsive: ['xl'],
      },
      {
        title: 'Date',
        dataIndex: 'saleDate',
        key: 'saleDate',
        width: 140,
        render: (date) => (
          <Space direction="vertical" size="small">
            <Space size="small">
              <CalendarOutlined style={{ color: '#52c41a' }} />
              <Text>
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
            </Space>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {new Date(date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Space>
        ),
      },
      ...(isLibrarian
        ? [
            {
              title: 'Action',
              key: 'action',
              width: 100,
              fixed: 'right',
              render: (_, record) => (
                <Popconfirm
                  title="Delete Sale"
                  description="Are you sure you want to delete this sale record?"
                  onConfirm={() => onDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ danger: true }}
                >
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    size="small"
                  >
                    Delete
                  </Button>
                </Popconfirm>
              ),
            },
          ]
        : []),
    ],
    [isLibrarian, onDelete]
  )

  // 📱 Mobile version: use List + Card
  if (isMobile) {
    return (
      <List
        dataSource={sales}
        renderItem={(record) => (
          <Card
            key={record.id}
            style={{
              marginBottom: 12,
              borderRadius: 8,
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            }}
          >
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Space>
                <BookOutlined style={{ color: '#52c41a' }} />
                <Text strong>{record.book?.title || 'Unknown Book'}</Text>
              </Space>
              <Text type="secondary" style={{ fontSize: 13 }}>
                {record.book?.author
                  ? `by ${record.book.author.firstName} ${record.book.author.lastName}`
                  : 'Unknown Author'}
              </Text>

              <Space>
                <UserOutlined style={{ color: '#1890ff' }} />
                <Text>
                  {record.buyer
                    ? `${record.buyer.firstName} ${record.buyer.lastName}`
                    : 'Unknown Buyer'}
                </Text>
              </Space>

              <Space>
                <CalendarOutlined style={{ color: '#13c2c2' }} />
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {new Date(record.saleDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              </Space>

              {isLibrarian && (
                <Popconfirm
                  title="Delete Sale"
                  onConfirm={() => onDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ danger: true }}
                >
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    danger
                    size="small"
                    style={{ marginTop: 8 }}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              )}
            </Space>
          </Card>
        )}
      />
    )
  }

  // 🖥 Desktop version: regular table
  return (
    <Table
      columns={columns}
      dataSource={sales}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} sales`,
        responsive: true,
      }}
      scroll={{ x: 768 }}
      style={{
        background: '#fff',
        borderRadius: 8,
      }}
      rowClassName="sale-row"
    />
  )
}
