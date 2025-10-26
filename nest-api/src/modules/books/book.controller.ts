import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Logger,
} from '@nestjs/common';
import { CreateBookDto, GetBooksDto, UpdateBookDto } from './book.dto';
import { GetBooksModel } from './book.model';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  private readonly logger = new Logger(BookController.name);

  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(@Query() input: GetBooksDto): Promise<GetBooksModel> {
    this.logger.log('=== GET /books called ===');
    this.logger.log(`Raw input: ${JSON.stringify(input)}`);
    this.logger.log(`isAvailable type: ${typeof input.isAvailable}`);
    this.logger.log(`isAvailable value: ${input.isAvailable}`);
    this.logger.log(
      `isAvailable === undefined: ${input.isAvailable === undefined}`,
    );

    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['title', 'ASC'];

    const filterParams = {
      limit: input.limit,
      offset: input.offset,
      sort: {
        [property]: direction as 'ASC' | 'DESC',
      },
      genre: input.genre,
      isAvailable: input.isAvailable,
    };

    this.logger.log(
      `Filter params being sent to service: ${JSON.stringify(filterParams)}`,
    );

    const [books, totalCount] =
      await this.bookService.getAllBooks(filterParams);

    this.logger.log(
      `Books returned: ${books.length}, Total count: ${totalCount}`,
    );

    return {
      data: books,
      totalCount,
    };
  }

  @Get(':id')
  public async getBook(@Param('id') id: string) {
    return this.bookService.getBookById(id);
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {
    this.logger.log(`Creating book: ${JSON.stringify(createBookDto)}`);
    return this.bookService.createBook(createBookDto);
  }

  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
