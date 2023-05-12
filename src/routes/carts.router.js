import { Router } from 'express';
import CartManager from '../../cartManager.js';

let cartManager = new CartManager();

const cartRouter = Router();

cartRouter.post('/', async(req, res) => {
        
  const newCart = req.body;
  const cart = cartManager.createCart(newCart);
  res.status(201).send(cart)    
  
});  

cartRouter.post('/:cid/product/:pid', async(req, res) => {
        
    let cartId = req.params.cid;
    let productId = req.params.pid;
    const product = cartManager.addCart(cartId, productId)
    res.status(201).send(product)    
    
  });  

  cartRouter.get('/', async (req,res) =>{
  
    const carts = await cartManager.getCart();
    const cartId = parseInt(req.params.cid);
    const carrito = carts.find(carts => carts.id === cartId)
    if(!carrito){
        res.status(400).send({status:"error", message:"CARRITO NO ENCONTRADO"});
        return
    };
     res.status(200).send({status:"success", carrito});
    
  });

  export {cartRouter}