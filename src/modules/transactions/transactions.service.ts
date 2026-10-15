import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { transactionsEntity } from './entity/addTransaction.entity.js';
import { Repository } from 'typeorm';
import { AddTransactionDto } from './dtos/addTransaction.dto.js';
import crypto from 'crypto';
import { CardDetailEntity } from '../credit-card/entity/create-card.entity.js';
import { idText } from 'typescript';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(transactionsEntity)
    private TransactionRepo: Repository<transactionsEntity>,
    @InjectRepository(CardDetailEntity)
    private CardDetailRepo: Repository<CardDetailEntity>,
  ) {}

  async addtransaction(userID: number, body: AddTransactionDto) {
    let TrId = 'TR-' + crypto.randomInt(1000, 10000);

    const hascard = await this.CardDetailRepo.findOne({
      where: { cardnumber: body.cardnumber },
    });
    if (!hascard) {
      throw new NotFoundException(
        'Card not found please enter valid card Number',
      );
    }
    const Data = await this.TransactionRepo.create({
      description: body.description,
      type: body.type,
      cardnumber: body.cardnumber,
      amount: body.amount,
      category: body.category,
      Tr_id: TrId,
      userID: userID,
    });
    let balance = hascard.balance;
    if (body.type === 'EXPENSE') {
      balance = hascard.balance - body.amount;
    } else if (body.type === 'INCOME') {
      balance = hascard.balance + body.amount;
    }
    let id = hascard.id;

    await this.CardDetailRepo.update(id, { balance: balance });

    const save = await this.TransactionRepo.save(Data);

    return save;
  }

  async getAllTransaction(userID: number) {
    const Data = await this.TransactionRepo.findOne({
      where: { userID: userID },
    });
    if (!Data) {
      throw new NotFoundException('user have not any Transactions');
    }
    return this.TransactionRepo.find();
  }
}
