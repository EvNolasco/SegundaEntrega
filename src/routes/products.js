import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.post('/', (req, res) => {
  const { name, price } = req.body;
  const newProduct = productManager.addProduct({ name, price });

  router.io.emit('updateProducts', productManager.getProducts());

  res.redirect('/');
});

export default function(io) {
  router.io = io;
  return router;
}
