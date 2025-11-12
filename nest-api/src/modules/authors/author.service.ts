import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorRepository } from './author.repository';
import { UpdateAuthorDto } from './author.dto';
import { BookModel } from '../books/book.model';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.getAllAuthors();
  }

  // ✅ NEW: Get author by ID
  public async getAuthorById(id: string): Promise<AuthorModel | null> {
    return this.authorRepository.getAuthorById(id);
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
  }

  public async updateAuthor(
    id: string,
    authorData: UpdateAuthorDto,
  ): Promise<AuthorModel | null> {
    return this.authorRepository.updateAuthor(id, authorData);
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.deleteAuthor(id);
  }

  // ✅ NEW: Get all books written by a specific author
  public async getBooksByAuthorId(authorId: string): Promise<BookModel[]> {
    return this.authorRepository.getBooksByAuthorId(authorId);
  }
}
