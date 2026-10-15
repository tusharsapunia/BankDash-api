import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class PartialpreferenceDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  timezone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notdigitalCurrency: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notmerchant: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notrecoforAcc: boolean;
}
