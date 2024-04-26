import { IsEmpty, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BookUpdateDto {
  //   @IsEmpty()
  //   @IsString()
  //   title: string;

  //   @IsEmpty()
  //   @IsString()
  //   author: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
