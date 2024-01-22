require('express-async-errors')

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const cookieParser = require('cookie-parser')
// const database = require("./database/sqlite")

const app = express()

const AppError = require('./utils/appError')

// database()

app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:5173', '127.0.0.1:5173'],
  credentials: true
}))
app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3333, () => {
  console.log(`Server running on port 3333!`);
})

