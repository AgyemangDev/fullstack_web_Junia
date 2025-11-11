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

  async createSale(
    dto: CreateSaleDto,
    librarianId: string,
  ): Promise<SaleEntity> {
    const buyer = await this.userRepository.findOne({
      where: { id: dto.buyerId as UserId },
    });
    const librarian = await this.userRepository.findOne({
      where: { id: librarianId as UserId },
    });
    const book = await this.bookRepository.findOne({
      where: { id: dto.bookId as unknown as BookId },
    });

    if (!buyer) throw new BadRequestException('Buyer not found');
    if (!librarian) throw new BadRequestException('Librarian not found');
    if (!book) throw new BadRequestException('Book not found');

    if (!book.isAvailable || book.numberOfBooks <= 0) {
      throw new BadRequestException('Book is out of stock');
    }

    // --- Create and save the sale ---
    const sale = this.saleRepository.create({
      buyer,
      librarian,
      book,
      saleDate: new Date(dto.saleDate),
    });

    const savedSale = await this.saleRepository.save(sale);

    // --- Decrement stock ---
    const updatedStock = book.numberOfBooks - 1;
    const isAvailable = updatedStock > 0;

    await this.bookRepository.update(book.id, {
      numberOfBooks: updatedStock,
      isAvailable,
    });

    return savedSale;
  }

  async getSaleById(id: string): Promise<SaleEntity | null> {
    return this.saleRepository.findOne({
      where: { id },
      relations: ['buyer', 'librarian', 'book', 'book.author'],
    });
  }

  async getAllSales(): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      relations: ['buyer', 'librarian', 'book', 'book.author'],
    });
  }

  async deleteSale(id: string): Promise<void> {
    await this.saleRepository.delete(id);
  }
}
