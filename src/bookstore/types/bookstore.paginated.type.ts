import { BookStoreEntity } from 'src/Entities/bookstore.entity';

export type BookstorePaginate = {
  bookstores: BookStoreEntity[];
  total: number;
  totalPages: number;
  currentPage: number;
};
