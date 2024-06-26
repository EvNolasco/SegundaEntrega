import express from 'express';
import ProductManager from '../managers/ProductManager.js';
import CartManager from '../managers/CartManager.js';

const router = express.Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get('/', (req, res) => {
  res.render('home', {
    products: productManager.getProducts(),
  });
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {
    products: productManager.getProducts(),
  });
});

export default router;
