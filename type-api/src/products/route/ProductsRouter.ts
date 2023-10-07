import { Router } from 'express'
import ProductsController from '../controller/ProductsController'

export default class ProductsRouter {
  router: Router

  constructor (private readonly productsController: ProductsController) {
    this.router = Router()
    this.routes()
  }

  routes = (): void => {
    //OBbttener productos
    this.router.get('/products', this.productsController.getProducts)
    //Obteener un producto por ID
    this.router.get('/product/:id', this.productsController.getProductById)
    //Eliminar un producto por ID
    this.router.delete('/product/:id',this.productsController.deleteProduct)
    //Agregar un producto
    this.router.post('/newProduct', this.productsController.newProduct)

    this.router.put('/updateProduct', this.productsController.updateProduct)

    this.router.post('/products/price', this.productsController.getProductsByPrice)
    this.router.get('*', this.productsController.controlError)
  }
}