import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { transactionsType } from '../enum/transactionType.enum.js';
import { TranCategoryTypeEnum } from '../enum/category.enum.js';

export class AddTransactionDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(transactionsType)
  type: transactionsType;
  @ApiProperty()
  @IsEnum(TranCategoryTypeEnum)
  category: TranCategoryTypeEnum;

  @ApiProperty()
  @IsInt()
  amount: number;

  @ApiProperty()
  @IsInt()
  cardnumber: bigint;
}
