import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Utilitários para pegar o caminho correto do arquivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../../products.json');

export default class ProductManager {
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

  async getProducts() {
    return await this.#readFile();
  }

  async getProductById(id) {
    const products = await this.#readFile();
    return products.find(p => p.id === id);
  }

  async addProduct(productData) {
    const products = await this.#readFile();

    const newProduct = {
      id: Date.now().toString(), // ID único baseado em timestamp
      ...productData
    };

    products.push(newProduct);
    await this.#writeFile(products);
    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this.#readFile();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProduct = {
      ...products[index],
      ...updates,
      id: products[index].id // Garante que o ID não será alterado
    };

    products[index] = updatedProduct;
    await this.#writeFile(products);
    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = await this.#readFile();
    const filtered = products.filter(p => p.id !== id);
    if (products.length === filtered.length) return false;
    await this.#writeFile(filtered);
    return true;
  }
}
