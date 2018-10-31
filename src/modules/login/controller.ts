import {  Inject } from "typescript-ioc";

import { notFound } from "boom";
import { Request, ResponseToolkit, ServerRoute } from "hapi";
import { Controller, controller, options, post } from "hapi-decorators";
import { object, string } from "joi";

import Utilities from "../../helpers/Utilities";
import Auth from "../../helpers/Authentication";
import UserService from "../../services/UserService";


@controller("/v1")
export default class Login implements Controller {
  baseUrl: string;
  routes: () => ServerRoute[];

  @Inject
  private us: UserService;

  @options({
    auth: false,
    tags: ["api", "login"],
    description: "Endpoint para autenticar a los usuarios.",
    notes: "Retorna token de autorización para las siguientes request.",
    validate: {
      payload: object({
        username: string()
          .required()
          .description("nombre de usuario ó email.")
          .label("nombre de usuario ó email"),
        password: string()
          .required()
          .description("contraseña.")
          .label("contraseña")
      }).label("payload")
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form"
      }
    }
  })
  @post("/login")
  async signin(request: Request, h: ResponseToolkit) {
    const { username, password } = Utilities.toJSON(request.payload);
    try {
      const user = await this.us.login(username, password);

      if (!user) return notFound("Usuario Y/O password incorrectos!");

      return h.response({ data: user, token: Auth.generateToken(user) });
    } catch (error) {
      console.log(error)
      return h.response(error);
    }
  }
}
