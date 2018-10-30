/**
 *
 */
export default class Utilities {
  /**
   * Convierte un Buffer, cadena de texto a un objeto JSON.
   * @param value valor a convertir
   */
  public static toJSON(value: Buffer | string | object) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Comprueba si una cadena de texto es un correo válido.
   * @param email cadena de texto a comprobar
   */
  public static isEmail(email: string): boolean {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(email);
  }
}
