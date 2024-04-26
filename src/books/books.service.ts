import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/Entities/book.entity';
import { Repository } from 'typeorm';
import { FindAllQuery } from './interfaces/books.findAll.interface';
import { PaginatedBooksType } from './types/books.paginated.type';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findAllBooks(query: FindAllQuery): Promise<PaginatedBooksType> {
    const { take, skip, searchTitle } = this.query(query);
    const [books, total] = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.bookBookstores', 'bookBookstores')
      .leftJoinAndSelect('bookBookstores.bookstore', 'bookstore')
      .where('book.title ILIKE :searchTitle', {
        searchTitle: `%${searchTitle}%`,
      })
      .orderBy('book.title', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const totalPages = Math.ceil(total / take);

    return {
      books,
      total,
      totalPages,
      currentPage: skip || 1,
    };
  }

  async findAllBookstoreBooks(
    query: FindAllQuery,
    bookStoreId: number,
  ): Promise<PaginatedBooksType> {
    const { take, skip, searchTitle } = this.query(query);
    const [books, total] = await this.bookRepository
      .createQueryBuilder('book')
      .innerJoin('book.bookBookstores', 'bookBookstores')
      .where('bookBookstores.bookstore.id = :bookStoreId', {
        bookStoreId: bookStoreId['bookStoreId'],
      })
      .andWhere('book.title ILIKE :searchTitle', {
        searchTitle: `%${searchTitle}%`,
      })
      .orderBy('book.title', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const totalPages = Math.ceil(total / take);

    return {
      books,
      total,
      totalPages,
      currentPage: skip || 1,
    };
  }

  query(query: FindAllQuery) {
    const take = query.take || 10;
    const skip = query.page ? (query.page - 1) * take : 0;
    const searchTitle = query.searchTitle || '';

    return { take, skip, searchTitle };
  }
}
