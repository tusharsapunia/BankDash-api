import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@Controller('accounts')
export class AccountsController {
  constructor(private readonly AccountService: AccountsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('transaction')
  async getTransaction(@Request() req: any) {
    return this.AccountService.getthreeTransaction(req.user.userId);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('onecard')
  async getCard(@Request() req: any) {
    const userId = req.user.userId;
    return this.AccountService.getOneCard(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('overview')
  async overview(@Request() req: any) {
    return this.AccountService.overview(req.user.userId);
  }
}
