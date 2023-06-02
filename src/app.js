
import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { Server } from 'socket.io';
import ProductManager from './productManager.js';
import {cartRouter} from './routes/carts.router.js'
import { productsHtml } from './routes/homeProducts.router.js';
import { productsRouter } from './routes/product.routes.js';
import { productsRealTime } from './routes/realTimeProducts.router.js';
import { __dirname } from './utils.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

//Socket.io webSockets
const httpServer = app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});

//socket.io
const socketServer = new Server(httpServer);

/* Api Rest JSON */
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

/* HTML Render */
app.use('/home', productsHtml);
app.use('/realtimeproducts', productsRealTime);

/* Config Handlebars */
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'handlebars');

/* Socket */
socketServer.on('connection', (socket) => {
  console.log('Un cliente se ha conectado ');

  socket.on('new-product', async (newProduct) => {
    const data = new ProductManager('./src/data/products.json');
    console.log(data)
    await data.addProduct(newProduct);

    const products = await data.getProducts();
    console.log(products);
    socketServer.emit('products', products);
  });

  socket.on('delete-product', async (productId) => {
    const data = new ProductManager('./src/data/products.json');
    await data.deleteProduct(productId);

    const products = await data.getProducts();
    socketServer.emit('products', products);
  });
});

app.get('*', (req, res) => {
  return res.status(404).json({ status: 'error', message: 'No encontrado' });
});