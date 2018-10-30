import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { User } from "../../entities/User";

define(User, (faker: typeof Faker, settings: { role: string }) => {
  const gender = faker.random.number(1);
  const username = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const email = faker.internet.email(username, lastName);

  const user = new User();
  user.username = username;
  user.email = email;

  return user;
});
