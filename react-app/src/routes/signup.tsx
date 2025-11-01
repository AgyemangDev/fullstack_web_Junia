import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Form, Input, Button, Card, Typography, Alert, Space, Select } from 'antd'
import { useAuth } from '../auth/AuthContext'

const { Title } = Typography

export const Route = createFileRoute('/signup')({
  component: SignupPage,
})

function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const onFinish = async (values: {
    firstName: string
    lastName: string
    email: string
    password: string
    role: 'librarian' | 'member'
  }) => {
    setLoading(true)
    setError('')

    try {
      await signup(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.role
      )
      // Rediriger vers la page de connexion après inscription réussie
      navigate({ to: '/login' })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)',
        padding: '2rem',
      }}
    >
      <Card style={{ width: '100%', maxWidth: 400 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 0 }}>
            Inscription
          </Title>

          {error && (
            <Alert
              message="Erreur"
              description={error}
              type="error"
              showIcon
              closable
              onClose={() => setError('')}
            />
          )}

          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label="Prénom"
              name="firstName"
              rules={[
                { required: true, message: 'Veuillez entrer votre prénom' },
              ]}
            >
              <Input placeholder="Jean" size="large" />
            </Form.Item>

            <Form.Item
              label="Nom"
              name="lastName"
              rules={[
                { required: true, message: 'Veuillez entrer votre nom' },
              ]}
            >
              <Input placeholder="Dupont" size="large" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Veuillez entrer votre email' },
                { type: 'email', message: 'Email invalide' },
              ]}
            >
              <Input placeholder="votre@email.com" size="large" />
            </Form.Item>

            <Form.Item
              label="Mot de passe"
              name="password"
              rules={[
                { required: true, message: 'Veuillez entrer un mot de passe' },
                { min: 6, message: 'Le mot de passe doit contenir au moins 6 caractères' },
              ]}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>

            <Form.Item
              label="Rôle"
              name="role"
              rules={[
                { required: true, message: 'Veuillez sélectionner un rôle' },
              ]}
            >
              <Select size="large">
                <Select.Option value="member">Membre</Select.Option>
                <Select.Option value="librarian">Bibliothécaire</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
              >
                S'inscrire
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            Déjà un compte ?{' '}
            <Button
              type="link"
              onClick={() => navigate({ to: '/login' })}
              style={{ padding: 0 }}
            >
              Se connecter
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  )
}
