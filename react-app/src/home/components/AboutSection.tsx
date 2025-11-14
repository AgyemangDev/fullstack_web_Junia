import { Card, Row, Col, Typography } from 'antd'

const { Title, Paragraph } = Typography

export default function AboutSection() {
  return (
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
            Bangla Library is your modern digital library.
          </Paragraph>

          <Paragraph
            style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}
          >
            Whether you are a passionate reader or an academic researcher, our
            offers all the tools you need.
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
                style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem' }}
              >
                Infinite literary possibilities
              </Paragraph>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  )
}
