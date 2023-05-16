import fs from 'fs';
import ProductManager from './productManager.js';

export default class CartManager {    
    
    
    async createCart() {

        const carts = JSON.parse(await fs.promises.readFile ('./carrito.json', 'utf-8'));
        

        const newCart = {
            id: Date.now(),
            products: [],
        };
        
        carts.push(newCart);

        await fs.promises.writeFile(
            './carrito.json',
            JSON.stringify(carts) // Transformo el array en string
        );
        return carts;
    }
    
    async addCart(cartId, productId, quantity = 1) {        
        
        const contenido = await fs.promises.readFile ('./carrito.json', 'utf-8');
    
        const carts = JSON.parse(contenido);                   
        
        const cartIndex = carts.findIndex(
			(cart) => cart.id === cartId
		);
		try {
		    if (cartIndex !== -1) {            
			    throw new Error('Carrito inexistente');
		    }
            const productIndex = carts[cartIndex].products.findIndex((product) => product.id === productId);
            if (productIndex === -1) {
                carts[cartIndex].products.push({
                id: productId,
                quantity,
                });
            } else {   
                carts[cartIndex].products[productIndex].quantity += quantity;                
            }
                await fs.promises.writeFile('./carrito.json', JSON.stringify(carts));
                return carts[cartIndex];
        } catch (err) {                
                // Si hay error imprimo el error en consola
                console.log('No puedo agregar el carrito');
        }       
                 
    }  
    
    async getCart(cartId) {
        try {
            const data = await fs.promises.readFile('./carrito.json', 'utf-8');
            const cartData = JSON.parse(data);
            
            const cart = cartData.find((cart) => cart.id === cartId);
            
            if (!cart) {
                throw new Error('Carrito inexistente');
            }  
            return cart;     
                                 
        } catch (error) {
            console.log('Error al cargar los carritos');
        }
    }    
    

    async deleteProduct(carId) {
        const carts = await this.getCart();
        const index = carts.find(cart => cart.id === carId);
        if (index) {
        const cartActualizado = carts.filter(cart => cart.id !== carId);
        await fs.promises.writeFile('./carrito.json', JSON.stringify(cartActualizado));     
        }    
    }    

}

let productoCarrito = new CartManager();
