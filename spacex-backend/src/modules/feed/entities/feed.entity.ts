import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  imageUrl: string;

  //Otomatik olarak oluşturulma tarihini ayarlar.
  @CreateDateColumn()
  createdAt: Date;

  //Herhangi bir güncelleme yapıldığında otomatik olarak güncelleme tarihini ayarlar.
  @UpdateDateColumn()
  updatedAt: Date;
}
