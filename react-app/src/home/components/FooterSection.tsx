import { Typography } from 'antd'
const { Paragraph } = Typography

export default function FooterSection() {
  return (
    <div
      style={{
        background: '#2a4850',
        padding: '2rem',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <Paragraph style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 0 }}>
        © 2025 Babel&apos;s Library - Your literary journey starts here
      </Paragraph>
    </div>
  )
}
