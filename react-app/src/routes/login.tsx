import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Form, Input, Button, Card, Typography, Alert, Space } from 'antd'
import { useAuth } from '../auth/AuthContext'

const { Title } = Typography

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const onFinish = async (values: {
    email: string
    password: string
    expectedRole?: string
  }) => {
    setLoading(true)
    setError('')

    try {
      await login(values.email, values.password, values.expectedRole)
      // Rediriger vers la page d'accueil après connexion réussie
      navigate({ to: '/' })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
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
            Connexion
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
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
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
                { required: true, message: 'Veuillez entrer votre mot de passe' },
              ]}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
              >
                Se connecter
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            Pas encore de compte ?{' '}
            <Button
              type="link"
              onClick={() => navigate({ to: '/signup' })}
              style={{ padding: 0 }}
            >
              S'inscrire
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  )
}
