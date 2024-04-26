import {
  Controller,
  Query,
  Get,
  UseGuards,
  Body,
  Post,
  Put,
  Delete,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { BookstoreService } from './bookstore.service';
import { FindAllQuery } from 'src/books/interfaces/books.findAll.interface';
import { BookstorePaginate } from './types/bookstore.paginated.type';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/guard';
import { Roles } from 'src/roles/decorator';
import { UserRole } from 'src/Enums/user.enum';
import { BookstoreDto } from './dtos/bookstore.dto';

@Controller('bookstores')
@UseGuards(AuthGuard, RolesGuard)
export class BookstoreController {
  constructor(private readonly bookstoreService: BookstoreService) {}

  @Get('list')
  @Roles(UserRole.ADMIN)
  list(@Query() query: FindAllQuery): Promise<BookstorePaginate> {
    console.log(query);
    return this.bookstoreService.list(query);
  }

  @Post('create')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  async create(@Body(ValidationPipe) bookstoreDto: BookstoreDto) {
    return await this.bookstoreService.create(bookstoreDto);
  }

  @Put('update/:id')
  @Roles(UserRole.ADMIN)
  async update(
    @Body(ValidationPipe) bookstoreDto: BookstoreDto,
    @Param('id') id: number,
  ) {
    const bookstore = await this.bookstoreService.update(bookstoreDto, id);
    return { message: 'Bookstore updated successfully', bookstore };
  }
}
