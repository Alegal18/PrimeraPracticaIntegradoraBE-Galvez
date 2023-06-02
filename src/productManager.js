import fs from 'fs';

class ProductManager {
  id = 1;
  constructor(path) {
    this.path = path;
  }
  
  async addProduct(productoNuevo) {
    
    try {
    
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }

    const { title, description, price, thumbnail, code, stock } = productoNuevo;

    if (title == undefined || description == undefined || price == undefined || thumbnail == undefined || code == undefined || stock == undefined) {
      return console.log('Completar todos los campos');
    } else {
      let producto = [];
    
      let productoContenido = await fs.promises.readFile(this.path, 'utf-8');
      producto = JSON.parse(productoContenido);

      const productoEncontrado = producto.some((item) => item.code == code);
      if (productoEncontrado) {
        return console.log('El producto ya existe');
      } else {
        if (producto.length > 0) {
          this.id = producto[producto.length - 1].id + 1;
        }
        const product = { id: this.id, ...productoNuevo };
        producto.push(product);
        let productString = JSON.stringify(producto, null, 2);
        await fs.promises.writeFile(this.path, productString);
        return console.log('Producto adicionado');
      }
    }
    } catch (error){
      console.log(error);
    }
  }

  async getProducts() {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }
    let producto = [];

    let productoContenido = await fs.promises.readFile(this.path, 'utf-8');
    producto = JSON.parse(productoContenido);
    return producto;
  }

  
  async getProductById(id) {

    try{

    
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }
    let producto = [];
    let productoContenido = await fs.promises.readFile(this.path, 'utf-8');
    producto = JSON.parse(productoContenido);
    const productoEncontrado = producto.find((item) => item.id == id);
    if (productoEncontrado) {
      console.log('El producto encontrado es ', productoEncontrado);
      return productoEncontrado;
    } else {
      console.log('No ha sido encontrado el Producto', id);
    }
  } catch (error){
    console.log(error);
  } 

  }

    

async updateProduct(id, modifyProduct) {
  try {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }
    let producto = [];
    let productoContenido = await fs.promises.readFile(this.path, 'utf-8');
    producto = JSON.parse(productoContenido);

    const { title, description, price, thumbnail, stock } = modifyProduct;
    let indexProduct = producto.findIndex((index) => index.id === id);
    if (indexProduct !== -1) {
      producto[indexProduct].title = title || producto[indexProduct].title;
      producto[indexProduct].description = description || producto[indexProduct].description;
      producto[indexProduct].price = price || producto[indexProduct].price;
      producto[indexProduct].thumbnail = thumbnail || producto[indexProduct].thumbnail;
      producto[indexProduct].stock = stock || producto[indexProduct].stock;

      let productString = JSON.stringify(producto, null, 2);
      await fs.promises.writeFile(this.path, productString);
      return 'Producto Modificado';
    } else {
      return 'El producto no fue encontrado';
    }
  } catch (error) {
    console.log(error);
  }
}

async deleteProduct(id) {
  try {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }
    let producto = [];
    let productoContenido = await fs.promises.readFile(this.path, 'utf-8');
    producto = JSON.parse(productoContenido);

    let indexProduct = producto.findIndex((index) => index.id === id);
    if (indexProduct !== -1) {
      producto.splice(indexProduct, 1);
      let productString = JSON.stringify(producto, null, 2);
      await fs.promises.writeFile(this.path, productString);
      return 'Producto eliminado!';
    } else {
      return 'El producto no fue encontrado';
    }
  } catch (error) {
    console.log(error);
  }
}
}


export default ProductManager;

