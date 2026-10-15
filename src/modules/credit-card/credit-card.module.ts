import { Module } from '@nestjs/common';
import { CreditCardService } from './credit-card.service.js';
import { CreditCardController } from './credit-card.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from '../auth/entity/auth.entity.js';
import { CardDetailEntity } from './entity/create-card.entity.js';
import { transactionsEntity } from '../transactions/entity/addTransaction.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthEntity,
      CardDetailEntity,
      transactionsEntity,
    ]),
  ],
  providers: [CreditCardService],
  controllers: [CreditCardController],
  exports :[CreditCardService]
})
export class CreditCardModule {}
