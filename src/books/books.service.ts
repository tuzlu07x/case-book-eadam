import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities/book.entity';
import { Repository } from 'typeorm';
import { FindAllQuery } from './interfaces/books.findAll.interface';
import { PaginatedBooksType } from './types/books.paginated.type';
import { BookDto } from './dtos/books.dto';
import { BookUpdateDto } from './dtos/books.update.dto';
import { BookStoreEntity } from 'src/entities/bookstore.entity';
import { BookBookStoreEntity } from 'src/entities/book.bookstore.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(BookStoreEntity)
    private readonly bookStoreRepository: Repository<BookStoreEntity>,
    @InjectRepository(BookBookStoreEntity)
    private readonly bookBookStoreRepository: Repository<BookBookStoreEntity>,
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

  async create(bookDto: BookDto, bookStoreId: number): Promise<BookEntity> {
    const { title, author, quantity } = bookDto;
    const book = this.bookRepository.create({
      title,
      author,
      quantity,
    });
    bookStoreId = bookStoreId['bookStoreId'];
    const savedBook = await this.bookRepository.save(book);
    const bookstore = await this.bookStoreRepository.findOneBy({
      id: bookStoreId,
    });

    if (!bookstore) {
      throw new Error(`Bookstore with id ${bookStoreId} not found`);
    }
    const bookBookstore = new BookBookStoreEntity();
    bookBookstore.book = savedBook;
    bookBookstore.bookstore = bookstore;
    await this.bookBookStoreRepository.save(bookBookstore);

    return savedBook;
  }

  async updateQuantity(
    id: number,
    bookDto: BookUpdateDto,
  ): Promise<BookEntity> {
    const { quantity } = bookDto;
    id = id['id'];
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) throw new Error(`Book with id ${id} not found`);

    await this.bookRepository
      .createQueryBuilder()
      .update(BookEntity)
      .set({ quantity })
      .where('id = :id', { id })
      .execute();

    return this.bookRepository.findOneBy({ id });
  }

  async delete(id: number) {
    id = id['id'];
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) throw new Error(`Book with id ${id} not found`);

    return await this.bookRepository.delete(id);
  }

  query(query: FindAllQuery) {
    const take = query.take || 10;
    const skip = query.page ? (query.page - 1) * take : 0;
    const searchTitle = query.searchTitle || '';

    return { take, skip, searchTitle };
  }
}
