require("dotenv").config();

import "reflect-metadata";

import { connect } from "ngrok";

import App from "./config/App"

import Server from "./Server";
import { DatabaseProvider } from "./config/Database";

(async function () {
  try {
    DatabaseProvider.configure({
      type: "mysql",
      host: App.DB.host,
      port: 3306,
      username: App.DB.user,
      password: App.DB.password,
      database: App.DB.name
    });

    const server = new Server();

    await server.init();
  } catch (error) {
    console.error(error);
  }
})();

// (async function setup() {
//   try {
//     const url = await connect({ addr: parseInt(process.env.APP_PORT) });

//     DatabaseProvider.configure({
//       type: "mysql",
//       host: process.env.DB_HOST,
//       port: 3306,
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE
//     });

//     const server = new Server();

//     await server.init();

//     console.info(`API REST running at ${url}`);
//   } catch (error) {
//     console.error(error);
//   }
// })();
