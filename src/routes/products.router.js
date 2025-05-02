import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

// GET /api/products/ - listar todos os produtos
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// GET /api/products/:pid - buscar produto por ID
router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(pid);
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  res.json(product);
});

// POST /api/products/ - adicionar novo produto
router.post('/', async (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;

  if (!title || !description || !code || price == null || status == null || stock == null || !category || !thumbnails) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const newProduct = await productManager.addProduct({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  });

  res.status(201).json(newProduct);
});

// PUT /api/products/:pid - atualizar um produto
router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updates = req.body;

  if (updates.id) {
    return res.status(400).json({ error: 'Não é permitido atualizar o ID do produto' });
  }

  const updatedProduct = await productManager.updateProduct(pid, updates);
  if (!updatedProduct) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json(updatedProduct);
});

// DELETE /api/products/:pid - deletar um produto
router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  const success = await productManager.deleteProduct(pid);
  if (!success) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json({ message: 'Produto removido com sucesso' });
});

export default router;
