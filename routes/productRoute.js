const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')

// POST A PRODUCT
router.post('/products', async (req, res) => {
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
router.put('/products/:id', async (req, res) => {
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
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET PRODUCT BY ID
router.get('/products/:id', async (req, res) => {
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
router.delete(
  '/products/:id',
  async (req, res) => {
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
  }
)

module.exports = router
