import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthuserDTO } from './dtos/authuser.dto.js';
import { AuthLoginDTO } from './dtos/authLogin.dto.js';
import { get } from 'http';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post('register')
  async storeSignup(
    @Body() body: AuthuserDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    body.image = image;
    return this.AuthService.signup(body);
  }

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.AuthService.login(body);
  }


}
