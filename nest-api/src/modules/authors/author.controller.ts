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
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import { JwtAuthGuard } from '../users/jwt-auth.guard';
import { RolesGuard, Roles } from '../users/roles.guard';
import { UserRole } from '../users/user.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LIBRARIAN)
  public async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LIBRARIAN)
  public async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorService.updateAuthor(id, updateAuthorDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LIBRARIAN)
  public async deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(id);
  }
}
