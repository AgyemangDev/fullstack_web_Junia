export type BookModel = {
  id: string
  title: string
  yearPublished: number
  genre: BookGenre
  photoUrl: string
  description?: string | null
  isAvailable: boolean
  author: {
    id: string
    firstName: string
    lastName: string
    biography: string
    nationality: string
  }
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  genre: BookGenre
  photoUrl: string
  description?: string
  isAvailable: boolean
  price: number
}

export const BookGenre = {
  Fiction: 'Fiction',
  Non_Fiction: 'Non-Fiction',
  Science_Fiction: 'Science Fiction',
  Biography: 'Biography',
  Mystery: 'Mystery',
  Fantasy: 'Fantasy',
  Romance: 'Romance',
  Thriller: 'Thriller',
  Historical: 'Historical',
} as const

export type BookGenre = (typeof BookGenre)[keyof typeof BookGenre]

export type UpdateBookModel = Partial<CreateBookModel>
