import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreditCardService } from './credit-card.service.js';
import { AuthGuard } from '@nestjs/passport';
import { CreateCardDetailDto } from './dtos/ceate-card.dto.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly cardService: CreditCardService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createCard(@Body() body: CreateCardDetailDto, @Request() req: any) {
    return this.cardService.createCard(req.user.userId, body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCard(@Request() req: any) {
    return this.cardService.getCard(req.user.userId);
  }
}
