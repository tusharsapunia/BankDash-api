import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UserinfoGuard } from '../../core/guards/userinfo/userinfo.guard.js';
import { SettingsService } from './settings.service.js';
import { UpdateAuthuserDTO } from '../auth/dtos/partialuser.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { preferenceDto } from './dtos/preference.dto.js';
import { PartialpreferenceDto } from './dtos/partialpreference.dto.js';

@ApiBearerAuth()
@Controller('settings')
export class SettingsController {
  constructor(private readonly SettingService: SettingsService) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async updateProfile(
    @Body() body: UpdateAuthuserDTO,
    @Request() req: any,
    image: Express.Multer.File,
  ) {
    body.image = image;
    const userID = req.user.userId;

    return this.SettingService.updateProfile(userID, body);
  }

  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req: any) {
    return this.SettingService.getProfile(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPreference(@Body() body: preferenceDto, @Request() req: any) {
    const userID = req.user.userId;
    return this.SettingService.createPreference(userID, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async updatePrefe(@Body() body: PartialpreferenceDto, @Request() req: any) {
    const userID = req.user.userId;
    return this.SettingService.updatePreference(userID, body);
  }

  @UseGuards(AuthGuard('jwt'))
  async getPreference(@Request() req: any) {
    return this.SettingService.getPreference(req.user.userId);
  }
}
