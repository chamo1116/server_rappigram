import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";

export default class UserService {
  private ur: UserRepository;

  constructor() {
    this.ur = new UserRepository();
  }

  async create(_user: User): Promise<User> {
    try {
      let user = await this.ur.insert(_user);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async delete(_id: number): Promise<void> {
    try {
      let response = await this.ur.delete(_id);

    } catch (error) {
      throw error;
    }
  }

  async getById(_id: number): Promise<User> {
    try {
      let user = await this.ur.getById(_id);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<Array<User>> {
    try {
      let users: User[] = await this.ur.getAll();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async update(_id: number, _user: User): Promise<void> {
    try {
      await this.ur.update(_id, _user);
    } catch (error) {
      throw error;
    }
  }

  async login(_username: string, _password: string): Promise<User> {
    try {
      let user = await this.ur.login(_username, _password);

      return user;
    } catch (error) {
      throw error;
    }
  }
}
