import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service.js';
import { TransactionsController } from './transactions.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { transactionsEntity } from './entity/addTransaction.entity.js';
import { CardDetailEntity } from '../credit-card/entity/create-card.entity.js';
import { CreditCardModule } from '../credit-card/credit-card.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([transactionsEntity, CardDetailEntity]) ,CreditCardModule],
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}
