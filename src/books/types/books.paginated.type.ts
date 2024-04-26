import { BookEntity } from 'src/entities/book.entity';

export type PaginatedBooksType = {
  books: BookEntity[];
  total: number;
  totalPages: number;
  currentPage: number;
};
