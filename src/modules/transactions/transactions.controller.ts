import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AddTransactionDto } from './dtos/addTransaction.dto.js';
import { CreditCardService } from '../credit-card/credit-card.service.js';
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly TransactionService: TransactionsService,
    private readonly CardService: CreditCardService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addTransaction(@Request() req: any, @Body() body: AddTransactionDto) {
    return this.TransactionService.addtransaction(req.user.userID, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllTransa(@Request() req: any, @Body() body: AddTransactionDto) {
    return this.TransactionService.getAllTransaction(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCards(@Request() req: any) {
    return this.CardService.getCard(req.user.userId);
  }
}
