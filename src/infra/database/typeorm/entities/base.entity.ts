import KSUID from 'ksuid';
import { BeforeInsert, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { BaseModel } from '../../../../core/shared/model/base.model';

export class BaseEntity implements BaseModel {

  @PrimaryColumn({ type: 'varchar', length: 27 })
  id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  generateId() {
    this.id = KSUID.randomSync().string
  }

}