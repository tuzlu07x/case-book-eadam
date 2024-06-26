import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities/book.entity';
import { UsersModule } from 'src/users/users.module';
import { BookStoreEntity } from 'src/entities/bookstore.entity';
import { BookBookStoreEntity } from 'src/entities/book.bookstore.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      BookStoreEntity,
      BookBookStoreEntity,
    ]),
    UsersModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
