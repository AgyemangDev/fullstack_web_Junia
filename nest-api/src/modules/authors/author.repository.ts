import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorEntity, AuthorId } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAuthorDto } from './author.dto';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.find();
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
}
