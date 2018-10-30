import { readdir, statSync } from "fs";
import { join } from "path";
import { promisify } from "util";

import { Server } from "hapi";

import PLUGINS from "./config/Plugins";

import Auth from "./helpers/Authentication";

const readdirAsync = promisify(readdir);

export default class App {
  server: Server;
  private files: string[];

  constructor() {
    this.server = new Server({
      port: process.env.APP_PORT,
      host: process.env.APP_HOST
    });
  }

  async init(): Promise<Server> {
    try {
      await this.server.register(PLUGINS);

      this.server.auth.strategy("jwt", "jwt", {
        key: process.env.JWT_SECRET,
        validate: await Auth.authentication,
        verifyOptions: { algorithms: ["HS256"] }
      });

      this.server.auth.default("jwt");

      let modulesPath: string = join(__dirname, "modules");
      this.files = await readdirAsync(modulesPath);

      this.files.map((file: string) => {
        let currentFile = join(modulesPath, file);

        if (statSync(currentFile).isDirectory()) {
          require(currentFile).init(this.server);
        }
      });

      await this.server.start();

      return this.server;
    } catch (error) {
      throw error;
    }
  }
}
