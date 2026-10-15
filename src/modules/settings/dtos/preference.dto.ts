import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class preferenceDto {

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsString()
  timezone: string;

  @ApiProperty()
  @IsString()
  notdigitalCurrency: boolean;

  @ApiProperty()
  @IsString()
  notmerchant: boolean;

  @ApiProperty()
  @IsString()
  notrecoforAcc: boolean;
}
