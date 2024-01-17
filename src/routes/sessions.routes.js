const { Router } = require('express')
const SessionsController = require('../controllers/sessionsController')

const sessionsCrontroller = new SessionsController()

const sessionsRoutes = Router()
sessionsRoutes.post('/', sessionsCrontroller.create)

module.exports = sessionsRoutes