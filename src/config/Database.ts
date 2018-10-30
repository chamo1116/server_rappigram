import { Connection, createConnection } from "typeorm";

export interface DatabaseConfiguration {
  type: "mysql";
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean;
}

export class DatabaseProvider {
  private static connection: Connection;
  private static configuration: DatabaseConfiguration;

  public static configure(config: DatabaseConfiguration): void {
    this.configuration = config;
  }

  public static async getConnection(): Promise<Connection> {
    if (this.connection) {
      return this.connection;
    }

    const {
      type,
      host,
      port,
      username,
      password,
      database,
      ssl
    } = this.configuration;

    this.connection = await createConnection({
      type,
      host,
      port,
      username,
      password,
      database,
      extra: { ssl },
      entities: ["dist/entities/*.js"],
      logging: false,
      cache: true,
      connectTimeout: 30000
    });

    return this.connection;
  }
}
