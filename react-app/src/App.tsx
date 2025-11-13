import { Link } from '@tanstack/react-router'
import { Row, Col, Card, Typography } from 'antd'
import { Route as booksRoute } from './routes/books/index'
import { Route as authorsRoute } from './routes/authors/index'
import { Route as salesRoute } from './routes/sales/index'
import {
  BookOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import './App.css'

const { Title, Paragraph } = Typography

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url('https://media.gettyimages.com/id/1785356782/video/wooden-three-dimensional-bookcases-in-the-library.jpg?s=640x640&k=20&c=CkNAEeKrsQPe03cePFPpVMka591JhGMGEFDVOWfaBkE=')`,
        backgroundAttachment: 'scroll',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundClip: 'border-box',
        WebkitBackgroundSize: 'cover',
        imageRendering: 'crisp-edges',
        WebkitFontSmoothing: 'antialiased',
        WebkitTransform: 'translate3d(0, 0, 0)',
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          padding: '80px 2rem',
          textAlign: 'center',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
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
            color: 'white',
          }}
        >
          Explore Our Collection
        </Title>

        <Row gutter={[32, 32]} style={{ marginBottom: '4rem' }}>
          {/* Books Card */}
          <Col xs={24} sm={12} lg={8}>
            <Link to={booksRoute.to} style={{ textDecoration: 'none' }}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
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
                    color: '#395E66',
                    marginBottom: '1.5rem',
                  }}
                >
                  <BookOutlined />
                </div>
                <Title
                  level={3}
                  style={{ color: '#395E66', marginBottom: '1rem' }}
                >
                  Catalog
                </Title>
                <Paragraph style={{ color: '#666' }}>
                  Browse our vast collection of books from all genres
                </Paragraph>
              </Card>
            </Link>
          </Col>

          {/* Authors Card */}
          <Col xs={24} sm={12} lg={8}>
            <Link to={authorsRoute.to} style={{ textDecoration: 'none' }}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
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
                    color: '#395E66',
                    marginBottom: '1.5rem',
                  }}
                >
                  <TeamOutlined />
                </div>
                <Title
                  level={3}
                  style={{ color: '#395E66', marginBottom: '1rem' }}
                >
                  Authors
                </Title>
                <Paragraph style={{ color: '#666' }}>
                  Discover authors and their biographies
                </Paragraph>
              </Card>
            </Link>
          </Col>

          {/* Sales Card */}
          <Col xs={24} sm={12} lg={8}>
            <Link to={salesRoute.to} style={{ textDecoration: 'none' }}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
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
                    color: '#395E66',
                    marginBottom: '1.5rem',
                  }}
                >
                  <ShoppingCartOutlined />
                </div>
                <Title
                  level={3}
                  style={{ color: '#395E66', marginBottom: '1rem' }}
                >
                  Loans
                </Title>
                <Paragraph style={{ color: '#666' }}>
                  Manage your loans and discover our services
                </Paragraph>
              </Card>
            </Link>
          </Col>
        </Row>

        {/* About Section */}
        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            background: 'white',
          }}
        >
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title level={2} style={{ color: '#395E66' }}>
                About Babel&apos;s Library
              </Title>
              <Paragraph
                style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}
              >
                Babel&apos;s Library is your modern digital library. We offer
                easy access to a vast collection of books, fascinating author
                biographies and a simplified loan management system.
              </Paragraph>
              <Paragraph
                style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}
              >
                Whether you are a passionate reader or an academic researcher,
                our platform offers you all the tools you need to explore the
                world of literature.
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <div
                style={{
                  background:
                    'linear-gradient(135deg, #395E66 0%, #2a4850 100%)',
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
                    âˆž
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
          background: '#2a4850',
          padding: '2rem',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Paragraph
          style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: 0 }}
        >
          Â© 2025 Babel&apos;s Library - Your literary journey starts here
        </Paragraph>
      </div>
    </div>
  )
}

export default App
