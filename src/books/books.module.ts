import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entities/user.entity';
import { BookEntity } from 'src/Entities/book.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]), UsersModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
