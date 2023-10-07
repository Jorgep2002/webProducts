import ProductInterface from '../types/ProductInterface.js'

export default class IndexModel {
 

  constructor() {
    console.log('IndexModel constructor');

  }

  getProducts = async (): Promise<ProductInterface[]> => {
    try {
      const response = await fetch('http://localhost:1802/products');
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      console.log('Datos obtenidos:', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  searchProduct = async (id:string): Promise<ProductInterface> => {
    try {
      const response = await fetch(`http://localhost:1802/product/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      console.log('Datos obtenidos:', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  deleteP = async (id: string): Promise<ProductInterface[]> => {
    try {
      const response = await fetch(`http://localhost:1802/product/${id}`, {
        method: 'DELETE', 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message); 
      }
      
      const dat = await response.json();
      alert(dat.message);
      return this.getProducts();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
 

  
  editP = async (product: ProductInterface): Promise<ProductInterface[]> => {
    try {
      const apiUrl = 'http://localhost:1802/updateProduct/';
    
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Establece el tipo de contenido a JSON
        },
        body: JSON.stringify(product), // Convierte el objeto product a JSON
      };
    
      // Realiza la solicitud PUU
      const response = await fetch(apiUrl, requestOptions);
    
      if (!response.ok) {
        throw new Error('La solicitud no se pudo completar');
      }
    
      const responseData = await response.json(); 
    
      console.log('Respuesta del servidor:', responseData);
    
      return this.getProducts();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  addP = async (product: ProductInterface): Promise<ProductInterface[]> => {
    try {
      const apiUrl = 'http://localhost:1802/newProduct/';
    
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Establece el tipo de contenido a JSON
        },
        body: JSON.stringify(product), // Convierte el objeto product a JSON
      };
    
      // Realiza la solicitud POST
      const response = await fetch(apiUrl, requestOptions);
    
      if (!response.ok) {
        throw new Error('La solicitud no se pudo completar');
      }
    
      const responseData = await response.json(); 
    
      console.log('Respuesta del servidor:', responseData);
    
      return this.getProducts();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
}
