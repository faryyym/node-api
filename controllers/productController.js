const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

// GET ALL PRODUCT
const getProducts = asyncHandler(
  async (req, res) => {
    try {
      const products = await Product.find({})
      res.status(200).json(products)
    } catch (error) {
      res.status(500)
      throw new Error(error.message)
    }
  }
)

// GET SINGLE PRODUCT
const getProduct = asyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params
      const product = await Product.findById(id)

      if (!product) {
        res.status(404)
        throw new Error(
          `cannot find any product with id ${id}`
        )
      }
      res.status(200).json(product)
    } catch (error) {
      res.status(500)
      throw new Error(error.message)
    }
  }
)

// POST NEW PRODUCT
const createProduct = asyncHandler(
  async (req, res) => {
    try {
      const product = await Product.create(
        req.body
      )
      res.status(200).json(product)
    } catch (error) {
      res.status(500)
      throw new Error(error.message)
    }
  }
)

// UPDATE PRODUCT BY ID
const updateProduct = asyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params
      const product =
        await Product.findByIdAndUpdate(
          id,
          req.body
        )
      if (!product) {
        res.status(404)
        throw new Error(
          `cannot find any product with id ${id}`
        )
      }
      const updatedProduct =
        await Product.findById(id)
      res.status(200).json(updatedProduct)
    } catch (error) {
      res.status(500)
      throw new Error(error.message)
    }
  }
)

// DELETE PRODUCT BY ID
const deleteProduct = asyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params
      const product =
        await Product.findByIdAndDelete(id)
      if (!product) {
        res.status(404)
        throw new Error(
          `cannot find any product with id ${id}`
        )
      }
      res.status(200).json(product)
    } catch (error) {
      res.status(500)
      throw new Error(error.message)
    }
  }
)

module.exports = {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
}
