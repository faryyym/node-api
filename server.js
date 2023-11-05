// IMPORTS
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')

const app = express()

const { MONGO_URL, PORT, FRONTEND } = process.env
const corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200,
}

// USE
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorMiddleware)

// ROUTES
app.use('/api/products', productRoute)

app.get('/', (request, response) => {
  response.send('Hello Node API')
})

app.get('/blog', (request, response) => {
  response.send('Blog Route ')
})

// MONGODB SETUP
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('connected to MongoDB')

    // APP INIT
    app.listen(PORT, () => {
      console.log(
        'Node API app running on port ' + PORT
      )
    })
  })
  .catch((error) => {
    console.error(error.message)
  })
