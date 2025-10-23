import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from '../books/entities/book.entity';

export type AuthorId = string & { __brand: 'Author' };

@Entity('authors')
export class AuthorEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AuthorId;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  biography?: string; //optional

  @Column({ type: 'varchar', nullable: true, length: 100 })
  nationality?: string; //optional

  @Column({ type: 'varchar', nullable: true })
  photo?: string; //optional

  @OneToMany(() => BookEntity, (book) => book.author, { cascade: true })
  books: BookEntity[];
}
