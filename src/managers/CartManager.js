import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'carts.json');

class CartManager {
    constructor() {
        this.carts = [];
        this.loadCarts();
    }

    loadCarts() {
        try {
            const data = fs.readFileSync(dataPath, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    saveCarts() {
        const data = JSON.stringify(this.carts, null, 2);
        fs.writeFileSync(dataPath, data, 'utf-8');
    }

    addCart() {
        const newCart = {
            id: this.carts.length + 1,
            products: [],
        };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCartById(id) {
        return this.carts.find(cart => cart.id === id);
    }

    addProductToCart(cid, pid) {
        const cart = this.getCartById(cid);
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.product === pid);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }
            this.saveCarts();
            return cart;
        }
        return null;
    }

    updateCart(id, updatedCart) {
        const index = this.carts.findIndex(cart => cart.id === id);
        if (index !== -1) {
            this.carts[index] = { ...this.carts[index], ...updatedCart };
            this.saveCarts();
            return this.carts[index];
        }
        return null;
    }

    deleteCart(id) {
        const index = this.carts.findIndex(cart => cart.id === id);
        if (index !== -1) {
            const deletedCart = this.carts[index];
            this.carts.splice(index, 1);
            this.saveCarts();
            return deletedCart;
        }
        return null;
    }
}

export default CartManager;
