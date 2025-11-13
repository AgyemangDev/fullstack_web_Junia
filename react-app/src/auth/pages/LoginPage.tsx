import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Form, Input, Button, Card, Typography, Alert, Space } from 'antd'
import { useAuth } from '../AuthContext'

const { Title } = Typography

export function LoginPage() {
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
      // Redirect to home page after successful login
      navigate({ to: '/' })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login error')
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
            Login
          </Title>

          {error && (
            <Alert
              message="Error"
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
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Invalid email' },
              ]}
            >
              <Input placeholder="your@email.com" size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <Input.Password placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            Don&apos;t have an account yet?{' '}
            <Button
              type="link"
              onClick={() => navigate({ to: '/signup' })}
              style={{ padding: 0 }}
            >
              Sign up
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  )
}
