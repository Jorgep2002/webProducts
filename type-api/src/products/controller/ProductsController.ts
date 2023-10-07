import { Response, Request} from 'express';
import ProductsModel from '../model/ProductsModel'



export default class ProductsController {
  constructor (private readonly productsModel: ProductsModel) { }


  
  
  // Obtener todos los productos
  getProducts = (_: Request, res: Response): void => {
    this.productsModel.getProducts().then((products) => {
      res.status(200).json(products)
    }).catch((err: Error) => {
      res.status(500).json(err)
    })
  }

  //Obtener un producto por id
  getProductById = (req: Request, res: Response): void => {
    const { id } = req.params
    this.productsModel.getProductById(Number(id)).then((product) => {
      res.status(200).json(product)
    }).catch((err: Error) => {
      res.status(500).json(err)
    })
  }

  //Manejar ruta de error
  controlError = (_: Request, res: Response): void => {
    res.status(404).json({ error: 'Not Found' })
  }

  //Obtener productos por precio
  getProductsByPrice = (req: Request, res: Response): void => {
    const { min, max } = req.body
    this.productsModel.getProductsByPrice(Number(min), Number(max)).then((products) => {
      res.status(200).json(products)
    }).catch((err: Error) => {
      res.status(500).json(err)
    })
  }
  //Eliminar un producto por ID
  deleteProduct = (req: Request, res: Response): void => {
    const { id } = req.params;
  
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: 'ID de producto no válido' });
      return;
    }
    
    this.productsModel.deleteProduct(id)
      .then(() => {
        res.status(200).json({ message: 'Producto eliminado con exito' });
      })
      .catch((err: Error) => {
        res.status(500).json({ message: 'Error al eliminar el producto', error: err.message });
      });
  };

 
  //Agregar un producto
  newProduct = (req: Request, res: Response) => {
    console.log(req.body)
      try {
        const { id, title, amount, price, description, favorite, discount, discountPer, discountUni,imagen } = req.body;

        console.log('ID:', id);
        console.log('Título:', title);
        console.log('Cantidad:', amount);
        console.log('Precio:', price);
        console.log('Descripción:', description);
        console.log('Favorito:', favorite);
        console.log('Descuento:', discount);
        console.log('Descuento porcentaje:', discountPer);
        console.log('Descuento unidad:', discountUni);
        console.log('Imagen:', imagen);

        const productData= {
          id,
          title,
          amount,
          price,
          description,
          favorite,
          discount,
          discountPer,
          discountUni,
          imagen,
        };

        // Ahora, puedes agregar el producto a la base de datos utilizando this.productsModel.addProduct
        this.productsModel.addProduct(productData).then(() => {
            res.status(200).json({ message: 'Producto agregado con éxito' });
          })
          .catch((err: Error) => {
            res.status(500).json({ message: 'Error al agregar el producto', error: err.message });
          });
      } catch (error) {
        // Manejar errores en el procesamiento de los datos del producto
        res.status(400).json({ message: 'Error en el formato de los datos del producto', error});
      }

  };
  //Agregar un producto
  updateProduct = (req: Request, res: Response) => {
    console.log(req.body)
      try {
        const { id, title, amount, price, description, favorite, discount, discountPer, discountUni,imagen } = req.body;

        console.log('ID:', id);
        console.log('Título:', title);
        console.log('Cantidad:', amount);
        console.log('Precio:', price);
        console.log('Descripción:', description);
        console.log('Favorito:', favorite);
        console.log('Descuento:', discount);
        console.log('Descuento porcentaje:', discountPer);
        console.log('Descuento unidad:', discountUni);
        console.log('Imagen:', imagen);

        const productData= {
          id,
          title,
          amount,
          price,
          description,
          favorite,
          discount,
          discountPer,
          discountUni,
          imagen,
        };

        this.productsModel.updateProduct(productData).then(() => {
            res.status(200).json({ message: 'Producto actualizado con éxito' });
          })
          .catch((err: Error) => {
            res.status(500).json({ message: 'Error al actualizar el producto', error: err.message });
          });
      } catch (error) {
        // Manejar errores en el procesamiento de los datos del producto
        res.status(400).json({ message: 'Error en el formato de los datos del producto', error});
      }

  };
 
}