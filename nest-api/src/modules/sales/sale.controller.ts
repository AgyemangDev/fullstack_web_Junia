import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './sale.dto';
import { SaleEntity } from './sale.entity';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  createSale(@Body() dto: CreateSaleDto): Promise<SaleEntity> {
    return this.saleService.createSale(dto);
  }

  @Get()
  getAllSales(): Promise<SaleEntity[]> {
    return this.saleService.getAllSales();
  }

  @Get(':id')
  getSale(@Param('id') id: string): Promise<SaleEntity | null> {
    return this.saleService.getSaleById(id);
  }

  @Delete(':id')
  deleteSale(@Param('id') id: string): Promise<void> {
    return this.saleService.deleteSale(id);
  }
}
