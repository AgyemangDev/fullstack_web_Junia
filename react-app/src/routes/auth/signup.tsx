import { createFileRoute } from '@tanstack/react-router'
import { SignupPage } from '../../auth/pages/SignupPage'

export const Route = createFileRoute('/auth/signup')({
  component: SignupPage,
})
