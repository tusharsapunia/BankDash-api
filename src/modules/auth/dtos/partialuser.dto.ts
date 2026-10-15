import { PartialType, ApiProperty } from '@nestjs/swagger';
import { AuthuserDTO } from './authuser.dto.js';

export class UpdateAuthuserDTO extends PartialType(AuthuserDTO) {}
