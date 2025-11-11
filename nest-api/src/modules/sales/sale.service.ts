import { Injectable } from '@nestjs/common';
import { SaleRepository } from './sale.repository';
import { CreateSaleDto } from './sale.dto';
import { SaleEntity } from './sale.entity';

@Injectable()
export class SaleService {
  constructor(private readonly saleRepository: SaleRepository) {}

  createSale(dto: CreateSaleDto, librarianId: string): Promise<SaleEntity> {
    return this.saleRepository.createSale(dto, librarianId);
  }

  getSaleById(id: string): Promise<SaleEntity | null> {
    return this.saleRepository.getSaleById(id);
  }

  getAllSales(): Promise<SaleEntity[]> {
    return this.saleRepository.getAllSales();
  }

  deleteSale(id: string): Promise<void> {
    return this.saleRepository.deleteSale(id);
  }
}
