const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())

// routes
app.get('/', (request, response) => {
  response.send('Hello Node API')
})

app.get('/blog', (request, response) => {
  response.send('Blog Route ')
})

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message,
    })
  }
})

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
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
