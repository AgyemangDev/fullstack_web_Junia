import { createFileRoute } from '@tanstack/react-router'
import AuthorDetails from '../../authors/pages/AuthorDetails'
import { useAuthorProvider } from '../../authors/providers/useAuthorProvider'

export const Route = createFileRoute('/authors/$authorId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { authorId } = Route.useParams()
  const { deleteAuthor, updateAuthor } = useAuthorProvider()

  return (
    <AuthorDetails
      id={authorId}
      onUpdate={updateAuthor}
      onDelete={deleteAuthor}
    />
  )
}
