import Swagger from "./Swagger";
import Auth from "../helpers/Authentication";

const PLUGINS = [
  require("blipp"),
  require("hapi-auth-jwt2"),

  {
    plugin: require("hapi-acl-auth"),
    options: {
      handler: Auth.authorization,
      policy: "allow"
    }
  },
  require("inert"),
  require("vision"),
  {
    plugin: require("hapi-swagger"),
    options: Swagger
  },
  {
    plugin: require("laabr"),
    options: {
      formats: {
        onPostStart: ':time :start :level :message',
        request: ":time :method :remoteAddress :url :status :payload (:responseTime ms)",
        log: false
      },
      tokens: { start: () => '[start]' },
      indent: 2,
      colored: true
    }
  }
];

export default PLUGINS;
