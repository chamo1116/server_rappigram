import { notFound, conflict } from "boom";
import { Request, ResponseToolkit, ServerRoute } from "hapi";
import {
  Controller,
  del,
  get,
  controller,
  options,
  patch,
  put,
  post
} from "hapi-decorators";
import { object, number, string } from "joi";

import Utilities from "../../helpers/Utilities";
import UserService from "../../services/UserService";

@controller("/v1/users")
export default class User implements Controller {
  private us: UserService;
  baseUrl: string;
  routes: () => ServerRoute[];

  constructor() {
    this.us = new UserService();
  }

  @options({
    tags: ["api", "users"],
    description: "Crear usuarios.",
    notes: "Ingrese los parámetros requeridos.",
    validate: {
      payload: object({
        email: string()
          .email()
          .required()
          .description("Correo electrónico.")
          .label("Correo electrónico."),
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
  @post("/")
  async insert(request: Request, h: ResponseToolkit) {
    let user = Utilities.toJSON(request.payload);

    try {
      let newuser = await this.us.create(user);
      return h.response({ data: newuser });
    } catch (error) {
      if (error.errno === 1062) {
        return conflict(`El correo ${user.email} ya está en uso.`);
      }

      return h.response(error);
    }
  }

  @options({
    tags: ["api", "users"],
    description: "Devuelve todos los usuarios del sistema.",
    notes: "Usuarios activos.",
    plugins: {
      "hapi-swagger": {
        payloadType: "form"
      },
      hapiAclAuth: { secure: true, roles: ["ROOT", "ADMIN"] }
    }
  })
  @get("/")
  async index(request: Request, h: ResponseToolkit) {
    try {
      let users = await this.us.getAll();

      return h.response({ data: users });
    } catch (error) {
      return h.response(error);
    }
  }

  @options({
    tags: ["api", "users"],
    description: "Devuelve un usuario según su id.",
    notes: "Ingrese un identificador (id) válido.",
    validate: {
      params: object({
        id: number()
          .integer()
          .required()
          .description("identificador único de usuario.")
          .label("identificador único de usuario.")
      })
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form"
      },
      hapiAclAuth: { secure: true, roles: ["ROOT", "ADMIN"] }
    }
  })
  @get("/{id}")
  async show(request: Request, h: ResponseToolkit) {
    let id: number = Utilities.toJSON(request.params.id);
    try {
      let user = await this.us.getById(id);

      if (!user) return notFound("Usuario no encontrado!");

      return h.response({ data: user });
    } catch (error) {
      console.log(error);
      return h.response(error);
    }
  }

  @options({
    tags: ["api", "users"],
    description: "Eliminar usuario.",
    notes: "Eliminar usuario del sistema.",
    validate: {
      params: object({
        id: number()
          .integer()
          .required()
          .description("identificador único de usuario.")
          .label("identificador único de usuario.")
      })
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form"
      }
    }
  })
  @del("/{id}")
  async delete(request: Request, h: ResponseToolkit) {
    let id: number = Utilities.toJSON(request.params.id);
    try {
      await this.us.delete(id);

      return h.response().code(204);
    } catch (error) {
      return h.response(error);
    }
  }

  @options({
    tags: ["api", "users"],
    description: "Actualizar usuario.",
    notes:
      "Ingrese un identificador válido para el usuario que desea actualizar.",
    validate: {
      params: object({
        id: number()
          .integer()
          .required()
          .description("identificador único de usuario.")
          .label("identificador único de usuario.")
      }),
      payload: object({
        email: string()
          .email()
          .description("Correo electrónico.")
          .label("Correo electrónico."),
        username: string()
          .description("Nombre de usuario.")
          .label("Nombre de usuario."),
        password: string()
          .description("contraseña.")
          .label("contraseña")
      }).label("payload")
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form"
      },
      hapiAclAuth: { secure: true, roles: ["ROOT", "ADMIN", "USER"] }
    }
  })
  @put("/{id}")
  async update(request: Request, h: ResponseToolkit) {
    let id: number = parseInt(request.params.id);
    let user = Utilities.toJSON(request.payload);

    try {
      await this.us.update(id, user);
      return h.response().code(204);
    } catch (error) {
      if (error.errno === 1062) {
        return conflict(
          `El ${user.email ? "correo" : "nombre de usuario "} ${
            user.email ? user.email : user.username
          } ya está en uso.`
        );
      }
    }
  }
}
