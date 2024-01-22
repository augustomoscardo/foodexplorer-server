const knex = require('../database/knex')
const AppError = require('../utils/appError')
const multer = require('multer')
const uploadConfig = require('../configs/upload')
const DiskStorage = require('../providers/diskStorage')

class DishAvatarController {
  async update(request, response) {
    console.log(request.file.filename);

    const { id } = request.params
    const avatarFileName = request.file.filename

    const diskStorage = new DiskStorage()

    const dish = await knex('dishes').where({ id }).first()

    if (dish.avatar) {
      await diskStorage.deleteFile(dish.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFileName)

    dish.avatar = filename

    await knex('dishes').update(dish).where({ id })

    return response.status(201).json(dish)
  }
}

module.exports = DishAvatarController