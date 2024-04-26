import { IsNotEmpty, IsString } from 'class-validator';

export class BookstoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}
