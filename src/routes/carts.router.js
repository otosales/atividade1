import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager();

// POST /api/carts/ - cria um novo carrinho
router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

// GET /api/carts/:cid - busca os produtos de um carrinho pelo ID
router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  if (!cart) {
    return res.status(404).json({ error: 'Carrinho não encontrado' });
  }
  res.json(cart.products);
});

// POST /api/carts/:cid/product/:pid - adiciona um produto ao carrinho
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const updatedCart = await cartManager.addProductToCart(cid, pid);
  if (!updatedCart) {
    return res.status(404).json({ error: 'Carrinho não encontrado' });
  }
  res.json(updatedCart);
});

export default router;
