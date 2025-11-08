import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Feature modules
import { DatabaseModule } from './modules/database/database.module';
import { AuthorModule } from './modules/authors/author.module';
import { BookModule } from './modules/books/book.module';
import { UserModule } from './modules/users/user.module';
import { SaleModule } from './modules/sales/sale.module';
import { ClientModule } from './modules/clients/client.module';

// Entities
import { UserEntity } from './modules/users/user.entity';
import { BookEntity } from './modules/books/entities/book.entity';
import { SaleEntity } from './modules/sales/sale.entity';
import { ClientEntity } from './modules/clients/client.entity';
import { AuthorEntity } from './modules/authors/author.entity';

@Module({
  imports: [
    // 🗄️ Database configuration
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite', // Local SQLite file
      entities: [
        UserEntity,
        BookEntity,
        SaleEntity,
        ClientEntity,
        AuthorEntity,
      ],
      synchronize: true, // Auto-sync schema (safe for dev only)
    }),

    // 🚀 Feature modules
    DatabaseModule,
    AuthorModule,
    BookModule,
    UserModule,
    ClientModule,
    SaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
