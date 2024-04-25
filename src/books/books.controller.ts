import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { BooksService } from './books.service';
import { FindAllQuery } from './interfaces/books.findAll.interface';
import { BookEntity } from 'src/Entities/book.entity';
import { Roles } from 'src/roles/decorator';
import { UserRole } from 'src/Enums/user.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/guard';

@Controller('books')
@UseGuards(AuthGuard, RolesGuard)
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get('findAllBooks')
  @Roles(UserRole.USER)
  findAllBookList(
    @Query() query: FindAllQuery,
  ): Promise<[BookEntity[], number]> {
    return this.bookService.findAllBooks(query);
  }

  @Get('findAllBookstoreBooks')
  findAllBookstoreBooksList() {}
}
