import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as aboutRoute } from './routes/about'
import { Route as booksRoute } from './routes/books/index'
import { Route as authorsRoute } from './routes/authors/index'
import { Route as salesRoute } from './routes/sales/index'
import { Route as loginRoute } from './routes/login'
import {
  Layout as AntLayout,
  Menu,
  Drawer,
  Button,
  Grid,
  Avatar,
  Divider,
} from 'antd'
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

const { Sider, Content, Header } = AntLayout

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const screens = Grid.useBreakpoint()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?')
    if (confirmed) {
      logout()
      navigate({ to: loginRoute.to })
    }
  }

  const menuItems = [
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

  // Desktop sidebar content
  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo/Brand */}
      <div
        style={{
          padding: collapsed ? '20px 0' : '20px 24px',
          textAlign: collapsed ? 'center' : 'left',
          background: '#001529',
        }}
      >
        <h2
          style={{
            color: 'white',
            margin: 0,
            fontSize: collapsed ? '18px' : '20px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {collapsed ? 'BL' : "Babel's Library"}
        </h2>
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        items={menuItems}
        theme="dark"
        style={{ flex: 1, borderRight: 0 }}
      />

      {/* User Section */}
      {isAuthenticated && (
        <>
          <Divider style={{ margin: 0, background: '#434343' }} />
          <div
            style={{
              padding: collapsed ? '16px 8px' : '16px 24px',
              background: '#001529',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'white',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              <Avatar
                icon={<UserOutlined />}
                style={{ background: '#395E66' }}
              />
              {!collapsed && (
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {user?.firstName} {user?.lastName}
                  </div>
                </div>
              )}
            </div>
            <Button
              type="default"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              block={!collapsed}
              style={{ width: collapsed ? '40px' : '100%' }}
            >
              {!collapsed && 'Logout'}
            </Button>
          </div>
        </>
      )}

      {/* Login button for non-authenticated users */}
      {!isAuthenticated && (
        <>
          <Divider style={{ margin: 0, background: '#434343' }} />
          <div
            style={{
              padding: collapsed ? '16px 8px' : '16px 24px',
              background: '#001529',
            }}
          >
            <Button
              type="primary"
              onClick={() => navigate({ to: loginRoute.to })}
              block={!collapsed}
              style={{ width: collapsed ? '40px' : '100%' }}
            >
              {collapsed ? <UserOutlined /> : 'Login'}
            </Button>
          </div>
        </>
      )}
    </div>
  )

  // Mobile view
  if (!screens.md) {
    return (
      <AntLayout style={{ minHeight: '100vh' }}>
        {/* Mobile header */}
        <Header
          style={{
            background: '#395E66',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <h2 style={{ color: 'white', margin: 0 }}>Babel&apos;s Library</h2>
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: 'white', fontSize: 20 }} />}
            onClick={() => setDrawerVisible(true)}
          />
        </Header>

        <Content style={{ padding: '24px', background: '#f0f2f5' }}>
          {children}
        </Content>

        {/* Mobile drawer */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          bodyStyle={{ padding: 0 }}
          width={280}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <Menu
              mode="vertical"
              items={menuItems}
              onClick={() => setDrawerVisible(false)}
              style={{ flex: 1, borderRight: 0 }}
            />

            {isAuthenticated && (
              <>
                <Divider style={{ margin: 0 }} />
                <div style={{ padding: '16px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <Avatar
                      icon={<UserOutlined />}
                      style={{ background: '#395E66' }}
                    />
                    <div>
                      <div style={{ fontWeight: 500 }}>
                        {user?.firstName} {user?.lastName}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    block
                    icon={<LogoutOutlined />}
                  >
                    Logout
                  </Button>
                </div>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Divider style={{ margin: 0 }} />
                <div style={{ padding: '16px' }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      setDrawerVisible(false)
                      navigate({ to: loginRoute.to })
                    }}
                    block
                  >
                    Login
                  </Button>
                </div>
              </>
            )}
          </div>
        </Drawer>
      </AntLayout>
    )
  }

  // Desktop view with sidebar
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        {sidebarContent}
      </Sider>

      <AntLayout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: 'margin-left 0.2s',
        }}
      >
        <Content
          style={{
            background: '#f0f2f5',
            minHeight: '100vh',
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  )
}
