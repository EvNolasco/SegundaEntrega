import express from 'express';
import CartManager from '../managers/CartManager.js';

const router = express.Router();
const cartManager = new CartManager();

router.post('/', (req, res) => {
    const newCart = cartManager.addCart();
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const cart = cartManager.getCartById(parseInt(req.params.cid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Cart not found');
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const cart = cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Cart or product not found');
    }
});

export default router;
