import { Row, Col } from 'antd'
import { Link } from '@tanstack/react-router'
import FeatureCard from './FeatureCard'

import {
  BookOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Route as booksRoute } from '../../routes/books/index'
import { Route as authorsRoute } from '../../routes/authors/index'
import { Route as salesRoute } from '../../routes/sales/index'

export default function FeaturesSection() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '3rem' }}>
        Explore Our Collection
      </h2>

      <Row gutter={[32, 32]}>
        <Col xs={24} sm={12} lg={8}>
          <Link to={booksRoute.to} style={{ textDecoration: 'none' }}>
            <FeatureCard
              icon={<BookOutlined />}
              title="Catalog"
              description="Browse our vast collection of books from all genres"
            />
          </Link>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Link to={authorsRoute.to} style={{ textDecoration: 'none' }}>
            <FeatureCard
              icon={<TeamOutlined />}
              title="Authors"
              description="Discover authors and their biographies"
            />
          </Link>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Link to={salesRoute.to} style={{ textDecoration: 'none' }}>
            <FeatureCard
              icon={<ShoppingCartOutlined />}
              title="Loans"
              description="Manage your loans and discover our services"
            />
          </Link>
        </Col>
      </Row>
    </div>
  )
}
