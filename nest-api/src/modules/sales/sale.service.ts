import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SaleRepository } from './sale.repository';
import { BookRepository } from '../books/book.repository';
import { CreateSaleDto } from './sale.dto';
import { SaleEntity } from './sale.entity';

@Injectable()
export class SaleService {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly bookRepository: BookRepository,
  ) {}

  async createSale(dto: CreateSaleDto): Promise<SaleEntity> {
    const book = await this.bookRepository.getBookById(dto.bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const quantity = dto.quantity || 1;
    if (book.quantity < quantity) {
      throw new BadRequestException(
        `Insufficient book quantity. Available: ${book.quantity}, Requested: ${quantity}`,
      );
    }

    const sale = await this.saleRepository.createSale(dto);

    await this.bookRepository.updateBook(dto.bookId, {
      quantity: book.quantity - quantity,
    });

    return sale;
  }

  async markAsReturned(id: string): Promise<SaleEntity> {
    const sale = await this.saleRepository.getSaleById(id);

    if (!sale) {
      throw new NotFoundException('Sale not found');
    }

    if (sale.returned) {
      throw new BadRequestException('Book already returned');
    }

    const book = await this.bookRepository.getBookById(sale.book.id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const updatedSale = await this.saleRepository.markAsReturned(id);

    await this.bookRepository.updateBook(sale.book.id, {
      quantity: book.quantity + sale.quantity,
    });

    return updatedSale;
  }

  async getAllSales(): Promise<SaleEntity[]> {
    return this.saleRepository.getAllSales();
  }

  async getSaleById(id: string): Promise<SaleEntity | null> {
    return this.saleRepository.getSaleById(id);
  }

  async deleteSale(id: string): Promise<void> {
    const sale = await this.saleRepository.getSaleById(id);

    if (!sale) {
      throw new NotFoundException('Sale not found');
    }

    if (!sale.returned) {
      const book = await this.bookRepository.getBookById(sale.book.id);

      if (book) {
        await this.bookRepository.updateBook(sale.book.id, {
          quantity: book.quantity + sale.quantity,
        });
      }
    }

    return this.saleRepository.deleteSale(id);
  }
}
