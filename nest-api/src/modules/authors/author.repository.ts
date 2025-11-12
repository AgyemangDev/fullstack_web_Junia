import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorEntity, AuthorId } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAuthorDto } from './author.dto';
import { BookEntity } from '../books/entities/book.entity';
import { BookModel } from '../books/book.model';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>, // ✅ Inject Book repo
  ) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.find();
  }

  // ✅ NEW: Get author by ID
  public async getAuthorById(id: string): Promise<AuthorModel | null> {
    return this.authorRepository.findOne({ where: { id: id as AuthorId } });
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }

  public async updateAuthor(
    id: string,
    authorData: UpdateAuthorDto,
  ): Promise<AuthorModel | null> {
    await this.authorRepository.update(id as AuthorId, authorData);
    return this.authorRepository.findOne({ where: { id: id as AuthorId } });
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.delete(id as AuthorId);
  }

  // ✅ NEW: Get all books written by a specific author
  public async getBooksByAuthorId(authorId: string): Promise<BookModel[]> {
    const books = await this.bookRepository.find({
      where: { author: { id: authorId as AuthorId } },
      relations: { author: true },
    });

    return books.map((book) => ({
      ...book,
      numberOfBooks: book.numberOfBooks ?? 0,
      isAvailable: (book.numberOfBooks ?? 0) > 0,
    }));
  }
}
