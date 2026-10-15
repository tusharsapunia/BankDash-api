import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class AuthuserDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({
    example: '2005-08-15',
    description: 'Date of Birth',
    type: 'string',
    format: 'date',
  })
  @IsDate()
  dateOfBirth: string;

  @ApiProperty()
  @IsString()
  presentAddress: string;

  @ApiProperty()
  @IsString()
  permanentAddress: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  postalCode: number;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.Multer.File;
}
