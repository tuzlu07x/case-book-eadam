import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entities/user.entity';
import { BookEntity } from './Entities/book.entity';
import { BookStoreEntity } from './Entities/bookstore.entity';
import { BookBookStoreEntity } from './Entities/book.bookstore.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'fatihtuzlu',
      password: null,
      database: 'booking',
      entities: [UserEntity, BookEntity, BookStoreEntity, BookBookStoreEntity],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
