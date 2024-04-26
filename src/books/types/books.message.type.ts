import { BookEntity } from 'src/entities/book.entity';
import { DeleteResult } from 'typeorm';

export type BookMessageType = {
  message: string;
  book: BookEntity | DeleteResult;
};
