import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCardDetailDto {
  @ApiProperty()
  @IsString()
  cardType: string;
  @ApiProperty()
  @IsString()
  nameOnCard: string;
  @ApiProperty()
  @IsInt()
  cardnumber: bigint;
  @ApiProperty({
    example: '2005-08-15',
    type: 'string',
    format: 'date',
  })
  @IsString()
  ExpireDate: Date;
}
