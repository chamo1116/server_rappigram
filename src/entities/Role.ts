import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

import { User } from "./User";
import { Permission } from "./Permission";

@Entity({
  name: "roles"
})
export class Role {
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
    name: "description",
    type: "nvarchar",
    length: 100
  })
  description: string;

  @OneToMany(type => User, user => user.role)
  users: User[];

  @ManyToMany(type => Permission)
  @JoinTable({
    name: "roles_has_permissions",
    joinColumn: {
      name: "role_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "permission_id",
      referencedColumnName: "id"
    }
  })
  permissions: Permission[];

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
