import fs from 'fs';

export default class CartManager {
    #idCart = 0;
    constructor(){
        
        if (!fs.existsSync('./carrito.json')) {
			// escribo el archivo de forma sincronica con un array vacio
            
			fs.writeFileSync('./carrito.json', JSON.stringify([]));
		} 
        this.path = './carrito.json';                       
    }     
    
    async addCart(listProduct) {
        const newCart = {            
            products:[listProduct]
        }
        newCart.id = this.#getId();
        const contenido = await fs.promises.readFile (this.path, 'utf-8');
    
        const carritos = JSON.parse(contenido);             
        
        const cartId = carritos.find(
			(e) => e.products.code === listProduct.products.code
		);
		try {
		    if (cartId) {            
			    carritos.map((cart) => cart[products].quantity++) 
                                    
			    return carritos; 
		    }else {            
                             
                const actualCarrito = await this.getCart();
                
                actualCarrito.push(newCart);    
                
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(actualCarrito) // Transformo el array en string
                );
            }
        } catch (err) {                
                // Si hay error imprimo el error en consola
                console.log('No puedo agregar el carrito');
            }         
                 
    }

    #getId() {
        this.#idCart++;        
		return this.#idCart;       
    }
    
    async getCart() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);       
                                 
          } catch (error) {
            console.log('Error al cargar los carritos');
          }
    }    
    

    async deleteProduct(id) {
        const productos = await this.getCart();
        const index = productos.find(product => product.id === id);
        if (index) {
        const prodActualizado = productos.filter(product => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(prodActualizado));     
        }    
    }    

}

let productoCarrito = new CartManager()

