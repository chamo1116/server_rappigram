import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
} from "typeorm";

import { User } from "./User";
import { Role } from "./Role";

@Entity({
  name: "permissions"
})
export class Permission {
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

  @ManyToMany(type => Role)
  @JoinTable({
    name: "roles_has_permissions",
    joinColumn: {
      name: "permission_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id"
    }
  })
  roles: Role[];

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
