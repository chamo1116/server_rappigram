import { Connection } from "typeorm";
import { Factory, Seed } from "typeorm-seeding";
import { User } from "../../entities/User";

export class CreateUsers implements Seed {
  public async seed(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().seedMany(10);
  }
}