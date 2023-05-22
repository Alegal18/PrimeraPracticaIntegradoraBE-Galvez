import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { productsRouter } from './routes/product.routes.js';
import {cartRouter} from './routes/carts.router.js';
import { Server } from 'socket.io';



const app = express();

const httpServer = app.listen(8080, () => {
    console.log('Escuchando el 8080')
})

const socketServer = new Server(httpServer)

socketServer.on('connection', socket=> {
    console.log('Nuevo Cliente Conectado')

    socket.on('mensaje', (data)=>{
        console.log(data)
    })
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

