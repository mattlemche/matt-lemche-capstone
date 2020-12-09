const TABLE_NAME = 'users'

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable();
    table.string("phone");
    table
        .string("profile_image")
        .notNullable()
        .defaultTo("../public/image.png");
    table.json("location").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
