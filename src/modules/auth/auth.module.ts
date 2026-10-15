import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entity/auth.entity.js';
import { PassportModule } from '@nestjs/passport';
import { JwtStratagy } from './jwt.stratagy.js';
import {
  SUPABASE_CLIENT,
  SupabaseProvider,
} from '../../external/supabase/supabase.provider.js';
import { image } from '../../common/util/upload-image.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('SECRET'),
        signOptions: { expiresIn: '20m' },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JwtStratagy, SupabaseProvider, image],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
