import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Alert,
  Space,
  Select,
} from 'antd'
import { useAuth } from '../AuthContext'

const { Title } = Typography

export function SignupPage() {
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
        values.role,
      )
      // Redirect to login page after successful signup
      navigate({ to: '/login' })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Signup error')
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
            Sign Up
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
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: 'Please enter your first name' },
              ]}
            >
              <Input placeholder="John" size="large" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: 'Please enter your last name' },
              ]}
            >
              <Input placeholder="Doe" size="large" />
            </Form.Item>

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
                { required: true, message: 'Please enter a password' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: 'Please select a role' }]}
            >
              <Select size="large">
                <Select.Option value="member">Member</Select.Option>
                <Select.Option value="librarian">Librarian</Select.Option>
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
                Sign up
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Button
              type="link"
              onClick={() => navigate({ to: '/login' })}
              style={{ padding: 0 }}
            >
              Sign in
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  )
}
