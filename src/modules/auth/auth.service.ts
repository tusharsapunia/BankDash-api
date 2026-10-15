import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthEntity } from './entity/auth.entity.js';
import { AuthuserDTO } from './dtos/authuser.dto.js';
import { AuthLoginDTO } from './dtos/authLogin.dto.js';
import { SUPABASE_CLIENT } from '../../external/supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';
import { image } from '../../common/util/upload-image.js';
@Injectable()
export class AuthService {
  constructor(
    private JwtSerivce: JwtService,
    @InjectRepository(AuthEntity) private AuthRepo: Repository<AuthEntity>,
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
    private readonly UploadImage: image,
  ) {}

  async signup(data: AuthuserDTO) {
    let Url = await this.UploadImage.uploadImage(data.image);
    const hashPassword = await bcrypt.hash(data.password, 10);
    const existingUser = await this.AuthRepo.findOne({
      where: { email: data.email, userName: data.userName },
    });
    if (existingUser) {
      throw new ConflictException('user already registered ');
    }
    const existingUserName = await this.AuthRepo.findOne({
      where: { userName: data.userName },
    });
    if (existingUserName) {
      throw new ConflictException('This User name is available');
    }

    const userInfo = this.AuthRepo.create({
      name: data.name,
      email: data.email,
      password: hashPassword,
      userName: data.userName,
      dateOfBirth: data.dateOfBirth,
      presentAddress: data.presentAddress,
      permanentAddress: data.permanentAddress,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      image: Url,
    });

    return this.AuthRepo.save(userInfo);
  }

  async login(data: AuthLoginDTO) {
    const email = data.email;
    const password = data.password;

    const user = await this.AuthRepo.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User Not Found Please Signup');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new NotFoundException('Incorrect Password!!');
    }
    const payload = {
      name: user.name,
      userID: user.id,
      email: user.email,
    };

    return {
      id: Date.now(),
      userName: payload.name,
      email: payload.email,
      access_Token: this.JwtSerivce.sign(payload, { expiresIn: '20m' }),
      message: `Access Token Expire at ${new Date(Date.now() + 20 * 60 * 1000)}`,
    };
  }

  async getHii() {
    return 'Helelo ';
  }
}
