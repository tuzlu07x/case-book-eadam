import { BookStoreEntity } from 'src/entities/bookstore.entity';

export type BookstorePaginate = {
  bookstores: BookStoreEntity[];
  total: number;
  totalPages: number;
  currentPage: number;
};
