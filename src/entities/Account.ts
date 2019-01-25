import {
  Column,
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

import { User } from "./User";

@Entity({
  name: "accounts"
})
export class Accounts{
  @PrimaryGeneratedColumn("increment", { name: "id", type: "int" })
  id: number;

  @Column({
    name: "name",
    type: "nvarchar",
    length: 50,
    nullable: false
  })
  name: string;

  @Column({
    name: "password",
    type: "nvarchar",
    length: 100,
    nullable: false,
    select: false
  })
  password: string;

  @Column({
    name: "relatedaccounts",
    type: "nvarchar",
    length: 100,
    nullable: false
  })
  relatedaccounts: string[];

  @Column({
    name: "relatedhashtags",
    type: "nvarchar",
    length: 100,
    nullable: false
  })
  relatedhashtags: string[];

  @Column({
    name: "start_date",
    type: "datetime",
  })
  start_date: Date;

  @Column({
    name: "paid_days",
    type: "int",
  })
  end_date: number;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime",
    select: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "datetime",
    select: false
  })
  updatedAt: Date;
}


