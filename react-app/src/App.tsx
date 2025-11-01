import { Link } from '@tanstack/react-router'
import { Row, Col, Card, Typography, Space, Button } from 'antd'
import { Route as booksRoute } from './routes/books/index'
import { Route as authorsRoute } from './routes/authors'
import { Route as salesRoute } from './routes/sales'
import { BookOutlined, TeamOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import './App.css'

const { Title, Paragraph } = Typography

function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Hero Section */}
      <div
        style={{
          padding: '80px 2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #395E66 0%, #2a4850 100%)',
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
          Babel's Library
        </Title>
        <Paragraph
          style={{
            fontSize: '1.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          Découvrez un monde de savoir et de magie littéraire
        </Paragraph>
      </div>

      {/* Features Section */}
      <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Title
          level={2}
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#395E66',
          }}
        >
          Explorez Notre Collection
        </Title>

        <Row gutter={[32, 32]} style={{ marginBottom: '4rem' }}>
          {/* Books Card */}
          <Col xs={24} sm={12} lg={8}>
            <Link
              to={booksRoute.to}
              style={{ textDecoration: 'none' }}
            >
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
                <Title level={3} style={{ color: '#395E66', marginBottom: '1rem' }}>
                  Catalogue
                </Title>
                <Paragraph style={{ color: '#666' }}>
                  Parcourez notre vaste collection de livres de tous genres
                </Paragraph>
              </Card>
            </Link>
          </Col>

          {/* Authors Card */}
          <Col xs={24} sm={12} lg={8}>
            <Link
              to={authorsRoute.to}
              style={{ textDecoration: 'none' }}
            >
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
                <Title level={3} style={{ color: '#395E66', marginBottom: '1rem' }}>
                  Auteurs
                </Title>
                <Paragraph style={{ color: '#666' }}>
                  Découvrez les auteurs et leurs biographies
                </Paragraph>
              </Card>
            </Link>
          </Col>

          {/* Sales Card */}
          <Col xs={24} sm={12} lg={8}>
            <Link
              to={salesRoute.to}
              style={{ textDecoration: 'none' }}
            >
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
                <Title level={3} style={{ color: '#395E66', marginBottom: '1rem' }}>
                  Emprunts
                </Title>
                <Paragraph style={{ color: '#666' }}>
                  Gérez vos emprunts et découvrez nos services
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
                À Propos de Babel's Library
              </Title>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}>
                Babel's Library est votre bibliothèque moderne et numérique. 
                Nous offrons un accès facile à une vaste collection de livres, 
                des biographies d'auteurs fascinants et un système de gestion d'emprunts simplifié.
              </Paragraph>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}>
                Que vous soyez un lecteur passionné ou un chercheur académique, 
                notre plateforme vous offre tous les outils nécessaires pour explorer le monde de la littérature.
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #395E66 0%, #2a4850 100%)',
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
                    Un nombre infini de possibilités littéraires
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
        <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: 0 }}>
          © 2025 Babel's Library - Votre voyage littéraire commence ici
        </Paragraph>
      </div>
    </div>
  )
}

export default App
