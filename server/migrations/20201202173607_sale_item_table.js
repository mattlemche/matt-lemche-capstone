const TABLE_NAME = 'sale_items';

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments("id").primary();
    table.string("name");
    table.string("description");
    table
        .string("image_URL")
        .notNullable()
        .defaultTo("../public/image.png");
    table.string("condition")
        .notNullable()
        .defaultTo("Fair");
    table.string("category").notNullable();
    table
        .integer("price")
        .unsigned()
        .notNullable()
        .defaultTo(1);
    table.string("yard_sale_duration")
    table.string("yard_sale_created_at")
    table
        .integer("yard_sale_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("yard_sales")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME)
};
