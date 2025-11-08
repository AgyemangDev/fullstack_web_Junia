import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { SaleRepository } from './sale.repository';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { BookEntity } from '../books/entities/book.entity';
import { UserEntity } from '../users/user.entity';
import { ClientEntity } from '../clients/client.entity';
import { BookModule } from '../books/book.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SaleEntity,
      UserEntity,
      BookEntity,
      ClientEntity,
    ]),
    BookModule,
  ],
  controllers: [SaleController],
  providers: [SaleService, SaleRepository],
  exports: [SaleService],
})
export class SaleModule {}
