var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class IndexView {
    constructor() {
        //Funcion encargada para mostrar productos
        this.renderProducts = (productsPromise) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productsPromise;
                this.amountProducts = products.length;
                if (this.index === this.amountProducts) {
                    this.index = 0;
                }
                if (products[this.index].imagen) {
                    // Si hay datos de imagen en base64, muestra la imagen en base64
                    this.pImg.src = products[this.index].imagen;
                }
                else {
                    this.pImg.src = `./img/${products[this.index].id}.jpg`;
                }
                this.pId.value = `${products[this.index].id}`;
                this.pTitulo.value = `${products[this.index].title}`;
                this.pDescripcion.value = `${products[this.index].description}`;
                this.pPrecio.value = `${products[this.index].price}`;
                this.pCantidad.value = `${products[this.index].amount}`;
                this.pDescuento.value = `${products[this.index].discount}`;
                this.pPorcentaje.value = `${products[this.index].discountPer}`;
                this.pUnidad.value = `${products[this.index].discountUni}`;
                if (this.pDescuento.value === "false") {
                    this.pPorcentaje.disabled = true;
                }
                else {
                    this.pPorcentaje.disabled = false;
                }
                this.pImg.onerror = () => {
                    this.pImg.src = `img/not_found.jpg`;
                };
            }
            catch (error) {
                console.error('Error:', error);
                // Manejar el error en caso de que ocurra al obtener los productos.
            }
        });
        this.renderProduct = (singleProduct) => __awaiter(this, void 0, void 0, function* () {
            const product = yield singleProduct;
            this.pImg.src = `img/${product.id}.jpg`;
            this.pId.value = `${product.id}`;
            this.pTitulo.value = `${product.title}`;
            this.pDescripcion.value = `${product.description}`;
            this.pPrecio.value = `${product.price}`;
            this.pCantidad.value = `${product.amount}`;
            this.pDescuento.value = `${product.discount}`;
            this.pPorcentaje.value = `${product.discountPer}`;
            this.pUnidad.value = `${product.discountUni}`;
        });
        //Siguiente producto, cambiando el indice actual
        this.nextProduct = (products) => {
            const nextBtn = document.getElementById('nextButton');
            nextBtn.addEventListener('click', () => {
                if (this.index === this.amountProducts - 1) {
                    alert("No hay mas registros se volvera al comienzo");
                    this.index = 0;
                }
                else {
                    this.index++;
                }
                this.renderProducts(products);
            });
        };
        //Anterior producto cambiando el indice actual
        this.prevProduct = (products) => {
            const prevBtn = document.getElementById('prevButton');
            prevBtn.addEventListener('click', () => {
                if (this.index === 0) {
                    this.index = this.amountProducts - 1;
                }
                else {
                    this.index--;
                }
                this.renderProducts(products);
            });
        };
        this.formGetProduct = (searchProduct) => {
            const formularioID = document.getElementById('buscarFormID');
            const productIdInput = document.getElementById("product_id");
            formularioID.addEventListener("submit", function (event) {
                event.preventDefault(); // Evita que el formulario se envíe normalmente
                const productIdValue = productIdInput.value;
                console.log("Valor de product_id:", productIdValue);
                // Llama a la función searchProduct con el valor del input
                searchProduct(productIdValue);
            });
        };
        this.addImg = () => {
            let pImagen = document.getElementById("product_imagen");
            pImagen.onchange = function (e) {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = function () {
                    let imgTag = document.getElementById("product_img");
                    console.log(reader.result);
                    if (typeof reader.result === 'string') {
                        imgTag.src = reader.result;
                    }
                };
            };
        };
        this.addP = (addP) => {
            const btnAdd = document.getElementById("btnAdd");
            btnAdd.addEventListener("click", () => {
                this.pImg.src = "img/not_found.png";
                this.pId.value = ``;
                this.pTitulo.value = ``;
                this.pDescripcion.value = ``;
                this.pPrecio.value = ``;
                this.pCantidad.value = ``;
                this.pDescuento.value = ``;
                this.pPorcentaje.value = ``;
                this.pUnidad.value = ``;
                const btnSave = document.getElementById("saveButton");
                btnSave.classList.remove("noShow");
                btnSave.addEventListener("click", () => {
                    const title = this.pTitulo.value;
                    const amount = this.pCantidad.value;
                    const price = parseFloat(this.pPrecio.value);
                    const description = this.pDescripcion.value;
                    const favorite = false;
                    const discount = this.pDescuento.checked;
                    const discountPer = parseFloat(this.pPorcentaje.value);
                    const discountUni = this.pUnidad.value;
                    const id = parseInt(this.pId.value);
                    const imagen = document.getElementById('product_imagen');
                    const imageFile = imagen.files ? imagen.files[0] : null;
                    let imageBase64 = ''; // Inicializamos imageBase64 como una cadena vacía
                    if (imageFile) {
                        // Verificamos si se seleccionó un archivo de imagen
                        // Convierte el archivo de imagen a base64
                        const reader = new FileReader();
                        reader.onload = function () {
                            imageBase64 = reader.result;
                            console.log(imageBase64); // Muestra la cadena base64 en la consola
                            const product = {
                                id,
                                title,
                                amount,
                                price,
                                description,
                                favorite,
                                discount,
                                discountPer,
                                discountUni,
                                imagen: imageBase64, // Asignamos imageBase64 al campo imagen del producto
                            };
                            addP(product);
                            alert("Producto guardado");
                            btnSave.classList.add("noShow");
                        };
                        reader.readAsDataURL(imageFile);
                    }
                    else {
                        console.log("NO HAY IMAGEN");
                        const product = {
                            id,
                            title,
                            amount,
                            price,
                            description,
                            favorite,
                            discount,
                            discountPer,
                            discountUni,
                            imagen: '',
                        };
                        console.log(product + "producto");
                        //Envía el objeto al modelo para que se encargue de agregarlo a la estructura
                        addP(product);
                        alert("Producto guardado");
                        btnSave.classList.add("noShow");
                    }
                });
            });
        };
        this.togglePorcentajeEditable = () => {
            const descuentoValue = this.pDescuento.value;
            const porcentajeField = this.pPorcentaje;
            porcentajeField.disabled = descuentoValue !== "true";
        };
        this.index = 0;
        this.amountProducts = 0;
        // Form
        this.pImg = document.getElementById('product_img');
        this.pId = document.getElementById('product_id');
        this.pTitulo = document.getElementById('product_titulo');
        this.pDescripcion = document.getElementById('product_descripcion');
        this.pPrecio = document.getElementById('product_precio');
        this.pCantidad = document.getElementById('product_cantidad');
        this.pDescuento = document.getElementById('product_descuento');
        this.pPorcentaje = document.getElementById('product_porcentaje');
        this.pUnidad = document.getElementById('product_unidad');
        this.pDescuento.addEventListener('change', this.togglePorcentajeEditable);
        this.addImg();
    }
    deleteP(deleteP) {
        const formularioDelete = document.getElementById('deleteID');
        formularioDelete.addEventListener("submit", (event) => {
            event.preventDefault();
            const productIdInput = document.getElementById("product_id");
            deleteP(productIdInput.value);
        });
    }
    editP(editP) {
        const btnEdit = document.getElementById("btnEdit");
        btnEdit.addEventListener("click", () => {
            const title = this.pTitulo.value;
            const amount = this.pCantidad.value;
            const price = parseFloat(this.pPrecio.value);
            const description = this.pDescripcion.value;
            const favorite = false;
            const discount = this.pDescuento.checked;
            const discountPer = parseFloat(this.pPorcentaje.value);
            const discountUni = this.pUnidad.value;
            const id = parseInt(this.pId.value);
            const imagen = document.getElementById('product_imagen');
            const imageFile = imagen.files ? imagen.files[0] : null;
            let imageBase64 = ''; // Inicializamos imageBase64 como una cadena vacía
            if (imageFile) {
                // Verificamos si se seleccionó un archivo de imagen
                // Convierte el archivo de imagen a base64
                const reader = new FileReader();
                reader.onload = function () {
                    imageBase64 = reader.result;
                    console.log(imageBase64); // Muestra la cadena base64 en la consola
                    const product = {
                        id,
                        title,
                        amount,
                        price,
                        description,
                        favorite,
                        discount,
                        discountPer,
                        discountUni,
                        imagen: imageBase64, // Asignamos imageBase64 al campo imagen del producto
                    };
                    editP(product);
                };
                reader.readAsDataURL(imageFile);
            }
            else {
                console.log("NO HAY IMAGEN");
                const product = {
                    id,
                    title,
                    amount,
                    price,
                    description,
                    favorite,
                    discount,
                    discountPer,
                    discountUni,
                    imagen: '',
                };
                console.log(product + "producto");
                //Envía el objeto al modelo para que se encargue de agregarlo a la estructura
                editP(product);
                alert("Producto guardado");
            }
        });
    }
}
