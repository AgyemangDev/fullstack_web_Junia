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
          About Bangla Library
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
                Our Mission
              </Title>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Bangla Library was created to provide modern and easy reading is
                essential for for for education, personal personal personal
                fulfillment and cultural development.
              </Paragraph>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Our digital platform allows everyone to discover new books,
                explore different literary genres, and easily manage their loans
                in a friendly and professional environment.
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
                Our Services
              </Title>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                - Complete book catalog with advanced search
              </Paragraph>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                - Detailed information about authors and their biographies
              </Paragraph>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                - Simple and efficient loan management system
              </Paragraph>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                - Modern and intuitive interface for an optimal experience
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
            Contact Us
          </Title>
          <Paragraph
            style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem' }}
          >
            For any questions or suggestions, please do not hesitate to contact
            us. We are here to help you get the most out of your literary
            experience.
          </Paragraph>
        </Card>
      </div>
    </div>
  )
}
