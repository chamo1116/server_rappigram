import { Server } from "hapi";

import User from "./controller";

export function init(server: Server) {
  server.route(new User().routes());
}
