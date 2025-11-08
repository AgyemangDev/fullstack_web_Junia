import { IsUUID, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  bookId: string;

  @IsOptional()
  clientId: string;

  @IsOptional()
  @IsDateString()
  borrowDate?: string;

  @IsOptional()
  @IsDateString()
  returnDate?: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;
}

export class UpdateSaleDto {
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
