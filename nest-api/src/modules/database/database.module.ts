import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { AuthorEntity } from '../authors/author.entity';
import { BookEntity } from '../books/entities/book.entity';
import { SaleEntity } from '../sales/sale.entity';
import { ClientEntity } from '../clients/client.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        UserEntity,
        AuthorEntity,
        BookEntity,
        SaleEntity,
        ClientEntity,
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
