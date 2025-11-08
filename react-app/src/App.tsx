import { Link } from '@tanstack/react-router'
import { Row, Col, Card, Typography } from 'antd'
import { useThemeColors } from './hooks/useThemeColors'
import { Route as booksRoute } from './routes/books/index'
import { Route as authorsRoute } from './routes/authors/index'
import { Route as salesRoute } from './routes/sales/index'
import { Route as clientsRoute } from './routes/clients/index'
import {
  BookOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import './App.css'

const { Title, Paragraph } = Typography

function App() {
  const colors = useThemeColors()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.headerBgGradient,
        color: colors.text,
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          padding: '80px 2rem',
          textAlign: 'center',
          background: colors.gradientBg,
          color: 'white',
        }}
      >
        <Title
          level={1}
          style={{
            color: 'white',
            fontSize: '3.5rem',
            marginBottom: '1rem',
            fontWeight: 700,
          }}
        >
          Babel&apos;s Library
        </Title>
        <Paragraph
          style={{
            fontSize: '1.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          Discover a world of knowledge and literary magic
        </Paragraph>
      </div>

      {/* Features Section */}
      <div
        style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}
      >
        <Title
          level={2}
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            color: colors.primaryColor,
          }}
        >
          Explore Our Collection
        </Title>

        <Row gutter={[32, 32]} style={{ marginBottom: '4rem' }}>
          {/* Books Card */}
          <Col xs={24} sm={12} lg={8}>
            <Link to={booksRoute.to} style={{ textDecoration: 'none' }}>
              <Card
                className="feature-card"
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  backgroundColor: colors.cardBg,
                  boxShadow: `0 4px 12px ${colors.shadow}`,
                  border: `1px solid ${colors.border}`,
                  cursor: 'pointer',
                }}
                styles={{
                  body: {
                    padding: '2rem',
                    textAlign: 'center',
                  },
                }}
              >
                <div
                  style={{
                    fontSize: '4rem',
                    color: colors.primaryColor,
                    marginBottom: '1.5rem',
                    transition: 'transform 0.3s ease',
                  }}
                  className="card-icon"
                >
                  <BookOutlined />
                </div>
                <Title
                  level={3}
                  style={{ color: colors.primaryColor, marginBottom: '1rem' }}
                >
                  Catalog
                </Title>
                <Paragraph style={{ color: colors.textSecondary }}>
                  Browse our vast collection of books from all genres
                </Paragraph>
              </Card>
            </Link>
          </Col>

          {/* Authors Card */}
          <Col xs={24} sm={12} lg={8}>
            <Link to={authorsRoute.to} style={{ textDecoration: 'none' }}>
              <Card
                className="feature-card"
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  backgroundColor: colors.cardBg,
                  boxShadow: `0 4px 12px ${colors.shadow}`,
                  border: `1px solid ${colors.border}`,
                  cursor: 'pointer',
                }}
                styles={{
                  body: {
                    padding: '2rem',
                    textAlign: 'center',
                  },
                }}
              >
                <div
                  style={{
                    fontSize: '4rem',
                    color: colors.primaryColor,
                    marginBottom: '1.5rem',
                    transition: 'transform 0.3s ease',
                  }}
                  className="card-icon"
                >
                  <TeamOutlined />
                </div>
                <Title
                  level={3}
                  style={{ color: colors.primaryColor, marginBottom: '1rem' }}
                >
                  Authors
                </Title>
                <Paragraph style={{ color: colors.textSecondary }}>
                  Discover authors and their biographies
                </Paragraph>
              </Card>
            </Link>
          </Col>

          {/* Sales Card */}
          <Col xs={24} sm={12} lg={8}>
            <Link to={salesRoute.to} style={{ textDecoration: 'none' }}>
              <Card
                className="feature-card"
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  backgroundColor: colors.cardBg,
                  boxShadow: `0 4px 12px ${colors.shadow}`,
                  border: `1px solid ${colors.border}`,
                  cursor: 'pointer',
                }}
                styles={{
                  body: {
                    padding: '2rem',
                    textAlign: 'center',
                  },
                }}
              >
                <div
                  style={{
                    fontSize: '4rem',
                    color: colors.primaryColor,
                    marginBottom: '1.5rem',
                    transition: 'transform 0.3s ease',
                  }}
                  className="card-icon"
                >
                  <ShoppingCartOutlined />
                </div>
                <Title
                  level={3}
                  style={{ color: colors.primaryColor, marginBottom: '1rem' }}
                >
                  Loans
                </Title>
                <Paragraph style={{ color: colors.textSecondary }}>
                  Manage your loans and discover our services
                </Paragraph>
              </Card>
            </Link>
          </Col>

          {/* Clients Card */}
          <Col xs={24} sm={12} lg={8}>
            <Link to={clientsRoute.to} style={{ textDecoration: 'none' }}>
              <Card
                className="feature-card"
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  backgroundColor: colors.cardBg,
                  boxShadow: `0 4px 12px ${colors.shadow}`,
                  border: `1px solid ${colors.border}`,
                  cursor: 'pointer',
                }}
                styles={{
                  body: {
                    padding: '2rem',
                    textAlign: 'center',
                  },
                }}
              >
                <div
                  style={{
                    fontSize: '4rem',
                    color: colors.primaryColor,
                    marginBottom: '1.5rem',
                    transition: 'transform 0.3s ease',
                  }}
                  className="card-icon"
                >
                  <UserOutlined />
                </div>
                <Title
                  level={3}
                  style={{ color: colors.primaryColor, marginBottom: '1rem' }}
                >
                  Clients
                </Title>
                <Paragraph style={{ color: colors.textSecondary }}>
                  Manage and view all clients
                </Paragraph>
              </Card>
            </Link>
          </Col>
        </Row>

        {/* About Section */}
        <Card
          style={{
            borderRadius: '12px',
            boxShadow: `0 4px 12px ${colors.shadow}`,
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title level={2} style={{ color: colors.primaryColor }}>
                About Babel&apos;s Library
              </Title>
              <Paragraph
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: colors.textSecondary,
                }}
              >
                Babel&apos;s Library is your modern digital library. We offer
                easy access to a vast collection of books, fascinating author
                biographies and a simplified loan management system.
              </Paragraph>
              <Paragraph
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: colors.textSecondary,
                }}
              >
                Whether you are a passionate reader or an academic researcher,
                our platform offers you all the tools you need to explore the
                world of literature.
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <div
                style={{
                  background: colors.gradientBg,
                  borderRadius: '12px',
                  padding: '3rem',
                  minHeight: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ color: 'white', textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '4rem',
                      fontWeight: 'bold',
                      marginBottom: '1rem',
                    }}
                  >
                    ∞
                  </div>
                  <Paragraph
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '1.2rem',
                    }}
                  >
                    Infinite literary possibilities
                  </Paragraph>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Footer-like section */}
      <div
        style={{
          background: colors.bg,
          padding: '2rem',
          textAlign: 'center',
          color: 'white',
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <Paragraph
          style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: 0 }}
        >
          © 2025 Babel&apos;s Library - Your literary journey starts here
        </Paragraph>
      </div>

      {/* Hover Effects CSS */}
      <style>{`
        .feature-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .feature-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25) !important;
        }

        .card-icon {
          display: inline-block;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover .card-icon {
          transform: scale(1.15) rotate(5deg);
        }

        .feature-card:hover .ant-card-head {
          border-color: inherit;
        }
      `}</style>
    </div>
  )
}

export default App
