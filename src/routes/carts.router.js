import { Router } from 'express';
import CartManager from '../../cartManager.js';

const cartRouter = Router();

let cartManager = new CartManager();

cartRouter.post('/', async(req, res) => {
        
  const crearCarrito = await cartManager.addCart()
    
    try {
        res.status(201).send(crearCarrito);
    } catch (error) {
        res.status(400).send({ error });
    }
});    
  

cartRouter.post('/:cid/product/:pid', async(req, res) => {
        
    let cartId = Number(req.params.cid);
    let productId = Number(req.params.pid);
    const product = cartManager.addCart(cartId, productId)
    res.status(201).send(product)    
    
  });  

  cartRouter.get('/:cid', async (req,res) =>{
  
    try {
      const id = Number(req.params.cid);
    let getID = await cartManager.getCart(id);
      res.status(200).send(await getID);
  } catch (err) {
      res.status(400).send({ err });
  }
    
  });


  export {cartRouter}