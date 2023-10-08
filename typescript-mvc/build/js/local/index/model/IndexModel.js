var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class IndexModel {
    constructor() {
        this.getProducts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:1802/products');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = yield response.json();
                console.log('Datos obtenidos:', data);
                return data;
            }
            catch (error) {
                console.error('Error:', error);
                throw error;
            }
        });
        this.searchProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:1802/product/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = yield response.json();
                console.log('Datos obtenidos:', data);
                return data;
            }
            catch (error) {
                console.error('Error:', error);
                throw error;
            }
        });
        this.deleteP = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:1802/product/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const errorData = yield response.json();
                    throw new Error(errorData.message);
                }
                const dat = yield response.json();
                alert(dat.message);
                return this.getProducts();
            }
            catch (error) {
                console.error('Error:', error);
                throw error;
            }
        });
        this.editP = (product) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = 'http://localhost:1802/updateProduct/';
                const requestOptions = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                };
                const response = yield fetch(apiUrl, requestOptions);
                if (!response.ok) {
                    throw new Error('La solicitud no se pudo completar');
                }
                const responseData = yield response.json();
                console.log('Respuesta del servidor:', responseData);
                return this.getProducts();
            }
            catch (error) {
                console.error('Error:', error);
                throw error;
            }
        });
        this.addP = (product) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = 'http://localhost:1802/newProduct/';
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                };
                const response = yield fetch(apiUrl, requestOptions);
                if (!response.ok) {
                    throw new Error('La solicitud no se pudo completar');
                }
                const responseData = yield response.json();
                console.log('Respuesta del servidor:', responseData);
                return this.getProducts();
            }
            catch (error) {
                console.error('Error:', error);
                throw error;
            }
        });
        console.log('IndexModel constructor');
    }
}
