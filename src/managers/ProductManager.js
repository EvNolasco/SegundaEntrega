import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'products.json');

class ProductManager {
    constructor() {
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(dataPath, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(dataPath, data, 'utf-8');
    }

    addProduct(productData) {
        const newProduct = {
            id: this.products.length + 1,
            ...productData,
            status: productData.status !== undefined ? productData.status : true
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct, id: this.products[index].id };
            this.saveProducts();
            return this.products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.products[index];
            this.products.splice(index, 1);
            this.saveProducts();
            return deletedProduct;
        }
        return null;
    }
}

export default ProductManager;
