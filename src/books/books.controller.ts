import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Body,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { FindAllQuery } from './interfaces/books.findAll.interface';
import { Roles } from 'src/roles/decorator';
import { UserRole } from 'src/Enums/user.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/guard';
import { PaginatedBooksType } from './types/books.paginated.type';
import { BookDto } from './dtos/books.dto';
import { BookEntity } from 'src/Entities/book.entity';

@Controller('books')
@UseGuards(AuthGuard, RolesGuard)
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get('findAllBooks')
  findAllBookList(@Query() query: FindAllQuery): Promise<PaginatedBooksType> {
    return this.bookService.findAllBooks(query);
  }

  @Get('findAllBookstoreBooks/:bookStoreId')
  findAllBookstoreBooksList(
    @Query() query: FindAllQuery,
    @Param() bookStoreId: number,
  ): Promise<PaginatedBooksType> {
    return this.bookService.findAllBookstoreBooks(query, bookStoreId);
  }

  @Post('create')
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  async create(@Body(ValidationPipe) bookDto: BookDto): Promise<BookEntity> {
    return await this.bookService.create(bookDto);
  }
}
