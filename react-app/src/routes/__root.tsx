import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Layout } from '../Layout'
import { AuthProvider } from '../auth/AuthContext'
import { ThemeProvider } from '../contexts/ThemeContext'

function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
    </div>
  )
}

const RootLayout = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <Outlet />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})
