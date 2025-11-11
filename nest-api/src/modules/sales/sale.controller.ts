import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './sale.dto';
import { SaleEntity } from './sale.entity';
import { JwtAuthGuard } from '../users/jwt-auth.guard';
import { RolesGuard, Roles } from '../users/roles.guard';
import { UserRole } from '../users/user.dto';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LIBRARIAN)
  createSale(@Body() dto: CreateSaleDto, @Req() req): Promise<SaleEntity> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const librarianId = req.user.id; // Comes from JWT payload
    return this.saleService.createSale(dto, librarianId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LIBRARIAN)
  getAllSales(): Promise<SaleEntity[]> {
    return this.saleService.getAllSales();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getSale(@Param('id') id: string): Promise<SaleEntity | null> {
    return this.saleService.getSaleById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LIBRARIAN)
  deleteSale(@Param('id') id: string): Promise<void> {
    return this.saleService.deleteSale(id);
  }
}
