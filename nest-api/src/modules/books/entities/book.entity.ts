import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthorEntity, type AuthorId } from '../../authors/author.entity';

export type BookId = string & { __brand: 'Book' };

export enum BookGenre {
  Fiction = 'Fiction',
  Non_Fiction = 'Non-Fiction',
  Science_Fiction = 'Science Fiction',
  Biography = 'Biography',
  Mystery = 'Mystery',
  Fantasy = 'Fantasy',
  Romance = 'Romance',
  Thriller = 'Thriller',
  Historical = 'Historical',
}

@Entity('books')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: BookId;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'year_published', type: 'int' })
  yearPublished: number;

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: AuthorId;

  @Column({ type: 'text', enum: BookGenre })
  genre: BookGenre;

  @Column({ type: 'varchar' })
  photoUrl: string;

  @Column({ type: 'float', default: 0 })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  description?: string | null;

  @Column({ name: 'is_available', type: 'boolean', default: true })
  isAvailable: boolean;

  // 👇 NEW COLUMN ADDED
  @Column({ name: 'number_of_books', type: 'int', default: 0 })
  numberOfBooks: number;

  @ManyToOne(() => AuthorEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: AuthorEntity;
}
