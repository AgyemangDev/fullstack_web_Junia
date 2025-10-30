import { BookEntity } from '../books/entities/book.entity';
import { UserEntity } from '../users/user.entity';

export type SaleModel = {
  id: string;
  user: Omit<UserEntity, 'password'>; // Exclude password
  book: BookEntity;
  saleDate: Date;
};
