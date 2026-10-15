import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service.js';
import { AccountsController } from './accounts.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { transactionsEntity } from '../transactions/entity/addTransaction.entity.js';
import { CardDetailEntity } from '../credit-card/entity/create-card.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([transactionsEntity, CardDetailEntity])],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports : [AccountsService]
})
export class AccountsModule {}
