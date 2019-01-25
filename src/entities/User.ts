import { genSaltSync, hashSync, compareSync } from "bcrypt";

import {
  Column,
  BeforeUpdate,
  BeforeInsert,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn
} from "typeorm";

import { Accounts } from "./Account";

@Entity({
  name: "users"
})
export class User {
  @PrimaryGeneratedColumn("increment", { name: "id", type: "int" })
  id: number;

  @Column({
    name: "email",
    type: "nvarchar",
    length: 100,
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    name: "password",
    type: "nvarchar",
    length: 100,
    nullable: false,
    select: false
  })
  password: string;

  @ManyToOne(type => Accounts, role => Accounts.users)
  @JoinColumn({ name: "account_id" })
  account: Account;

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

  // @BeforeInsert()
  // @BeforeUpdate()
  //  encryptPassword(): void {

  // }

  static hashPassword(user: User): User {
    const salt = genSaltSync();
    user.password = hashSync(user.password, salt);

    return user;
  }

  static isPassword(encodedPassword: string, password: string): boolean {
    return compareSync(password, encodedPassword);
  }
}
