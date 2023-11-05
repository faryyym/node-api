const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')
const {
  getProducts,
  updateProduct,
  getProduct,
  deleteProduct,
  createProduct,
} = require('../controllers/productController')

// POST A PRODUCT
router.post('/', createProduct)

// UPDATE A PRODUCT
router.put('/:id', updateProduct)

// GET ALL PRODUCTS
router.get('/', getProducts)

// GET PRODUCT BY ID
router.get('/:id', getProduct)

// DELETE PRODUCT
router.delete('/:id', deleteProduct)

module.exports = router
