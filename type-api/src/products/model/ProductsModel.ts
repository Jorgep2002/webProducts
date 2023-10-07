import { ProductInterface } from '../types/ProductInterface';
import products from '../database/products.json';
import fs from 'fs';

export default class ProductsModel {
  getProducts = async (): Promise<ProductInterface[]> => {
    return await new Promise((resolve, reject) => {
      try {
        resolve(products)
      } catch (error) {
        reject(error)
      }
    })
  }

  getProductById = async (id: number): Promise<ProductInterface> => {
    return await new Promise((resolve, reject) => {
      try {
        const product = products.find((product) => product.id === id)
        if (product !== undefined) {
          resolve(product as ProductInterface)
        } else {
          reject(new Error('Product not found'))
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  getProductsByPrice = async (min: number, max: number): Promise<ProductInterface[]> => {
    return await new Promise((resolve, reject) => {
      try {
        const productsByPrice = products.filter((product) => product.price >= min && product.price <= max)
        resolve(productsByPrice)
      } catch (error) {
        reject(error)
      }
    })
  }

  deleteProduct = async(id:string):Promise<ProductInterface[]> =>{

    const idToDelete = parseInt(id, 10);
    return await new Promise((resolve, reject) => {
      try {
        const indexToDelete = products.findIndex(obj => obj.id === idToDelete);
        products.splice(indexToDelete, 1);
        fs.writeFileSync('./src/products/database/products.json', JSON.stringify(products, null, 2), 'utf-8');
        resolve(products)
      } catch (error) {
        reject(error)
      }
    })

  }
  addProduct = async(product:ProductInterface):Promise<ProductInterface[]>=>{
    console.log(product)
    return await new Promise((resolve, reject) => {
      try {
        const filePath = './src/products/database/products.json';

        // Cargar el contenido actual del archivo JSON
        const currentData = fs.readFileSync(filePath, 'utf-8');
        const products = JSON.parse(currentData);
        
        // Datos del nuevo producto
       
        
        // Agregar el nuevo producto al arreglo existente
        products.push(product);
        
        // Escribir el contenido actualizado en el archivo JSON
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
        resolve(products)
      } catch (error) {
        reject(error)
      }
    })

  }
  updateProduct = async (updatedProduct: ProductInterface): Promise<ProductInterface[]> => {
    console.log(updatedProduct);
    return await new Promise((resolve, reject) => {
      try {
        const filePath = './src/products/database/products.json';
  
        const currentData = fs.readFileSync(filePath, 'utf-8');
        const products = JSON.parse(currentData);
  
        // Encuentra el índice del producto que deseas actualizar en el arreglo
        const productIndex = products.findIndex((product:ProductInterface) => product.id === updatedProduct.id);
  
        if (productIndex !== -1) {
          // Reemplaza el producto existente con el producto actualizado
          products[productIndex] = updatedProduct;
          fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
          resolve(products);
        } else {
          // Manejar el caso en el que el producto no se encuentra
          reject(new Error('El producto no se encontró para actualizar'));
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}