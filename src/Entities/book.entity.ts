import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookBookStoreEntity } from './book.bookstore.entity';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  author: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @OneToMany(() => BookBookStoreEntity, (bookBookstore) => bookBookstore.book)
  bookBookstores: BookBookStoreEntity[];
}
