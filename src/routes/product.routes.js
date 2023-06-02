import express from 'express';
import ProductManager from '../productManager.js';

const container = new ProductManager('./src/data/products.json');
export const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await container.getProducts();
    if (limit) {
      return res.status(200).json(products.slice(0, limit));
    } else {
      return res.status(200).json(products);
    }
  } catch (error) {
    console.log(error);
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await container.getProductById(parseInt(id));

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(400).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
  }
});

productsRouter.post('/', async (req, res) => {
  try {
    const product = req.body;
    const result = await container.addProduct(product);
    return res.status(201).json({ message: result });
  } catch (error) {
    console.log(error);
  }
});

productsRouter.put('/:id', async (req, res) => {
  try {
    const modifyProduct = req.body;
    if (modifyProduct.id) {
      return res.status(400).json({ error });
    }

    const id = req.params.id;
    const result = await container.updateProduct(parseInt(id), modifyProduct);
    return res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
  }
});

productsRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await container.deleteProduct(parseInt(id));
    return res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
  }
});