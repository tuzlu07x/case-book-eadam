import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from './book.entity';
import { BookStoreEntity } from './bookstore.entity';

@Entity('book_bookstores')
export class BookBookStoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BookEntity, (book) => book.bookBookstores)
  book: BookEntity;

  @ManyToOne(() => BookStoreEntity, (bookstore) => bookstore.bookBookstores)
  bookstore: BookStoreEntity;
}
