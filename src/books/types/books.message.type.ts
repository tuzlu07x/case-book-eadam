import { BookEntity } from 'src/Entities/book.entity';
import { DeleteResult } from 'typeorm';

export type BookMessageType = {
  message: string;
  book: BookEntity | DeleteResult;
};
