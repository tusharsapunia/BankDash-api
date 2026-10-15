import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('card-details')
export class CardDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  @Column()
  cardType: string;
  @Column()
  nameOnCard: string;
  @Column({ type: 'bigint' })
  cardnumber: bigint;
  @Column()
  ExpireDate: Date;

  @Column()
  balance: number;
}
