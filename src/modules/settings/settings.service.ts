import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from '../auth/entity/auth.entity.js';
import { Repository } from 'typeorm';
import { UpdateAuthuserDTO } from '../auth/dtos/partialuser.dto.js';
import { SUPABASE_CLIENT } from '../../external/supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';
import { image } from '../../common/util/upload-image.js';
import { preferenceDto } from './dtos/preference.dto.js';
import { preferenceEntity } from './entity/preference.entity.js';
import { PartialpreferenceDto } from './dtos/partialpreference.dto.js';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(AuthEntity) private AuthRepo: Repository<AuthEntity>,
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
    private readonly UploadImage: image,
    @InjectRepository(preferenceEntity)
    private PreferenceRepo: Repository<preferenceEntity>,
  ) {}

  async updateProfile(id: number, data: UpdateAuthuserDTO) {
    const Data = await this.AuthRepo.findOne({
      where: { id: id },
    });

    if (!Data) {
      throw new NotFoundException('ProductNot Found...');
    }

    let Url = Data.image;

    if (data.image) {
      Url = await this.UploadImage.uploadImage(data.image);
    }

    const updateData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== '' && key !== 'image',
      ),
    );

    await this.AuthRepo.update(id, {
      ...updateData,
      image: Url,
    });

    return await this.AuthRepo.findOne({
      where: { id },
    });
  }

  async getProfile(id: number) {
    return this.AuthRepo.findOne({ where: { id } });
  }

  async createPreference(userid: number, data: preferenceDto) {
    const Data = await this.PreferenceRepo.findOne({
      where: { userId: userid },
    });

    if (Data) {
      throw new NotFoundException('Already created plz update');
    }
    const updateData = await this.PreferenceRepo.create({
      ...data,
      userId: userid,
    });
    await this.PreferenceRepo.save(updateData);

    return await this.PreferenceRepo.findOne({
      where: { userId: userid },
    });
  }

  async updatePreference(userId: number, data: PartialpreferenceDto) {
    const Data = await this.PreferenceRepo.findOne({
      where: { userId: userId },
    });

    if (!Data) {
      throw new NotFoundException('Data not Found...');
    }
    const id = Data.id;

    const updateData = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== '' && value !== null && value !== undefined,
      ),
    );
    await this.PreferenceRepo.update(id, {
      ...updateData,
      userId: id,
    });

    return await this.PreferenceRepo.findOne({
      where: { id },
    });
  }
  async getPreference(userId: number) {
    const Data = await this.PreferenceRepo.findOne({
      where: { userId: userId },
    });
    if (!Data) {
      return 'No Data found for this user';
    }

    return Data;
  }
}
