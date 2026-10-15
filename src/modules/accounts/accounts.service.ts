import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { transactionsEntity } from '../transactions/entity/addTransaction.entity.js';
import { Between, Repository } from 'typeorm';
import { CardDetailEntity } from '../credit-card/entity/create-card.entity.js';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(transactionsEntity)
    private TransactionRepo: Repository<transactionsEntity>,
    @InjectRepository(CardDetailEntity)
    private CardDetailRepo: Repository<CardDetailEntity>,
  ) {}

  async getthreeTransaction(userID: number) {
    const DataExist = await this.TransactionRepo.findOne({
      where: { userID: userID },
    });
    if (!DataExist) {
      return 'Empty....';
    }

    return this.TransactionRepo.find({
      where: {
        userID: userID,
      },
      order: { date: 'DESC' },
      take: 3,
    });
  }

  async getOneCard(userId: number) {
    console.log('iididfgh', userId);
    const DataExist = await this.CardDetailRepo.findOne({
      where: { userId: userId },
    });
    if (!DataExist) {
      throw new NotFoundException('No Data Available');
    }
    return this.CardDetailRepo.find({
      where: {
        userId: userId,
      },
      order: { id: 'ASC' },
      take: 1,
    });
  }

  async overview(userID: number) {
    const DataExist = await this.TransactionRepo.findOne({
      where: { userID: userID },
    });
    if (!DataExist) {
      return 'Empty..';
    }
    const startDate = new Date();
    const endDate = new Date();

    startDate.setDate(startDate.getDate() - 7);
    const credit = await this.TransactionRepo.find({
      where: {
        userID: userID,
        type: 'INCOME',
        date: Between(startDate, endDate),
      },
      order: { date: 'DESC' },
    });
    const debit = await this.TransactionRepo.find({
      where: {
        userID: userID,
        type: 'EXPENSE',
        date: Between(startDate, endDate),
      },
      order: { date: 'DESC' },
    });

    return {
      income: credit,
      expense: debit,
    };
  }
}
