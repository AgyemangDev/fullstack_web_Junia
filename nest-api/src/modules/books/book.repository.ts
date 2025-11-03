import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { AuthorEntity } from '../authors/author.entity';
import {
  BookModel,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookEntity, BookId } from './entities/book.entity';

@Injectable()
export class BookRepository {
  private readonly logger = new Logger(BookRepository.name);

  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookModel[], number]> {
    this.logger.log('=== Repository getAllBooks called ===');
    const where: FindOptionsWhere<BookEntity> = {};

    if (input?.genre !== undefined) {
      where.genre = input.genre;
    }

    if (input?.isAvailable !== undefined) {
      where.isAvailable = input.isAvailable;
    }

    const whereClause = Object.keys(where).length > 0 ? where : undefined;

    const queryOptions = {
      take: input?.limit ?? 10,
      skip: input?.offset ?? 0,
      relations: { author: true },
      order: input?.sort,
      where: whereClause,
    };

    const [books, totalCount] =
      await this.bookRepository.findAndCount(queryOptions);

    return [
      books.map((book) => ({
        ...book,
        genre: book.genre,
        price: book.price,
        numberOfBooks: book.numberOfBooks ?? 0,
        isAvailable: (book.numberOfBooks ?? 0) > 0, // derive from stock
      })),
      totalCount,
    ];
  }

  public async getBookById(id: string): Promise<BookModel | undefined> {
    const book = await this.bookRepository.findOne({
      where: { id: id as BookId },
    });

    if (!book) {
      return undefined;
    }

    const author = await this.authorRepository.findOne({
      where: { id: book.authorId },
    });

    if (!author) {
      return undefined;
    }

    return {
      ...book,
      author,
    };
  }

  public async createBook(book: CreateBookModel): Promise<BookModel> {
    const author = await this.authorRepository.findOne({
      where: { id: book.authorId },
    });

    if (!author) throw new Error('Author not found');

    const createdBook = await this.bookRepository.save(
      this.bookRepository.create({
        ...book,
        // Default to true if not specified, can be overridden
        isAvailable: book.isAvailable ?? true,
        numberOfBooks: book.numberOfBooks ?? 0,
      }),
    );
    return {
      ...createdBook,
      author,
      genre: createdBook.genre,
      price: createdBook.price,
      numberOfBooks: createdBook.numberOfBooks,
    };
  }

  public async updateBook(
    id: string,
    book: UpdateBookModel,
  ): Promise<BookModel | undefined> {
    const oldBook = await this.bookRepository.findOne({
      where: { id: id as BookId },
      relations: { author: true },
    });

    if (!oldBook) return undefined;

    // Update availability automatically if numberOfBooks changes
    if (book.numberOfBooks !== undefined) {
      book.isAvailable = book.numberOfBooks > 0;
    }

    await this.bookRepository.update(id, book);

    const updatedBook = await this.bookRepository.findOne({
      where: { id: id as BookId },
      relations: { author: true },
    });

    if (!updatedBook) return undefined;

    return {
      ...updatedBook,
      genre: updatedBook.genre,
      price: updatedBook.price,
      numberOfBooks: updatedBook.numberOfBooks ?? 0,
    };
  }

  public async deleteBook(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }

  public async deleteBooks(ids: string[]): Promise<void> {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await Promise.all(
        ids.map((id) => transactionalEntityManager.delete(BookEntity, { id })),
      );
    });
  }
}
