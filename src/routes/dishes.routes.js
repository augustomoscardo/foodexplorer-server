const { Router } = require('express')
const DishesController = require('../controllers/dishesController')
const DishAvatarController = require('../controllers/dishAvatarController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const multer = require('multer')
const uploadConfig = require('../configs/upload')
const upload = multer(uploadConfig.MULTER)

const dishesRoutes = Router()

const dishesController = new DishesController()
const dishAvatarController = new DishAvatarController()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post('/:userId', upload.single('avatar'), dishesController.create)
dishesRoutes.put('/:id', dishesController.update)
dishesRoutes.patch('/:id/avatar', upload.single('avatar'), dishAvatarController.update)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', dishesController.delete)

module.exports = dishesRoutes