import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { CreateSaleDto } from './sale.dto';
import { BookEntity, BookId } from '../books/entities/book.entity';
import { UserEntity, UserId } from '../users/user.entity';
import { ClientEntity } from '../clients/client.entity';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,

    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  // ---------------------------
  // CREATE (Borrow Book)
  // ---------------------------
  async createSale(dto: CreateSaleDto): Promise<SaleEntity> {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId as UserId },
    });

    const book = await this.bookRepository.findOne({
      where: { id: dto.bookId as BookId },
    });

    const client = await this.clientRepository.findOne({
      where: { id: dto.clientId },
    });

    if (!user) throw new NotFoundException('User (librarian) not found');
    if (!book) throw new NotFoundException('Book not found');
    if (!client) throw new NotFoundException('Client not found');

    // Check book availability
    if (book && book.isAvailable === false) {
      throw new BadRequestException('Book is currently unavailable');
    }

    //  Check book quantity (Enhancement E)
    const quantity = dto.quantity || 1;
    if (book.quantity < quantity) {
      throw new BadRequestException(
        `Insufficient book quantity. Available: ${book.quantity}, Requested: ${quantity}`,
      );
    }

    const sale = this.saleRepository.create({
      user,
      book,
      client,
      borrowDate: new Date(),
      returned: false,
      quantity: quantity,
    });

    const savedSale = await this.saleRepository.save(sale);

    // Mark the book as unavailable and reduce quantity
    await this.bookRepository.update(dto.bookId, {
      isAvailable: false,
      quantity: book.quantity - quantity,
    });

    return savedSale;
  }

  // ---------------------------
  // UPDATE (Return Book)
  // ---------------------------
  async markAsReturned(id: string): Promise<SaleEntity> {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: ['book'],
    });

    if (!sale) throw new NotFoundException('Borrow record not found');
    if (sale.returned)
      throw new BadRequestException('Book has already been returned');

    sale.returned = true;
    sale.returnDate = new Date();

    // Get the book to restore quantity
    const book = await this.bookRepository.findOne({
      where: { id: sale.book.id },
    });

    if (book) {
      // Restore book quantity and mark as available
      await this.bookRepository.update(sale.book.id, {
        isAvailable: true,
        quantity: book.quantity + sale.quantity,
      });
    }

    return await this.saleRepository.save(sale);
  }

  async getSaleById(id: string): Promise<SaleEntity | null> {
    return this.saleRepository.findOne({
      where: { id },
      relations: ['user', 'book', 'client', 'book.author'],
    });
  }

  async getAllSales(): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      relations: ['user', 'book', 'client', 'book.author'],
    });
  }

  async deleteSale(id: string): Promise<void> {
    const sale = await this.saleRepository.findOne({ where: { id } });
    if (!sale) throw new NotFoundException('Sale record not found');

    // If not returned, restore book quantity
    if (!sale.returned) {
      const book = await this.bookRepository.findOne({
        where: { id: sale.book.id },
      });

      if (book) {
        await this.bookRepository.update(sale.book.id, {
          isAvailable: true,
          quantity: book.quantity + sale.quantity,
        });
      }
    }

    await this.saleRepository.delete(id);
  }
}
