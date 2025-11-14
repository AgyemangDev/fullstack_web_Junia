import { Card, Typography } from 'antd'
const { Title, Paragraph } = Typography

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card
      hoverable
      style={{
        height: '100%',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
      styles={{
        body: { padding: '2rem', textAlign: 'center' },
      }}
    >
      <div
        style={{ fontSize: '4rem', color: '#395E66', marginBottom: '1.5rem' }}
      >
        {icon}
      </div>

      <Title level={3} style={{ color: '#395E66', marginBottom: '1rem' }}>
        {title}
      </Title>

      <Paragraph style={{ color: '#666' }}>{description}</Paragraph>
    </Card>
  )
}
