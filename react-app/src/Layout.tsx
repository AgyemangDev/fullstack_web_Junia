import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Space, Menu, Drawer, Button, Grid, Tooltip } from 'antd'
import {
  BookOutlined,
  HomeOutlined,
  InfoOutlined,
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  IdcardOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons'

import { useAuth } from './auth/AuthContext'
import { useTheme } from './contexts/ThemeContext'

// Routes
import { Route as indexRoute } from './routes/index'
import { Route as aboutRoute } from './routes/about'
import { Route as booksRoute } from './routes/books/index'
import { Route as authorsRoute } from './routes/authors/index'
import { Route as salesRoute } from './routes/sales/index'
import { Route as clientsRoute } from './routes/clients/index'
import { Route as loginRoute } from './routes/login'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const screens = Grid.useBreakpoint()
  const { isAuthenticated, user, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: loginRoute.to })
  }

  // 🧭 Navigation Items
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
      label: <Link to={clientsRoute.to}>Clients</Link>,
      key: 'clients',
      icon: <IdcardOutlined />,
    },
    {
      label: <Link to={aboutRoute.to}>About</Link>,
      key: 'about',
      icon: <InfoOutlined />,
    },
  ]

  // 🌙 Dark Mode Colors
  const headerBg = isDarkMode ? '#1f1f1f' : '#395E66'
  const contentBg = isDarkMode ? '#0a0e27' : '#f5f7fa'
  const textColor = isDarkMode ? '#ffffff' : '#000000'

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: contentBg,
      }}
    >
      {/* 🔹 Top Navigation Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
          width: '100%',
          backgroundColor: headerBg,
          color: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <h2 style={{ margin: 0, color: 'white' }}>Babel&apos;s Library</h2>

        {/* 🔹 Desktop vs Mobile Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {screens.md ? (
            <>
              {/* Desktop Menu */}
              <Menu
                mode="horizontal"
                items={items}
                theme={isDarkMode ? 'dark' : 'dark'}
                style={{
                  backgroundColor: headerBg,
                  border: 'none',
                }}
              />

              {/* Dark Mode Toggle */}
              <Tooltip
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                <Button
                  type="text"
                  icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                  onClick={toggleTheme}
                  style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    border: 'none',
                  }}
                />
              </Tooltip>

              {/* User Info + Logout */}
              {isAuthenticated ? (
                <Space>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'white',
                    }}
                  >
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
              {/* Dark Mode Toggle Mobile */}
              <Tooltip
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                <Button
                  type="text"
                  icon={
                    isDarkMode ? (
                      <SunOutlined style={{ color: 'white', fontSize: 20 }} />
                    ) : (
                      <MoonOutlined style={{ color: 'white', fontSize: 20 }} />
                    )
                  }
                  onClick={toggleTheme}
                  style={{
                    border: 'none',
                  }}
                />
              </Tooltip>

              {/* Mobile Drawer Menu */}
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
                styles={{
                  body: {
                    backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
                  },
                  header: {
                    backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
                  },
                }}
              >
                <Menu
                  mode="vertical"
                  items={items}
                  style={{
                    backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
                    color: textColor,
                  }}
                />
                {isAuthenticated && (
                  <div
                    style={{
                      padding: '16px',
                      borderTop: `1px solid ${isDarkMode ? '#434343' : '#d9d9d9'}`,
                    }}
                  >
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div style={{ color: textColor }}>
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

      {/* 🔹 Main Content */}
      <div
        style={{
          width: '100%',
          overflowY: 'auto',
          flex: 1,
          backgroundColor: contentBg,
          color: textColor,
        }}
      >
        {children}
      </div>
    </Space>
  )
}
