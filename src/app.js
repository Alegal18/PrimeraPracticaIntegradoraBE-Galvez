import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { cartsRouter } from './routes/carts.router.js';
import { productsHtml } from './routes/homeProducts.router.js';
import { productsRouter } from './routes/products.router.js';
import { productsRealTime } from './routes/realTimeProducts.router.js';
import { __dirname, connectMongo, connectSocket } from './utils.js';
import { chatRouter } from './routes/chat.router.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

//Socket.io webSockets
const httpServer = app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});


connectMongo();


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.use('/home', productsHtml);
app.use('/realtimeproducts', productsRealTime);
app.use('/chat', chatRouter);


app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


connectSocket(httpServer);

app.get('*', (req, res) => {
  return res.status(404).json({ status: 'error', message: 'No encontrado' });
});