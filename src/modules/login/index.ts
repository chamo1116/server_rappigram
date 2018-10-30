import { Server } from 'hapi';

import Login from './controller';

export function init(server: Server) {
  server.route(new Login().routes());
}
