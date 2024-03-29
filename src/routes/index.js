const { Router } = require('express')

//import other routes
const usersRoutes = require('./users.routes')
const sessionsRoutes = require('./sessions.routes')
const dishesRoutes = require('./dishes.routes')
const ingredientsRoutes = require('./ingredients.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/ingredients', ingredientsRoutes)

module.exports = routes