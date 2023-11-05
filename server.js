require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express()

const { MONGO_URL, PORT } = process.env

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/products', productRoute)

app.get('/', (request, response) => {
  response.send('Hello Node API')
})

app.get('/blog', (request, response) => {
  response.send('Blog Route ')
})

app.use(errorMiddleware)

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('connected to MongoDB')

    // main app init
    app.listen(PORT, () => {
      console.log(
        'Node API app running on port ' + PORT
      )
    })
  })
  .catch((error) => {
    console.error(error.message)
  })
