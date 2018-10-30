export default {
  DB: {
    name: process.env.DB_DATABASE,
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  JWT: {
    secret: process.env.JWT_SECRET,
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.EXPIRATION_DATE
  }
}