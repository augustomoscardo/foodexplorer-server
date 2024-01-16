const { Router } = require('express')

//import other routes
const usersRoutes = require('./users.routes')

const routes = Router()

routes.use('/users', usersRoutes)

module.exports = routes