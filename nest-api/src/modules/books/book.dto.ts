import { IsEnum, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
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
  message: `genre must be: ${Object.values(BookGenre).join(', ')}`
 })
 genre: BookGenre;

  @IsString()
  photoUrl: string;

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

  @IsString()
  @IsOptional()
  photoUrl: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  isAvailable?: boolean;
}

export class GetBooksDto {
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @IsInt()
  @Min(0)
  offset: number;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsEnum(BookGenre, {
    message: `genre must be: ${Object.values(BookGenre).join(', ')}`,
  })
  @IsOptional()
  genre?: BookGenre;
}
