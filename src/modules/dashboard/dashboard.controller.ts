import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashservice: DashboardService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getData')
  async getDashBoard(@Request() req: any) {
    return this.dashservice.getDashBoard(req.user.userId);
  }
}
