import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as aboutRoute } from './routes/about'
import { Route as booksRoute } from './routes/books/index'
import { Route as authorsRoute } from './routes/authors'
import { Route as salesRoute } from './routes/sales'
import { Route as loginRoute } from './routes/auth/login'
import { Space, Menu, Drawer, Button, Grid } from 'antd'
import {
  BookOutlined,
  HomeOutlined,
  InfoOutlined,
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { useAuth } from './auth/AuthContext'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const screens = Grid.useBreakpoint()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: loginRoute.to })
  }

  const items = [
    {
      label: <Link to={indexRoute.to}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={booksRoute.to}>Books</Link>,
      key: 'books',
      icon: <BookOutlined />,
    },
    {
      label: <Link to={authorsRoute.to}>Authors</Link>,
      key: 'authors',
      icon: <TeamOutlined />,
    },
    {
      label: <Link to={salesRoute.to}>Sales</Link>,
      key: 'sales',
      icon: <ShoppingCartOutlined />,
    },
    {
      label: <Link to={aboutRoute.to}>About</Link>,
      key: 'about',
      icon: <InfoOutlined />,
    },
  ]

  return (
    <Space direction="vertical" style={{ width: '100%', height: '100vh' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
          width: '100%',
          backgroundColor: '#395E66',
          color: 'white',
        }}
      >
        <h2 style={{ margin: 0 }}>Babel&apos;s Library</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Desktop menu */}
          {screens.md ? (
            <>
              <Menu mode="horizontal" items={items} theme="dark" />
              {isAuthenticated ? (
                <Space>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserOutlined />
                    {user?.firstName} {user?.lastName}
                  </span>
                  <Button
                    type="text"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    style={{ color: 'white' }}
                  >
                    Logout
                  </Button>
                </Space>
              ) : (
                <Button
                  type="default"
                  onClick={() => navigate({ to: loginRoute.to })}
                >
                  Login
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                type="text"
                icon={<MenuOutlined style={{ color: 'white', fontSize: 24 }} />}
                onClick={() => setDrawerVisible(true)}
              />
              <Drawer
                title="Menu"
                placement="right"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
              >
                <Menu mode="vertical" items={items} />
                {isAuthenticated && (
                  <div style={{ padding: '16px' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <UserOutlined /> {user?.firstName} {user?.lastName}
                      </div>
                      <Button onClick={handleLogout} block>
                        Logout
                      </Button>
                    </Space>
                  </div>
                )}
              </Drawer>
            </>
          )}
        </div>
      </div>

      <div style={{ width: '100%', overflowY: 'auto', flex: 1 }}>
        {children}
      </div>
    </Space>
  )
}
