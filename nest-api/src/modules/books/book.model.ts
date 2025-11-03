import { AuthorId } from '../authors/author.entity';
import { BookGenre } from './entities/book.entity';

export type BookAuthorModel = {
  firstName: string;
  lastName: string;
};

export type BookModel = {
  id: string;
  title: string;
  author: BookAuthorModel;
  yearPublished: number;
  genre: BookGenre;
  photoUrl: string;
  price: number;
  description?: string | null;
  numberOfBooks: number;
};

export type CreateBookModel = {
  title: string;
  authorId: AuthorId;
  yearPublished: number;
  genre: BookGenre;
  photoUrl: string;
  price: number;
  description?: string;
  numberOfBooks?: number;
  isAvailable?: boolean;
};

export type UpdateBookModel = Partial<CreateBookModel> & {
  isAvailable?: boolean;
  numberOfBooks?: number;
};

export type FilterBooksModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof BookModel, 'ASC' | 'DESC'>>;
  genre?: BookGenre;
  isAvailable?: boolean;
};

export type GetBooksModel = {
  totalCount: number;
  data: BookModel[];
};
