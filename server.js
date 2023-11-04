const express = require('express')
const app = express()

// routes
app.get('/', (request, response) => {
  response.send('Hello Node API')
})

app.listen(3000, () => {
  console.log('Node API app running')
})
