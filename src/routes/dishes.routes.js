const { Router } = require('express')
const DishesController = require('../controllers/dishesController')

const dishesRoutes = Router()

const dishesController = new DishesController()

dishesRoutes.post('/:userId', dishesController.create)

module.exports = dishesRoutes