import { Router } from 'express';
import CartManager from '../../cartManager.js';

let cartManager = new CartManager();

const cartRouter = Router();


cartRouter.post('/:cid/product/:pid', async(req, res) => {
        
    let carrito = req.body;
    let pos = cartManager.addCart(carrito);
    res.status(201).send(pos, carrito)    
    
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