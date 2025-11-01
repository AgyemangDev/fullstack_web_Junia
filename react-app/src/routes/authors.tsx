import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Card,
  Row,
  Col,
  Button,
  Space,
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
import { useAuthorProvider } from '../authors/providers/useAuthorProvider'
import { useAuth } from '../auth/AuthContext'

const { Title, Text } = Typography

export const Route = createFileRoute('/authors')({
  component: AuthorsPage,
})

function AuthorsPage() {
  const { authors, loadAuthors, createAuthor, updateAuthor, deleteAuthor } =
    useAuthorProvider()
  const { user } = useAuth()
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

  // Vérifier si l'utilisateur est bibliothécaire
  const isLibrarian = user?.role === 'librarian'

  useEffect(() => {
    loadAuthors()
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
        message.success('Auteur mis à jour avec succès')
      } else {
        await createAuthor(values)
        message.success('Auteur créé avec succès')
      }
      setIsModalOpen(false)
      form.resetFields()
    } catch (error) {
      message.error('Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteAuthor(id)
      message.success('Auteur supprimé avec succès')
    } catch (error) {
      message.error('Erreur lors de la suppression')
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
          Gestion des Auteurs
        </Title>
        {isLibrarian && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            size="large"
            style={{
              backgroundColor: '#395E66',
              borderColor: '#395E66',
            }}
          >
            Ajouter un Auteur
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
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              cover={
                author.photo ? (
                  <img
                    alt={author.firstName}
                    src={author.photo}
                    style={{ height: 200, objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                  />
                ) : (
                  <div
                    style={{
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #395E66 0%, #2a4850 100%)',
                      borderRadius: '12px 12px 0 0',
                    }}
                  >
                    <UserOutlined style={{ fontSize: 64, color: 'rgba(255, 255, 255, 0.3)' }} />
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
                      >
                        Modifier
                      </Button>,
                      <Popconfirm
                        key="delete"
                        title="Supprimer l'auteur"
                        description="Êtes-vous sûr de vouloir supprimer cet auteur ?"
                        onConfirm={() => handleDelete(author.id)}
                        okText="Oui"
                        cancelText="Non"
                      >
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                        >
                          Supprimer
                        </Button>
                      </Popconfirm>,
                    ]
                  : []
              }
            >
              <Card.Meta
                title={
                  <div style={{ color: '#395E66', fontSize: '1.1rem', fontWeight: 600 }}>
                    {`${author.firstName} ${author.lastName}`}
                  </div>
                }
                description={
                  <div>
                    {author.nationality && (
                      <Text type="secondary" style={{ fontSize: '0.95rem' }}>
                        {author.nationality}
                      </Text>
                    )}
                    {author.biography && (
                      <div style={{ marginTop: '8px' }}>
                        <Text ellipsis style={{ fontSize: '0.9rem' }}>
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
          <Title
            level={4}
            style={{ color: '#395E66', margin: 0 }}
          >
            {editingAuthor ? 'Modifier un Auteur' : 'Créer un Auteur'}
          </Title>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
          form.resetFields()
        }}
        onOk={() => form.submit()}
        okText={editingAuthor ? 'Mettre à jour' : 'Créer'}
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
            label="Prénom"
            name="firstName"
            rules={[{ required: true, message: 'Le prénom est requis' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nom"
            name="lastName"
            rules={[{ required: true, message: 'Le nom est requis' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nationalité"
            name="nationality"
          >
            <Input placeholder="Ex: Français" />
          </Form.Item>

          <Form.Item
            label="Biographie"
            name="biography"
          >
            <Input.TextArea rows={4} placeholder="Biographie de l'auteur..." />
          </Form.Item>

          <Form.Item
            label="URL de la photo"
            name="photo"
          >
            <Input placeholder="https://..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
