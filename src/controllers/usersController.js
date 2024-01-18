const AppError = require('../utils/appError')
const knex = require('../database/knex')
const { hash, compare, decodeBase64 } = require('bcryptjs')
// const sqlConn = require('../database/sqlite')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
      throw new AppError('Todos os campos são obrigatórios!')
    }

    // const database = await sqlConn()

    const checkIfUserExists = await knex('users').where({ email }).first()

    if (checkIfUserExists) {
      throw new AppError('Usuário já possui cadastro.')
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({
      name,
      email,
      password: hashedPassword
    })


    return response.status(201).json({ message: 'Usuário cadastrado com sucesso.' })
  }

  async update(request, response) {
    const { name, email, password, oldPassword } = request.body
    const userId = request.params.id

    const user = await knex('users').where({ id: userId }).first()

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    const userEmail = await knex('users').where({ email }).first()

    //check if email is being used, and check if user in params is the same user found in DB
    if (userEmail && userEmail.id !== user.id) {
      throw new AppError('Este e-mail já está em uso')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !oldPassword) {
      throw new AppError('Você precisa informar a senha antiga para definir uma nova senha')
    }

    if (password && oldPassword) {
      const checkPassword = await compare(oldPassword, user.password)
      console.log(checkPassword);

      if (!checkPassword) {
        throw new AppError('A senha antiga não confere.')
      }

      user.password = await hash(password, 8)
    }

    const updated_at = new Date()
    console.log(updated_at);

    await knex('users')
      .where({ id: userId })
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: knex.fn.now()
      })

    return response.status(200).json({ message: 'Usuário atualizado com sucesso.' })

  }
}

module.exports = UsersController