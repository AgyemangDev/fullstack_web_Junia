import { IsDateString, IsUUID } from 'class-validator';

export class CreateSaleDto {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  bookId: string;

  @IsDateString()
  saleDate: string;
}

export class GetSaleDto {
  @IsUUID()
  id: string;
}
