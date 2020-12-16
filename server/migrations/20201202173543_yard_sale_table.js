const TABLE_NAME = 'yard_sales';

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments("id").primary();
    table.json("location").notNullable();
    table
        .string("name")
        .notNullable()
        .defaultTo("My Yard Sale");
    table.string("description");
    table
        .integer("duration")
        .notNullable()
        .defaultTo(1);
    table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    table
        .string("status")
        .notNullable()
        .defaultTo("innactive");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME)
};
