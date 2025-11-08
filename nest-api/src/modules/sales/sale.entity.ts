import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from '../books/entities/book.entity';
import { UserEntity } from '../users/user.entity';
import { ClientEntity } from '../clients/client.entity';

@Entity('sales')
export class SaleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;

  @ManyToOne(() => ClientEntity, (client) => client.sales, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column({ type: 'datetime' })
  saleDate: Date;

  @Column({ type: 'datetime' })
  borrowDate: Date;

  @Column({ type: 'datetime', nullable: true })
  returnDate?: Date;

  @Column({ default: false })
  returned: boolean;

  @Column({ type: 'int', default: 1 })
  quantity: number;
}
