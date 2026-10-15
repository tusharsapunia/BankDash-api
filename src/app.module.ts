import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module.js';
import { CreditCardModule } from './modules/credit-card/credit-card.module.js';
import { DashboardModule } from './modules/dashboard/dashboard.module.js';
import { AccountsModule } from './modules/accounts/accounts.module.js';
import { TransactionsModule } from './modules/transactions/transactions.module.js';
import { SettingsModule } from './modules/settings/settings.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL!,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CreditCardModule,
    DashboardModule,
    AccountsModule,
    TransactionsModule,
    SettingsModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
