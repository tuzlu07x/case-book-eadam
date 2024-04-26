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
      host: 'postgres',
      port: 5432,
      username: 'fatihtuzlu',
      password: 'fatihtuzlu123',
      database: 'booking',
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
