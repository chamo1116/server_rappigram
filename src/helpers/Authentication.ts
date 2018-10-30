import { User } from "../entities/User";
import { sign, verify } from "jsonwebtoken";
import UserService from "../services/UserService";
import Utilities from "./Utilities";

import App from "../config/App"

/**
 *
 */
export default class Auth {
  /**
   *
   * @param user
   */
  public static generateToken(user: User): string {
    let secretKey = App.JWT.secret;
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role.name
      },
      secretKey,
      {
        algorithm: App.JWT.algorithm,
        expiresIn: App.JWT.expiresIn
      }
    );
  }

  public static async authentication(decoded, request) {
    try {
      let us: UserService = new UserService();

      let user = await us.getById(decoded.id);

      if (user) return { isValid: true, roles: [user.role.name] };

      if (!user) return { isValid: false };
    } catch (error) {
      throw error;
    }
  }

  public static async authorization(request, cb) {
    let secretKey = process.env.JWT_SECRET;
    try {
      let user = Utilities.toJSON(verify(request.auth.token, secretKey));

      let response = await Auth.authentication(user, null);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
