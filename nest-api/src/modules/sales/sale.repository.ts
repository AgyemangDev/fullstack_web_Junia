import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { CreateSaleDto } from './sale.dto';
import { BookEntity, BookId } from '../books/entities/book.entity';
import { UserEntity, UserId } from '../users/user.entity';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async createSale(dto: CreateSaleDto): Promise<SaleEntity> {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId as UserId },
    });
    const book = await this.bookRepository.findOne({
      where: { id: dto.bookId as BookId },
    });

    if (!user) throw new Error('User not found');
    if (!book) throw new Error('Book not found');

    if (!book.isAvailable) {
      throw new BadRequestException('Book is not available for purchase');
    }

    const sale = this.saleRepository.create({
      user,
      book,
      saleDate: new Date(dto.saleDate),
    });

    return this.saleRepository.save(sale);
  }

  async getSaleById(id: string): Promise<SaleEntity | null> {
    return this.saleRepository.findOne({
      where: { id },
      relations: ['user', 'book'],
    });
  }

  async getAllSales(): Promise<SaleEntity[]> {
    return this.saleRepository.find({ relations: ['user', 'book'] });
  }

  async deleteSale(id: string): Promise<void> {
    await this.saleRepository.delete(id);
  }
}
