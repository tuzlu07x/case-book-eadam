import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookBookStoreEntity } from './book.bookstore.entity';

@Entity('book_stores')
export class BookStoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  location: string;

  @OneToMany(
    () => BookBookStoreEntity,
    (bookBookstore) => bookBookstore.bookstore,
  )
  bookBookstores: BookBookStoreEntity[];
}
