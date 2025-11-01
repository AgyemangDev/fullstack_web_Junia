import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as aboutRoute } from './routes/about'
import { Route as booksRoute } from './routes/books/index'
import { Space, Menu, Drawer, Button, Grid } from 'antd'
import {
  BookOutlined,
  HomeOutlined,
  InfoOutlined,
  MenuOutlined,
} from '@ant-design/icons'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const screens = Grid.useBreakpoint() // AntD breakpoint hook

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

        {/* Desktop menu */}
        {screens.md ? (
          <Menu mode="horizontal" items={items} theme="dark" />
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
            </Drawer>
          </>
        )}
      </div>

      <div style={{ width: '100%', overflowY: 'auto', flex: 1 }}>
        {children}
      </div>
    </Space>
  )
}
