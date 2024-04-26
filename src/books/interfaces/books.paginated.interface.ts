import { BookEntity } from 'src/Entities/book.entity';

export interface PaginatedBooks {
  books: BookEntity[];
  total: number;
  totalPages: number;
  currentPage: number;
}
