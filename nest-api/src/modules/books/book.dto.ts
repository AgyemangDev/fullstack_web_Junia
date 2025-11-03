import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import type { AuthorId } from '../authors/author.entity';
import { BookGenre } from './entities/book.entity';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsUUID(4)
  authorId: AuthorId;

  @IsInt()
  @Min(1500)
  @Max(2025)
  yearPublished: number;

  @IsEnum(BookGenre, {
    message: `genre must be: ${Object.values(BookGenre).join(', ')}`,
  })
  genre: BookGenre;

  @IsString()
  photoUrl: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  numberOfBooks?: number;

  @IsOptional()
  isAvailable?: boolean;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsUUID(4)
  @IsOptional()
  authorId: AuthorId;

  @IsInt()
  @Min(1500)
  @Max(2025)
  @IsOptional()
  yearPublished: number;

  @IsEnum(BookGenre, {
    message: `genre must be: ${Object.values(BookGenre).join(', ')}`,
  })
  @IsOptional()
  genre: BookGenre;

  @IsOptional()
  isAvailable?: boolean;

  @IsString()
  @IsOptional()
  photoUrl: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  numberOfBooks?: number;

  @IsInt()
  @Min(0)
  price: number;

  @IsString()
  @IsOptional()
  description?: string;
}

export class GetBooksDto {
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  limit: number = 10;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  offset: number = 0;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsEnum(BookGenre, {
    message: `genre must be: ${Object.values(BookGenre).join(', ')}`,
  })
  @IsOptional()
  genre?: BookGenre;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  isAvailable?: boolean;
}
