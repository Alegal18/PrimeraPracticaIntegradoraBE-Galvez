import express from 'express';
import ProductManager from '../EjemploClases.js';

const app = express();

let productManager = new ProductManager();

app.use(express.urlencoded({ extended:true }));

app.get("/products", async (req, res) => {    
    const products = await productManager.getProducts();        
    const limite = req.query.limit
    console.log(limite)
    if(!limite || limite === 0) {
        return res.send(products); 
    } else {
        return res.send(products.slice(0, limite))
    }       
    
});
app.get("/products/:pid", async (req, res) => {
    const products = await productManager.getProducts()
    let prodId = products.find((producto) => producto.id === Number(req.params.pid))    
        
    if(!prodId) return res.send('Producto no encontrado')       
            
    return res.send(prodId)
});

app.listen(8080, () => {
    console.log('estoy escuchando el 8080')
})