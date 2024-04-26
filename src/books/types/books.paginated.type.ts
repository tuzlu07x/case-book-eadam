import { BookEntity } from 'src/Entities/book.entity';

export type PaginatedBooksType = {
  books: BookEntity[];
  total: number;
  totalPages: number;
  currentPage: number;
};
