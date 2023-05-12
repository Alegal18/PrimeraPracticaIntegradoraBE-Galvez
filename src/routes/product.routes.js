import {Router} from 'express';
import ProductManager from '../../productManager.js';

let productManager = new ProductManager();

const productsRouter = Router();


productsRouter.get("/", async (req, res) => {    
    const products = await productManager.getProducts();
          
    const limite = req.query.limit
    
    if(!limite || limite === 0) {
          
        return res.send(products); 
    } else {
        return res.send(products.slice(0, limite))
    }       
    
});
productsRouter.get("/:pid", async (req, res) => {
    try{
        const products = await productManager.getProducts()
        let prodId = products.find((producto) => producto.id === Number(req.params.pid))    
            
        if(!prodId) return res.send('Producto no encontrado')       
                
        return res.send(prodId)
    } catch (err) {
        res.status(400).send({err})
    }    
});

productsRouter.post('/', (req, res) => {
    let product = req.body;
    let pos = productManager.addProduct(product);
    res.status(201).send(pos)
})

productsRouter.put("/:pid", async (req, res) => {
     const index = req.params.pid
     let product = req.body;
    try{          
        productManager.upDateProduct(index, product)                       
        res.send(product)
    } catch (err) {
        res.status(400).send({err})
    }    
});
productsRouter.delete("/:pid", async (req, res) => {
    const index = req.params.pid    
   try{          
    productManager.deleteProduct(index)                       
       res.send()
   } catch (err) {
       res.status(400).send({err})
   }    
});

export {productsRouter} 