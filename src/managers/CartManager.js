import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Utilitários de caminho
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../../carts.json');

export default class CartManager {
  constructor() {
    this.path = filePath;
  }

  async #readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async #writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async createCart() {
    const carts = await this.#readFile();
    const newCart = {
      id: Date.now().toString(),
      products: []
    };
    carts.push(newCart);
    await this.#writeFile(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.#readFile();
    return carts.find(c => c.id === id);
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.#readFile();
    const cart = carts.find(c => c.id === cartId);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(p => p.product === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await this.#writeFile(carts);
    return cart;
  }
}
