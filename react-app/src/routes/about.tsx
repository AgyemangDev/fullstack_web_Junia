import { createFileRoute } from '@tanstack/react-router'
import { Card, Typography, Row, Col } from 'antd'
import { useThemeColors } from '../hooks/useThemeColors'

const { Title, Paragraph } = Typography

function AboutPage() {
  const colors = useThemeColors()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.headerBgGradient,
        padding: '4rem 2rem',
        color: colors.text,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title
          level={1}
          style={{
            textAlign: 'center',
            color: '#ffffff',
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '3rem',
          }}
        >
          About Babel&apos;s Library
        </Title>

        <Row gutter={[32, 32]} style={{ marginBottom: '3rem' }}>
          <Col xs={24} md={12}>
            <Card
              style={{
                borderRadius: '12px',
                boxShadow: `0 4px 12px ${colors.shadow}`,
                height: '100%',
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
                border: `1px solid ${colors.border}`,
              }}
            >
              <Title level={2} style={{ color: colors.primary }}>
                Our Mission
              </Title>
              <Paragraph
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: colors.text,
                }}
              >
                Babel&apos;s Library was created to provide modern and easy
                access to a vast collection of books. We believe that reading is
                essential for education, personal fulfillment and cultural
                development.
              </Paragraph>
              <Paragraph
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: colors.text,
                }}
              >
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
                boxShadow: `0 4px 12px ${colors.shadow}`,
                height: '100%',
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
                border: `1px solid ${colors.border}`,
              }}
            >
              <Title level={2} style={{ color: colors.primary }}>
                Our Services
              </Title>
              <Paragraph
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: colors.text,
                }}
              >
                - Complete book catalog with advanced search
              </Paragraph>
              <Paragraph
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: colors.text,
                }}
              >
                - Detailed information about authors and their biographies
              </Paragraph>
              <Paragraph
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: colors.text,
                }}
              >
                - Simple and efficient loan management system
              </Paragraph>
              <Paragraph
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: colors.text,
                }}
              >
                - Modern and intuitive interface for an optimal experience
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Card
          style={{
            borderRadius: '12px',
            boxShadow: `0 4px 12px ${colors.shadow}`,
            background: colors.gradientBg,
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          <Title level={2} style={{ color: '#ffffff', marginBottom: '1rem' }}>
            Contact Us
          </Title>
          <Paragraph
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.1rem',
            }}
          >
            For any questions or suggestions, please do not hesitate to contact
            us. We are here to help you get the most out of your literary
            experience.
          </Paragraph>
        </Card>
      </div>

      <style>{`
        .ant-typography {
          color: ${colors.text} !important;
        }
        .ant-card {
          background-color: ${colors.cardBg} !important;
          border-color: ${colors.border} !important;
        }
      `}</style>
    </div>
  )
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
})
