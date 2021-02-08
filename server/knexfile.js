// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "rootroot",
      database: "rummage-2",
      charset: "utf8"
    }
  },
  production: {
    client: "mysql",
    connection: process.env.JAWSDB_CHARCOAL_URL
  }
};
