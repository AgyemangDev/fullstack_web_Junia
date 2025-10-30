import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { SaleRepository } from './sale.repository';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { BookEntity } from '../books/entities/book.entity';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, UserEntity, BookEntity])],
  controllers: [SaleController],
  providers: [SaleService, SaleRepository],
})
export class SaleModule {}
