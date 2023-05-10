import express from 'express';
import { productsRouter } from './routes/product.routes.js';
import {cartRouter} from './routes/carts.router.js';

const app = express();

app.use(express.json());

app.use(express.static('/public'));

app.use(express.urlencoded({ extended:true }));

app.use('/api/products', productsRouter);

app.use('/api/carts', cartRouter);

app.listen(8080, () => {
    console.log('estoy escuchando el 8080')
})