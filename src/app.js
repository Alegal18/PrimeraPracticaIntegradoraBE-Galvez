import fs from 'fs';
import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import http from 'http'
import { productsRouter } from './routes/product.routes.js';
import {cartRouter} from './routes/carts.router.js';
import { Server } from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new Server(server);

server.listen(8080, () => {
    console.log('Escuchando el 8080')
})


app.engine('handlebars', handlebars.engine());

app.use(express.json());

app.use(express.static('/public'));

app.use(express.urlencoded({ extended:true }));

app.use('/api/products', productsRouter);

app.use('/api/carts', cartRouter);

app.set('views', 'views/');

app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'public'));

app.get('/', (req, res) => {
    const products = getProductList();
    res.render('index', {products});
});
app.get('/realtimeproducts', (req, res) => {
    const products = getProductList();
    res.render('realtimeproducts', {products});
});

io.on('connection', (socket) => {
    console.log('usuario conectado');

    socket.on('newProduct', (product) => {
        console.log(`Producto ${JSON.stringify(product)} agregado`);
        io.emit('newProduct', product);
    });

    socket.on('deleteProduct', (productId) => {
        console.log(`Producto ${productId} eliminado`);

        io.emit('deleteProduct', productId);
    });
    socket.on('disconnect', () => {
        console.log('usuario desconectado');
    });
});

function getProductList() {
    const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));
    return products;
}

