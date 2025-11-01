import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Card,
  Row,
  Col,
  Space,
  Modal,
  Form,
  Select,
  Button,
  Popconfirm,
  message,
  Typography,
  Table,
} from 'antd'
import {
  DeleteOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { useSaleProvider } from '../sales/providers/useSaleProvider'
import { useAuth } from '../auth/AuthContext'
import { useBookProvider } from '../books/providers/useBookProvider'
import apiClient from '../api/axios'

const { Title } = Typography

export const Route = createFileRoute('/sales')({
  component: SalesPage,
})

function SalesPage() {
  const { sales, loadSales, createSale, deleteSale } = useSaleProvider()
  const { books, loadBooks } = useBookProvider()
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [availableBooks, setAvailableBooks] = useState<any[]>([])

  // Vérifier si l'utilisateur est bibliothécaire
  const isLibrarian = user?.role === 'librarian'

  useEffect(() => {
    loadSales()
    loadBooks()
  }, [loadSales, loadBooks])

  useEffect(() => {
    // Filtrer les livres disponibles
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
      message.success('Vente enregistrée avec succès')
      setIsModalOpen(false)
      form.resetFields()
      loadSales()
      loadBooks()
    } catch (error) {
      message.error('Erreur lors de l\'enregistrement de la vente')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteSale(id)
      message.success('Vente supprimée avec succès')
    } catch (error) {
      message.error('Erreur lors de la suppression')
    }
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'saleDate',
      key: 'saleDate',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Livre',
      key: 'book',
      render: (_: any, record: any) =>
        record.book
          ? `${record.book.title}${record.book.author ? ` - ${record.book.author.firstName} ${record.book.author.lastName}` : ''}`
          : 'Livre non trouvé',
    },
    {
      title: 'Utilisateur',
      key: 'user',
      render: (_: any, record: any) =>
        record.user
          ? `${record.user.firstName} ${record.user.lastName}`
          : 'Utilisateur non trouvé',
    },
    ...(isLibrarian
      ? [
          {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
              <Popconfirm
                title="Supprimer la vente"
                description="Êtes-vous sûr de vouloir supprimer cette vente ?"
                onConfirm={() => handleDelete(record.id)}
                okText="Oui"
                cancelText="Non"
              >
                <Button type="text" danger icon={<DeleteOutlined />}>
                  Supprimer
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
          Ventes / Emprunts
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
          Nouvelle Vente
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
          <Title
            level={4}
            style={{ color: '#395E66', margin: 0 }}
          >
            Nouvelle Vente
          </Title>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
          form.resetFields()
        }}
        onOk={() => form.submit()}
        okText="Enregistrer"
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
            label="Livre"
            name="bookId"
            rules={[{ required: true, message: 'Veuillez sélectionner un livre' }]}
          >
            <Select placeholder="Sélectionnez un livre disponible">
              {availableBooks.map(book => (
                <Select.Option key={book.id} value={book.id}>
                  {book.title} - {book.author.firstName} {book.author.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {availableBooks.length === 0 && (
            <Typography.Text type="secondary">
              Aucun livre disponible
            </Typography.Text>
          )}
        </Form>
      </Modal>
    </div>
  )
}
