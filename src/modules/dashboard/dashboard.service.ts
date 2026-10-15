import { Injectable } from '@nestjs/common';
import { CreditCardService } from '../credit-card/credit-card.service.js';
import { TransactionsService } from '../transactions/transactions.service.js';
import { InjectRepository } from '@nestjs/typeorm';
import { transactionsEntity } from '../transactions/entity/addTransaction.entity.js';
import { Repository } from 'typeorm';
import { AccountsService } from '../accounts/accounts.service.js';

@Injectable()
export class DashboardService {
  constructor(
    private readonly cardService: CreditCardService,
    private readonly transactionService: TransactionsService,
    private readonly accountService: AccountsService,
    @InjectRepository(transactionsEntity)
    private TransRepo: Repository<transactionsEntity>,
  ) {}

  async getDashBoard(userID: number) {
    console.log('id', userID);

    const getCard = await this.cardService.getCard(userID);
    const transactions = await this.accountService.getthreeTransaction(userID);
    const sevenDayOverview = await this.accountService.overview(userID);
    if (!getCard || !transactions || !sevenDayOverview) {
      return true;
    }

    const totalCount = await this.TransRepo.findAndCount({
      where: { userID: userID },
    });

    const enter = await this.TransRepo.findAndCount({
      where: { userID: userID, category: 'ENTERTAINMENT' },
    });
    const invest = await this.TransRepo.findAndCount({
      where: { userID: userID, category: 'INVESTMENT' },
    });
    const other = await this.TransRepo.findAndCount({
      where: { userID: userID, category: 'OTHERS' },
    });
    const bill = await this.TransRepo.findAndCount({
      where: { userID: userID, category: 'BILLEXPENSE' },
    });

    return {
      card: getCard,
      transactions: transactions,
      weeklyActivity: sevenDayOverview,
      statics: {
        Enetertainment: 0 + (invest[1] / totalCount[1]) * 100,
        Others: 0 + (other[1] / totalCount[1]) * 100,
        BILLEXPENSE: 0 + (bill[1] / totalCount[1]) * 100,
        INVESTMENT: 0 + (invest[1] / totalCount[1]) * 100,
      },
    };
  }
}
