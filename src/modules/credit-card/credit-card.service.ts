import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { CardDetailEntity } from './entity/create-card.entity.js';
import { Repository } from 'typeorm';
import { CreateCardDetailDto } from './dtos/ceate-card.dto.js';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(CardDetailEntity)
    private cardRepo: Repository<CardDetailEntity>,
  ) {}

  async createCard(userId: number, data: CreateCardDetailDto) {
    let balance = crypto.randomInt(100000, 1000000);
    const cardnumber = data.cardnumber;
    const findcard = await this.cardRepo.findOne({
      where: { cardnumber: cardnumber },
    });

    if (findcard) {
      throw new ConflictException('Card already registered');
    }
    const save = await this.cardRepo.create({
      userId: userId,
      cardnumber: data.cardnumber,
      nameOnCard: data.nameOnCard,
      cardType: data.cardType,
      ExpireDate: data.ExpireDate,
      balance: balance,
    });
    await this.cardRepo.save(save);
    return this.cardRepo.findOne({ where: { cardnumber: save.cardnumber } });
  }

  async getCard(userId: number) {
    const data = await this.cardRepo.findOne({ where: { userId: userId } });
    if (!data) {
      return 'Empty Data..';
    }
    return await this.cardRepo.findOne({ where: { userId: userId } });
  }
}
