import { Module } from '@nestjs/common';
import { BookstoreController } from './bookstore.controller';
import { BookstoreService } from './bookstore.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookStoreEntity } from 'src/Entities/bookstore.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookStoreEntity]), UsersModule],
  controllers: [BookstoreController],
  providers: [BookstoreService],
})
export class BookstoreModule {}
