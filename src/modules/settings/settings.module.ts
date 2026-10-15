import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service.js';
import { SettingsController } from './settings.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from '../auth/entity/auth.entity.js';
import { SupabaseProvider } from '../../external/supabase/supabase.provider.js';
import { image } from '../../common/util/upload-image.js';
import { JwtStratagy } from '../auth/jwt.stratagy.js';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module.js';
import { preferenceEntity } from './entity/preference.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity,preferenceEntity]), AuthModule],
  providers: [
    SettingsService,
    SupabaseProvider,
    image,
    JwtStratagy,
    JwtService,
  ],
  controllers: [SettingsController],
})
export class SettingsModule {}
