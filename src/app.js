import express from 'express';
import ProductManager from '../EjemploClases.js';

const app = express();

let productManager = new ProductManager();

app.use(express.urlencoded({ extended: true }))

app.get("/products", async (req, res) => {
    const products = await productManager.getProducts()    
    const limite = req.query.limit
    if(!limite || limite === 0){
        res.send(products)
    } else {
        res.send(products.slice(limite))
    }
    
});
app.get("/products/:pid", async (req, res) => {
    const products = await productManager.getProducts()
    let prodId = products.find((producto) => {
        return producto.id === req.params.id;
    }) 
    res.send(prodId)
});

app.listen(8080, () => {
    console.log('estoy escuchando el 8080')
})