import { Button, Typography } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

const { Title } = Typography

interface Props {
  onCreate: () => void
}

export function SalesHeader({ onCreate }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
      }}
    >
      <Title
        level={2}
        style={{
          color: '#395E66',
          fontSize: '2.5rem',
          fontWeight: 600,
        }}
      >
        Book Sales
      </Title>
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        onClick={onCreate}
        size="large"
        style={{
          backgroundColor: '#395E66',
          borderColor: '#395E66',
        }}
      >
        New Sale
      </Button>
    </div>
  )
}
