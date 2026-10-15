import { callAppShutdownHook } from '@nestjs/core/hooks/on-app-shutdown.hook.js';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('setting_preference')
export class preferenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  currency: string;

  @Column()
  timezone: string;

  @Column({ default: true })
  notdigitalCurrency: boolean;

  @Column({ default: false })
  notmerchant: boolean;

  @Column({ default: true })
  notrecoforAcc: boolean;
}
