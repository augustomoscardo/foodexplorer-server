const knex = require('../database/knex')

class IngredientsController {
  async index(request, response) {
    const ingredients = await knex('ingredients').groupBy('name')

    return response.status(200).json(ingredients)
  }
}

module.exports = IngredientsController