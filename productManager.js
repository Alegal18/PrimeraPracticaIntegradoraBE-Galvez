import fs from 'fs';

export default class ProductManager {
    #id = 0;
    constructor(){
        if (!fs.existsSync('./products.json')) {
			// escribo el archivo de forma sincronica con un array vacio
			fs.writeFileSync('./products.json', JSON.stringify([]));
		} 
        this.path = './products.json'; 
        this.products = [];                
    }     
    
    
    async addProduct(title, description, price, thumbnail, code, stock) {
        
        const product = {
            title:title,
            description: description,
            price:price,
            status:true,
            thumbnail:thumbnail,
            code:code,
            stock:stock,                                   
        } 
        product.id = this.#getId();
        
        
        const productos = await this.getProducts();
        const productoCodigo = productos.findIndex(
			(producto) => producto.code === product.code
		);
		try {
		    if (productoCodigo !== -1) {            
			    console.log('Producto Existente');
			    return; 
		    }else {            
                             
                const actualProducts = await this.getProducts();
                
                actualProducts.push(product);    
                
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(actualProducts) // Transformo el array en string
                );
            }
        } catch (err) {                
                // Si hay error imprimo el error en consola
                console.log('No puedo agregar el producto');
            }             
                 
    }

    #getId() {
        this.#id++;        
		return this.#id;       
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);       
                                 
          } catch (error) {
            console.log('Error al cargar los productos');
          }
    }

    async getProductById(id) {
        const productos = await this.getProducts();
        productos.forEach((elem) =>{
            if(id === elem.id) {
                console.log(elem);
                return;                
            }else {
                throw new Error('Not found')
            }            
        })                 
    } 
    
    async upDateProduct(id, title, description, price, thumbnail, code, stock) {
        const productoModif = {
            title:title,
            description: description,
            price:price,
            thumbnail:thumbnail,
            code:code,
            stock:stock
        } 
        const productos = await this.getProducts();
        const index = productos.findIndex(product => product.id === id);        
        if (index !== -1) {
            productos[index] = {id, ...productoModif};            
            await fs.promises.writeFile(this.path, JSON.stringify(productos));           
        }
    }

    async deleteProduct(id) {
        const productos = await this.getProducts();
        const index = productos.find(product => product.id === id);
        if (index) {
        const prodActualizado = productos.filter(product => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(prodActualizado));     
        }    
    }    

}

let producto = new ProductManager()

// producto.addProduct('leche', 'larga vida', 400, 'sin imagen', 2, 20)
// producto.addProduct('leche', 'larga vida', 400, 'sin imagen', 2, 20)
// producto.addProduct('queso', 'dambo', 600, 'sin imagen', 3, 80)
// producto.addProduct('salame', 'carolla', 800, 'sin imagen', 5, 300);
// producto.addProduct('choclo', 'cremoso', 100, 'sin imagen', 6, 100)
// producto.addProduct('choclo', 'grano', 200, 'sin imagen', 7, 200)
// producto.addProduct('salsa', 'bolognesa', 200, 'sin imagen', 8, 180)
// producto.addProduct('jabon', 'tocador', 500, 'sin imagen', 9, 300);
// producto.addProduct('shampoo', 'c.graso', 200, 'sin imagen', 10, 280)
// producto.addProduct('afeitadora', 'gillete', 800, 'sin imagen', 11, 300);
producto.addProduct('perfume', 'colbert', 400, 'sin imagen', 13, 500);
// producto.upDateProduct(2, 'leche', 'larga vida', 700, 'sin imagen', 2, 20)
// producto.deleteProduct(1)
// producto.getProductById(2);

