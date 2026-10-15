import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service.js';
import { DashboardController } from './dashboard.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from '../auth/entity/auth.entity.js';
import { CardDetailEntity } from '../credit-card/entity/create-card.entity.js';
import { transactionsEntity } from '../transactions/entity/addTransaction.entity.js';
import { CreditCardService } from '../credit-card/credit-card.service.js';
import { transpileModule } from 'typescript';
import { TransactionsModule } from '../transactions/transactions.module.js';
import { AccountsModule } from '../accounts/accounts.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthEntity,
      CardDetailEntity,
      transactionsEntity,
    ]),
    TransactionsModule,
    AccountsModule
  ],
  providers: [DashboardService, CreditCardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
