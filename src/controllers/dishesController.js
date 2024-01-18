const knex = require('../database/knex')
const AppError = require('../utils/appError')

class DishesController {
  async create(request, response) {
    const { name, description, price, ingredients } = request.body
    const { userId } = request.params

    const [movieCreatedId] = await knex('dishes').insert({
      name,
      description,
      price,
      user_id: userId
    })

    const ingredientsToCreate = ingredients.map(ingredient => {
      return {
        movieCreatedId,
        name,
        user_id: userId
      }
    })

    return response.status(201).json({ message: 'Prato criado com sucesso.' })
  }

  update(request, response) { }

  index(request, response) { }

  show(request, response) { }

  delete(request, response) { }
}

module.exports = DishesController