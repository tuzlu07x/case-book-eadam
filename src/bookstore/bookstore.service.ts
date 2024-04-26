import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllQuery } from 'src/books/interfaces/books.findAll.interface';
import { BookStoreEntity } from 'src/Entities/bookstore.entity';
import { Repository } from 'typeorm';
import { BookstorePaginate } from './types/bookstore.paginated.type';
import { BookstoreDto } from './dtos/bookstore.dto';

@Injectable()
export class BookstoreService {
  constructor(
    @InjectRepository(BookStoreEntity)
    private readonly bookStoreRepository: Repository<BookStoreEntity>,
  ) {}

  async list(query: FindAllQuery): Promise<BookstorePaginate> {
    const { take, skip } = this.query(query);
    const [bookstores, total] = await this.bookStoreRepository
      .createQueryBuilder('bookstore')
      .leftJoinAndSelect('bookstore.bookBookstores', 'bookBookstores')
      .leftJoinAndSelect('bookBookstores.book', 'book')
      .orderBy('bookstore.name', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const totalPages = Math.ceil(total / take);

    return {
      bookstores,
      total,
      totalPages,
      currentPage: skip || 1,
    };
  }

  async create(bookstoreDto: BookstoreDto): Promise<BookStoreEntity> {
    const { name, location } = bookstoreDto;
    const bookstore = this.bookStoreRepository.create({ name, location });
    return await this.bookStoreRepository.save(bookstore);
  }

  async update(
    bookstoreDto: BookstoreDto,
    id: number,
  ): Promise<BookStoreEntity> {
    const { name, location } = bookstoreDto;
    const bookstore = await this.bookStoreRepository.findOneBy({ id });
    if (!bookstore) throw new Error(`Bookstore with id ${id} not found`);

    await this.bookStoreRepository
      .createQueryBuilder()
      .update(BookStoreEntity)
      .set({ name, location })
      .where('id = :id', { id })
      .execute();
    return this.bookStoreRepository.findOneBy({ id });
  }

  query(query: FindAllQuery) {
    const take = query.take || 10;
    const skip = query.page ? (query.page - 1) * take : 0;

    return { take, skip };
  }
}
