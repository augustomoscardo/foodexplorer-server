const knex = require('../database/knex')
const AppError = require('../utils/appError')
const DiskStorage = require('../providers/diskStorage')

class DishesController {
  async create(request, response) {
    const { title, description, price, category, ingredients } = request.body
    const { userId } = request.params
    const avatarFileName = request.file.filename

    const diskStorage = new DiskStorage()
    const filename = await diskStorage.saveFile(avatarFileName)

    const [dishCreatedId] = await knex('dishes').insert({
      title,
      description,
      price,
      category,
      avatar: filename,
      user_id: userId
    })

    let ingredientsToCreate;
    if (typeof ingredients === 'string') {
      ingredientsToCreate = {
        dish_id: dishCreatedId,
        name: ingredients,
        user_id: userId
      }
    } else {
      ingredientsToCreate = ingredients.map(ingredient => {
        return {
          dish_id: dishCreatedId,
          name: ingredient,
          user_id: userId
        }
      })
    }

    await knex('ingredients').insert(ingredientsToCreate)

    return response.status(201).json({ message: 'Prato cadastrado com sucesso.' })
  }

  async update(request, response) {
    const { title, description, price, category, ingredients } = request.body
    const { id } = request.params

    const dish = await knex('dishes').where({ id })
    const dishIngredients = await knex('ingredients').where({ dish_id: id })
    console.log(dishIngredients);

    await knex('dishes').where({ id }).update({
      title,
      description,
      price,
      category,
      updated_at: knex.fn.now()
    })

    if (!dish) {
      throw new AppError('Prato não encontrado')
    }

    return response.status(200).json(dish)
  }

  async index(request, response) {
    const { title, ingredients } = request.query
    // const user_id = request.user.id

    let dishes;

    if (ingredients) {
      const filteredIngredients = ingredients.split(',').map(ingredient => ingredient.trim())
      dishes = await knex('ingredients')
        .select([
          'dishes.id',
          'dishes.title',
          'dishes.description',
          'dishes.price',
          'dishes.category',
          'dishes.avatar',
          'dishes.created_at',
          'dishes.updated_at'
        ])
        .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
        .whereLike('dishes.title', `%${title}%`)
        .whereIn('name', filteredIngredients)
        .groupBy('dishes.id')
        .orderBy('dishes.id')
    } else {
      dishes = await knex('dishes').whereLike('title', `%${title}%`).orderBy('id')
    }

    const dishIngredients = await knex('ingredients')
    const dishesWithTags = dishes.map(dish => {
      const dishTags = dishIngredients.filter(ingredient => ingredient.dish_id === dish.id)

      return {
        ...dish,
        ingredients: dishTags
      }
    })

    return response.status(200).json(dishesWithTags)
  }

  async show(request, response) {
    const { id } = request.params

    const dish = await knex('dishes')
      .where({ id })
      .first()
    // .innerJoin('ingredients', 'dishes.id', 'ingredients.dish_id')

    const ingredients = await knex('ingredients').where({ dish_id: id }).orderBy('name')

    dish.ingredients = ingredients

    return response.status(200).json({
      dish,
      ingredients
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('dishes').where({ id }).delete()

    return response.status(200).json({ message: 'Prato deletado com sucesso.' })
  }
}

module.exports = DishesController