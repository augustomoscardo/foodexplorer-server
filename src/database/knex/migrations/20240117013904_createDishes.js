/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable('dishes', table => {
  table.increments('id')
  table.text('name').notNullable()
  table.text('description').notNullable()
  table.decimal('price').notNullable()
  table.text('avatar').notNullable()

  table.integer('user_id').references('id').inTable('users')

  table.timestamp('created_at').defaultTo(knex.fn.now)
  table.timestamp('updated_at').defaultTo(knex.fn.now)
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('dishes')
