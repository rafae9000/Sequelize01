
module.exports = {
  development: {
    username: "postgres",
    password: "an9858",
    database: "sequel2",
    host: "localhost",
    dialect: "postgres"
  },
  test: {
    username: "",
    password: "",
    database: "",
    host: "",
    dialect: ""
  },
  "production": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
}
