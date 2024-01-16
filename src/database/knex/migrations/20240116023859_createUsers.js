/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id")
  table.text("name")
  table.text("email")
  table.text("password")

  table.timestamp("created_at").default(knex.fn.now)
  table.timestamp("uodated_at").default(knex.fn.now)
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("users");
