import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user-register')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  userName: string;

  @Column()
  dateOfBirth: string;
  @Column()
  presentAddress: string;

  @Column()
  permanentAddress: string;
  @Column()
  city: string;
  @Column()
  postalCode: number;
  @Column()
  country: string;
  @Column()
  image: string;
}
