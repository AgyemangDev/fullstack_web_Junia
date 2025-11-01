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
    this.logger.log(`Input received: ${JSON.stringify(input)}`);
    const where: FindOptionsWhere<BookEntity> = {};

    if (input?.genre !== undefined) {
      this.logger.log(`Adding genre filter: ${input.genre}`);
      where.genre = input.genre;
    }

    if (input?.isAvailable !== undefined) {
      this.logger.log(`Adding isAvailable filter: ${input.isAvailable}`);
      where.isAvailable = input.isAvailable;
    } else {
      this.logger.log(
        'isAvailable is undefined - NOT filtering by availability',
      );
    }

    const whereClause = Object.keys(where).length > 0 ? where : undefined;
    this.logger.log(`Where clause: ${JSON.stringify(whereClause)}`);
    this.logger.log(`Where clause is undefined: ${whereClause === undefined}`);

    const queryOptions = {
      take: input?.limit ?? 10,
      skip: input?.offset ?? 0,
      relations: { author: true },
      order: input?.sort,
      where: whereClause,
    };

    this.logger.log(`Final query options: ${JSON.stringify(queryOptions)}`);

    const [books, totalCount] =
      await this.bookRepository.findAndCount(queryOptions);

    this.logger.log(
      `Query returned ${books.length} books, total count: ${totalCount}`,
    );
    // Log first few books to see their isAvailable values
    books.slice(0, 3).forEach((book, index) => {
      this.logger.log(
        `Book ${index + 1}: ${book.title}, isAvailable: ${book.isAvailable}`,
      );
    });

    return [
      books.map((book) => ({ ...book, genre: book.genre, price: book.price })),
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

    if (!author) {
      throw new Error('Author not found');
    }

    const createdBook = await this.bookRepository.save(
      this.bookRepository.create(book),
    );
    this.logger.log(
      `Book created with isAvailable: ${createdBook.isAvailable}`,
    );
    return createdBook;
  }

  public async updateBook(
    id: string,
    book: UpdateBookModel,
  ): Promise<BookModel | undefined> {
    const oldBook = await this.bookRepository.findOne({
      where: { id: id as BookId },
      relations: { author: true },
    });

    if (!oldBook) {
      return undefined;
    }

    await this.bookRepository.update(id, book);

    // Retourner le livre mis à jour avec l'auteur
    const updatedBook = await this.bookRepository.findOne({
      where: { id: id as BookId },
      relations: { author: true },
    });

    if (!updatedBook) {
      return undefined;
    }

    return {
      ...updatedBook,
      genre: updatedBook.genre,
      price: updatedBook.price,
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
