import { useEffect, useState, useCallback } from 'react'
import {
  Table,
  Card,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Tag,
  Select,
} from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  ReloadOutlined,
  EditOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import { useThemeColors } from '../../hooks/useThemeColors'

interface Client {
  id: string
  name: string
  email: string
  phone?: string
  status: 'active' | 'inactive'
  borrowedBooksCount?: number
}

interface ClientFormValues {
  name: string
  email: string
  phone?: string
  status: 'active' | 'inactive'
}

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [form] = Form.useForm()
  const colors = useThemeColors()

  const getAuthHeader = useCallback(() => {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }, [])

  const loadClients = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axios.get<Client[]>('http://localhost:3000/clients', {
        headers: getAuthHeader(),
      })
      const normalizedClients = res.data.map(client => ({
        ...client,
        status: client.status.toLowerCase() as 'active' | 'inactive',
      }))
      setClients(normalizedClients)
    } catch (error) {
      console.error(error)
      message.error('Error loading clients')
    }
    setLoading(false)
  }, [getAuthHeader])

  useEffect(() => {
    loadClients()
  }, [loadClients])

  const handleAdd = () => {
    setEditingClient(null)
    form.resetFields()
    setModalOpen(true)
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    form.setFieldsValue({
      ...client,
      status: client.status.toLowerCase(),
    })
    setModalOpen(true)
  }

  const handleSubmit = async (values: ClientFormValues) => {
    try {
      if (editingClient) {
        await axios.patch(
          `http://localhost:3000/clients/${editingClient.id}`,
          values,
          { headers: getAuthHeader() },
        )
        message.success('Client updated')
      } else {
        await axios.post('http://localhost:3000/clients', values, {
          headers: getAuthHeader(),
        })
        message.success('Client added')
      }
      setModalOpen(false)
      form.resetFields()
      await loadClients()
    } catch (error) {
      console.error(error)
      message.error('Operation failed')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/clients/${id}`, {
        headers: getAuthHeader(),
      })
      message.success('Client deleted')
      await loadClients()
    } catch (error) {
      console.error(error)
      message.error('Error deleting client')
    }
  }

  return (
    <div
      style={{
        background: colors.headerBgGradient,
        minHeight: '100vh',
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
        <h1 style={{ color: '#ffffff', fontSize: '2.5rem', margin: 0 }}>
          Clients
        </h1>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={loadClients}
            loading={loading}
          >
            Refresh
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Client
          </Button>
        </Space>
      </div>

      <Card
        style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}
      >
        <Table<Client>
          dataSource={clients}
          loading={loading}
          rowKey="id"
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: t => <span style={{ color: colors.text }}>{t}</span>,
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
              render: t => (
                <span style={{ color: colors.text }}>{t || '—'}</span>
              ),
            },
            {
              title: 'Phone',
              dataIndex: 'phone',
              key: 'phone',
              render: t => (
                <span style={{ color: colors.text }}>{t || '—'}</span>
              ),
            },
            {
              title: 'Borrowed Books',
              dataIndex: 'borrowedBooksCount',
              key: 'borrowedBooksCount',
              render: c => <span style={{ color: colors.text }}>{c || 0}</span>,
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: s => (
                <Tag color={s === 'active' ? 'green' : 'red'}>
                  {s === 'active' ? 'Active' : 'Inactive'}
                </Tag>
              ),
            },
            {
              title: 'Action',
              key: 'action',
              render: (_, r) => (
                <Space>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    size="small"
                    onClick={() => handleEdit(r)}
                    style={{ color: colors.primary }}
                  />
                  <Popconfirm
                    title="Delete client?"
                    description="Are you sure?"
                    onConfirm={() => handleDelete(r.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                    />
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingClient ? 'Edit Client' : 'Add Client'}
        open={modalOpen}
        onOk={() => form.submit()}
        onCancel={() => {
          setModalOpen(false)
          form.resetFields()
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input
              placeholder="Enter client name"
              style={{
                backgroundColor: colors.inputBg,
                color: colors.text,
                borderColor: colors.border,
              }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter valid email' },
            ]}
          >
            <Input
              placeholder="Enter client email"
              style={{
                backgroundColor: colors.inputBg,
                color: colors.text,
                borderColor: colors.border,
              }}
            />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input
              placeholder="Enter phone number"
              style={{
                backgroundColor: colors.inputBg,
                color: colors.text,
                borderColor: colors.border,
              }}
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select
              placeholder="Select status"
              options={[
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      <style>{`
        .ant-table {
          background-color: ${colors.cardBg} !important;
          color: ${colors.text} !important;
        }
        .ant-table-thead > tr > th {
          background-color: ${colors.cardBg} !important;
          color: ${colors.text} !important;
          border-color: ${colors.border} !important;
        }
        .ant-table-tbody > tr > td {
          background-color: ${colors.cardBg} !important;
          color: ${colors.text} !important;
          border-color: ${colors.border} !important;
        }
        .ant-modal-content {
          background-color: ${colors.cardBg} !important;
        }
        .ant-modal-header {
          background-color: ${colors.cardBg} !important;
          border-color: ${colors.border} !important;
        }
        .ant-modal-title {
          color: ${colors.text} !important;
        }
        .ant-form-item-label > label {
          color: ${colors.text} !important;
        }
        .ant-input,
        .ant-select-selector {
          background-color: ${colors.inputBg} !important;
          border-color: ${colors.border} !important;
          color: ${colors.text} !important;
        }
        .ant-input::placeholder {
          color: ${colors.textSecondary} !important;
        }
      `}</style>
    </div>
  )
}
