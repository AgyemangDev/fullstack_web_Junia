import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Layout } from '../Layout'

function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
    </div>
  )
}

const RootLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})
