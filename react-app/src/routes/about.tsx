import { createFileRoute } from '@tanstack/react-router'
import { Card, Typography, Row, Col } from 'antd'

const { Title, Paragraph } = Typography

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '4rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title
          level={1}
          style={{
            textAlign: 'center',
            color: '#395E66',
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '3rem',
          }}
        >
          À Propos de Babel's Library
        </Title>

        <Row gutter={[32, 32]} style={{ marginBottom: '3rem' }}>
          <Col xs={24} md={12}>
            <Card
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                height: '100%',
              }}
            >
              <Title level={2} style={{ color: '#395E66' }}>
                Notre Mission
              </Title>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Babel's Library a été créée pour offrir un accès moderne et facile à une vaste collection de livres.
                Nous croyons que la lecture est essentielle pour l'éducation, l'épanouissement personnel et le développement culturel.
              </Paragraph>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Notre plateforme numérique permet à tous de découvrir de nouveaux livres, d'explorer différents genres littéraires,
                et de gérer facilement leurs emprunts dans un environnement convivial et professionnel.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                height: '100%',
              }}
            >
              <Title level={2} style={{ color: '#395E66' }}>
                Nos Services
              </Title>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                - Catalogue complet de livres avec recherche avancée
              </Paragraph>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                - Informations détaillées sur les auteurs et leurs biographies
              </Paragraph>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                - Système de gestion d'emprunts simple et efficace
              </Paragraph>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                - Interface moderne et intuitive pour une expérience optimale
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #395E66 0%, #2a4850 100%)',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Title level={2} style={{ color: 'white', marginBottom: '1rem' }}>
            Contactez-nous
          </Title>
          <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem' }}>
            Pour toute question ou suggestion, n'hésitez pas à nous contacter.
            Nous sommes là pour vous aider à tirer le meilleur parti de votre expérience littéraire.
          </Paragraph>
        </Card>
      </div>
    </div>
  )
}
