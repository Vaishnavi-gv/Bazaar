import { Product } from "../models/productModel.js";


// CREATE PRODUCT (Admin)
export const createProduct = async (req, res) => {
  try {

    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      product: savedProduct
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};