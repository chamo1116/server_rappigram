import {  Singleton } from "typescript-ioc";

import { User } from "../entities/User";
import Utilities from "../helpers/Utilities";

import { DatabaseProvider } from "../config/Database";
import { DeleteResult, UpdateResult } from "typeorm";

@Singleton
export default class UserRepository {
  async insert(user: User): Promise<User> {
    try {
      let connection = await DatabaseProvider.getConnection();

      let newuser = await connection
        .getRepository(User)
        .save(User.hashPassword(user));

      return newuser;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      let connection = await DatabaseProvider.getConnection();

      let userDeleted: DeleteResult = await connection
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id })
        .execute();

      /*{
          "raw": {
            "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 0,
            "info": "",
            "serverStatus": 2,
            "warningStatus": 0
          }
        } */

      return userDeleted;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<User> {
    try {
      let connection = await DatabaseProvider.getConnection();

      let user = await connection
        .getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.role", "role")
        .leftJoinAndSelect("role.permissions", "permission")
        .where("user.id = :id", { id })
        .getOne();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<Array<User>> {
    try {
      let connection = await DatabaseProvider.getConnection();

      let users: User[] = await connection.getRepository(User).find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, user: User): Promise<UpdateResult> {
    try {
      let connection = await DatabaseProvider.getConnection();
      let _user: User = user;

      if (user.password) _user = User.hashPassword(user);

      let userupdate: UpdateResult = await connection
        .createQueryBuilder()
        .update(User)
        .set(_user)
        .where("id = :id", { id })
        .execute();

      return userupdate;
    } catch (error) {
      throw error;
    }
  }

  async login(username: string, password: string): Promise<User> {
    let connection = await DatabaseProvider.getConnection();

    let user: User;

    try {
      if (Utilities.isEmail(username)) {
        user = await connection
          .getRepository(User)
          .createQueryBuilder("user")
          .addSelect("user.password")
          .leftJoinAndSelect("user.role", "role")
          .leftJoinAndSelect("role.permissions", "permission")
          .where("email = :email", { email: username })
          .getOne();
      }

      if (!Utilities.isEmail(username)) {
        user = await connection
          .getRepository(User)
          .createQueryBuilder("user")
          .addSelect("user.password")
          .leftJoinAndSelect("user.role", "role")
          .leftJoinAndSelect("role.permissions", "permission")
          .where("username = :username", { username })
          .getOne();
      }

      if (user) {
        if (User.isPassword(user.password, password)) {
          return user;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
