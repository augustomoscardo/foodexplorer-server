/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id')
  table.text('name').notNullable()
  table.text('email').notNullable()
  table.text('password').notNullable()
  table
    .enum('role', ['admin', 'user'], { useNative: true, enumName: 'roles' })
    .notNullable().defaultTo('user')

  table.timestamp('created_at').defaultTo(knex.fn.now)
  table.timestamp('uodated_at').defaultTo(knex.fn.now)
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("users");
