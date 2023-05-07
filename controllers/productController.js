import Product from '../model/product.js';

const productController = {

  //GET ALL USERS
  getAllProduct: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 8;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = {};

      const searchText = req.query.searchText ? { name: { $regex: req.query.searchText, $options: 'i' } } : {};

      const totalProducts = await Product.countDocuments(searchText).exec();
      if (endIndex < totalProducts) {
        results.next = {
          page: page + 1,
          limit: limit
        };
      }
      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
          limit: limit
        };
      }
      results.totalProducts = totalProducts;
      results.products = await Product.find(searchText).skip(startIndex).limit(limit).exec();
      res.json(results);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // ADD PRODUCTS
  createProduct: async (req, res) => {
    const {name, code, discount, price, color, describe} = req.body;
    try {
      const newProduct = await new Product({name, code, discount, price, color, describe});
      const product = await newProduct.save();
      res.status(201).json(product);
    } catch(error) {
      console.log(error.message);
      res.status(500).send("Error creating product");
    }
  },

  // UPDATE PRODUCTS
  updateProducts: async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, describe, price } = req.body;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }
      product.name = name || product.name;
      product.describe = describe || product.describe;
      product.price = price || product.price;
      await product.save();
      res.send(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  deleteProducts: async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await Product.findOneAndDelete({ _id: productId });
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json("Delete successful");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
export default productController;
