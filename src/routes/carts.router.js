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
  try {
    const updatedCart = await cartManager.addProductToCart(cid, pid);
    if (!updatedCart) {
      return res.status(404).json({ error: 'Carrinho ou Produto não encontrado' });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error);
    res.status(500).json({ error: 'Erro interno ao adicionar produto ao carrinho' });
  }
});

export default router;
