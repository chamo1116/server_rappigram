export default {
  documentationPath: "/",
  basePath: "/v1/",
  info: {
    title: "MndApp API",
    description: "Endpoints to connect to mnd.app",
    version: "1.0.0",
    contact: {
      name: "Arith Alexis Villalba Bravo",
      email: "arithalexis@gmail.com"
    }
  },
  schemes: ['http', 'https'],
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      description: 'Token for auth for API',
      in: "header"
    }
  },
  grouping: "tags",
  sortTags: "name",
  sortEndpoints: "ordered"
};
