const express = require('express')
const mongoose = require('mongoose')
const app = express()

// routes
app.get('/', (request, response) => {
  response.send('Hello Node API')
})

app.get('/blog', (request, response) => {
  response.send('Blog Route ')
})

mongoose
  .connect(
    'mongodb+srv://farym:weh0say@cluster0.xgn3r2l.mongodb.net/ownApi?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('connected to MongoDB')

    // main app init
    app.listen(3000, () => {
      console.log('Node API app running')
    })
  })
  .catch((error) => {
    console.error(error.message)
  })
