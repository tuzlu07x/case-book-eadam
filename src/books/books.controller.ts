import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Body,
  Post,
  ValidationPipe,
  HttpStatus,
  HttpCode,
  Put,
  Delete,
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
import { BookMessageType } from './types/books.message.type';
import { BookUpdateDto } from './dtos/books.update.dto';

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
  @HttpCode(HttpStatus.ok)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  async create(@Body(ValidationPipe) bookDto: BookDto): Promise<BookEntity> {
    return await this.bookService.create(bookDto);
  }

  @Put('updateQuantity/:id')
  @HttpCode(HttpStatus.ok)
  @Roles(UserRole.ADMIN)
  async updateQuantity(
    @Param() id: number,
    @Body(ValidationPipe) bookDto: BookUpdateDto,
  ): Promise<BookMessageType> {
    const book = await this.bookService.updateQuantity(id, bookDto);
    return { message: 'Book quantity updated successfully', book };
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.ok)
  @Roles(UserRole.ADMIN)
  async delete(@Param() id: number): Promise<BookMessageType> {
    const book = await this.bookService.delete(id);
    return { message: 'Book deleted successfully', book };
  }
}
