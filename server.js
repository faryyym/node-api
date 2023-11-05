require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

const { MONGO_URL, PORT } = process.env

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.get('/', (request, response) => {
  response.send('Hello Node API')
})

app.get('/blog', (request, response) => {
  response.send('Blog Route ')
})

// POST A PRODUCT
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

// UPDATE A PRODUCT
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product =
      await Product.findByIdAndUpdate(
        id,
        req.body
      )
    if (!product) {
      return res.status(404).json({
        message: `cannot find product with id ${id}`,
      })
    }
    const updatedProduct = await Product.findById(
      id
    )
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
})

// GET ALL PRODUCTS
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET PRODUCT BY ID
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

// DELETE PRODUCT
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product =
      await Product.findByIdAndDelete(id)
    if (!product) {
      res.status(404).json({
        message: `cannot find any product with id ${id}`,
      })
    }
    res.status(200).json(product)
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message })
  }
})

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
