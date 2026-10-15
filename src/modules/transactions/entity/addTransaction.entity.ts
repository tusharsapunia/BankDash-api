import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transactions')
export class transactionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Tr_id: string;

  @Column()
  type: string;

  @Column()
  category: string;
  @Column()
  description: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  amount: number;

  @Column({ type: 'bigint' })
  cardnumber: bigint;

  @Column()
  userID: number;
}
