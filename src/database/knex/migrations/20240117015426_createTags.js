/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable('tags', table => {
  table.increments('id')
  table.text('name').notNullable()

  table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE')
  table.integer('user_id').references('id').inTable('users')
})


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('tags')
