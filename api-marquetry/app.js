require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()

const cors = require('cors')
const handleErrors = require('./middlewares/handleErrors')
const notFound = require('./middlewares/notFound')

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
const frameRoutes = require('./routes/frame.route')

app.use('/api/marquetry', frameRoutes)
app.use('/api/marquetry/search', frameRoutes)

// Validators
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = {
  app,
  server
}
