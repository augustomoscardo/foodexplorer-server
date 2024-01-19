const { Router } = require('express')
const DishesController = require('../controllers/dishesController')

const dishesRoutes = Router()

const dishesController = new DishesController()

dishesRoutes.post('/:userId', dishesController.create)
dishesRoutes.put('/:userId', dishesController.update)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', dishesController.delete)

module.exports = dishesRoutes