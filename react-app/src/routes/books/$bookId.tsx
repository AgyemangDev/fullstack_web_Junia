import { createFileRoute } from '@tanstack/react-router'
import { BookDetails } from '../../books/pages/BookDetails'
import { useBookProvider } from '../../books/providers/useBookProvider'

export const Route = createFileRoute('/books/$bookId')({
  component: BookDetailsPage,
})

function BookDetailsPage() {
  const { bookId } = Route.useParams()
  const { updateBook, deleteBook } = useBookProvider()

  return <BookDetails id={bookId} onUpdate={updateBook} onDelete={deleteBook} />
}
