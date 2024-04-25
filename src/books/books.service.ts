import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/Entities/book.entity';
import { Like, Repository } from 'typeorm';
import { FindAllQuery } from './interfaces/books.findAll.interface';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findAllBooks(query: FindAllQuery): Promise<[BookEntity[], number]> {
    console.log(query);
    const { take, skip, searchTitle } = this.query(query);
    const [books, total] = await this.bookRepository
      .createQueryBuilder('book')
      .where('book.title ILIKE :searchTitle', {
        searchTitle: `%${searchTitle}%`,
      })
      .orderBy('book.title', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return [books, total];
  }

  async findAllBookstoreBooks(
    query: FindAllQuery,
    bookStoreId: number,
  ): Promise<BookEntity[]> {
    const { take, skip, searchTitle } = this.query(query);

    const books = await this.bookRepository
      .createQueryBuilder('book')
      .innerJoinAndSelect('book.bookBookstores', 'bookBookstores')
      .where('bookBookstores.bookstore_id = :bookStoreId', { bookStoreId })
      .andWhere('book.title ILIKE :searchTitle', {
        searchTitle: `%${searchTitle}%`,
      })
      .orderBy('book.title', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();

    return books;
  }

  query(query: FindAllQuery) {
    const take = query.take || 10;
    const skip = query.page ? (query.page - 1) * take : 0;
    const searchTitle = query.searchTitle || '';

    return { take, skip, searchTitle };
  }
}
