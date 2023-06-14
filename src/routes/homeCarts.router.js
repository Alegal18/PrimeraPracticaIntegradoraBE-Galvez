import express from 'express';
import { CartModel } from '../DAO/models/carts.models.js';

export const cartsHtml = express.Router();

cartsHtml.get('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await CartModel.findOne({ _id: cid }).populate('products.product');
    const idCart = cart._id;

    console.log('Cart', cart);
    console.log('Product', cart.products);

    return res.status(200).render('carts', { cart, idCart });
  } catch (error) {
    console.log(error);
  }
});