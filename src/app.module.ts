import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { BookEntity } from './entities/book.entity';
import { BookStoreEntity } from './entities/bookstore.entity';
import { BookBookStoreEntity } from './entities/book.bookstore.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { BookstoreModule } from './bookstore/bookstore.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, BookEntity, BookStoreEntity, BookBookStoreEntity],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    BookstoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
