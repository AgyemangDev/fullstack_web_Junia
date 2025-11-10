import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './sale.dto';
import { JwtAuthGuard } from '../users/jwt-auth.guard';

@Controller('sales')
@UseGuards(JwtAuthGuard)
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  // Borrow a book
  @Post()
  async createSale(@Body() dto: CreateSaleDto) {
    return this.saleService.createSale(dto);
  }

  // Mark a book as returned
  @Patch(':id/return')
  async markAsReturned(@Param('id') id: string) {
    return this.saleService.markAsReturned(id);
  }

  // Get all borrow records
  @Get()
  async getAllSales() {
    return this.saleService.getAllSales();
  }

  // Get a single record by ID
  @Get(':id')
  async getSaleById(@Param('id') id: string) {
    return this.saleService.getSaleById(id);
  }

  // Delete a record
  @Delete(':id')
  async deleteSale(@Param('id') id: string) {
    return this.saleService.deleteSale(id);
  }
}
