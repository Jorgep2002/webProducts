
import ProductInterface from "../types/ProductInterface"

export default class IndexView {
  index:number;
  amountProducts:number;
  pImg: HTMLImageElement;
   pId: HTMLInputElement;
   pTitulo: HTMLInputElement;
   pDescripcion: HTMLInputElement;
   pPrecio: HTMLInputElement;
   pCantidad: HTMLInputElement;
   pDescuento: HTMLInputElement;
   pPorcentaje: HTMLInputElement;
   pUnidad: HTMLInputElement;
  constructor () {
    this.index = 0;
    this.amountProducts = 0;
    // Form
    this.pImg = document.getElementById('product_img') as HTMLImageElement;
    this.pId = document.getElementById('product_id') as HTMLInputElement;
    this.pTitulo = document.getElementById('product_titulo') as HTMLInputElement;
    this.pDescripcion = document.getElementById('product_descripcion') as HTMLInputElement;
    this.pPrecio = document.getElementById('product_precio') as HTMLInputElement;
    this.pCantidad = document.getElementById('product_cantidad') as HTMLInputElement;
    this.pDescuento = document.getElementById('product_descuento') as HTMLInputElement;
    this.pPorcentaje = document.getElementById('product_porcentaje') as HTMLInputElement;
    this.pUnidad = document.getElementById('product_unidad') as HTMLInputElement;    this.pDescuento.addEventListener('change', this.togglePorcentajeEditable);
    this.addImg();
  }

  
  //Funcion encargada para mostrar productos
  renderProducts = async (productsPromise: Promise<ProductInterface[]>): Promise<void> => {
    try {
      const products = await productsPromise;
      this.amountProducts = products.length;
      
      if (this.index === this.amountProducts) {
        this.index = 0;
      }

      

      if (products[this.index].imagen) {

          // Si hay datos de imagen en base64, muestra la imagen en base64

          this.pImg.src =products[this.index].imagen;

     } else {


        this.pImg.src =  `./img/${products[this.index].id}.jpg`;

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
      } else {
        this.pPorcentaje.disabled = false;
      }
      
      this.pImg.onerror = () => {
        this.pImg.src = `img/not_found.jpg`;
      };
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error en caso de que ocurra al obtener los productos.
    }
  }
  renderProduct = async (singleProduct: Promise<ProductInterface>): Promise<void> => {
    const product = await singleProduct;
    this.pImg.src = `img/${product.id}.jpg`;
    this.pId.value = `${product.id}`;
    this.pTitulo.value = `${product.title}`;
    this.pDescripcion.value = `${product.description}`;
    this.pPrecio.value = `${product.price}`;
    this.pCantidad.value = `${product.amount}`;
    this.pDescuento.value = `${product.discount}`;
    this.pPorcentaje.value = `${product.discountPer}`;
    this.pUnidad.value = `${product.discountUni}`;
  }
  //Siguiente producto, cambiando el indice actual
  nextProduct = (products: Promise<ProductInterface[]>): void =>{
      const nextBtn = document.getElementById('nextButton') as HTMLButtonElement;
      nextBtn.addEventListener('click',():void=>{
        if(this.index === this.amountProducts-1){
          alert("No hay mas registros se volvera al comienzo");
          this.index = 0;
        }else{
          this.index++;
        }
        this.renderProducts(products); 
      });
  }

  
  //Anterior producto cambiando el indice actual
  prevProduct = (products: Promise<ProductInterface[]>): void =>{
    const prevBtn = document.getElementById('prevButton') as HTMLButtonElement;
    prevBtn.addEventListener('click',():void=>{
      if(this.index === 0){
        this.index = this.amountProducts-1;
      }else{
        this.index--;
      }
      this.renderProducts(products);
    });
  }

  formGetProduct = (searchProduct: (id: string) => void): void => {
    const formularioID = document.getElementById('buscarFormID') as HTMLFormElement;
    const productIdInput = document.getElementById("product_id") as HTMLInputElement;
  
    formularioID.addEventListener("submit", function(event) {
      event.preventDefault(); // Evita que el formulario se envíe normalmente
  
      const productIdValue = productIdInput.value;
      console.log("Valor de product_id:", productIdValue);
  
      // Llama a la función searchProduct con el valor del input
      searchProduct(productIdValue);
    });
  };
  
  deleteP(deleteP:(id:string)=>void){
    const formularioDelete = document.getElementById('deleteID') as HTMLFormElement;
    formularioDelete.addEventListener("submit",(event)=>{
      event.preventDefault(); 
      const productIdInput = document.getElementById("product_id") as HTMLInputElement;

      
        deleteP(productIdInput.value);
      
      
    });
  }

  editP(editP:(product:ProductInterface)=>void){

    const btnEdit = document.getElementById("btnEdit") as HTMLButtonElement;
    btnEdit.addEventListener("click",()=>{
      this.quitarReadOnly()  
    
      const btnUpt = document.getElementById("uptButton") as HTMLButtonElement;
      btnUpt.classList.remove("noShow")
      btnUpt.addEventListener("click", () => {
      const title = this.pTitulo.value;
      const amount = this.pCantidad.value;
      const price = parseFloat(this.pPrecio.value);
      const description = this.pDescripcion.value;
      const favorite = false;
      const discount = this.pDescuento.value;
      const discountPer = parseFloat(this.pPorcentaje.value);
      const discountUni = this.pUnidad.value;
      const id = parseInt(this.pId.value);
      const imagen = document.getElementById('product_imagen') as HTMLInputElement;
      const imageFile = imagen.files ? imagen.files[0] : null;
      let imageBase64 = ''; 
      if (
        id ==null ||
        title === "" ||
        amount === "" ||
        price ==null ||
        description === "" ||
        discount === "" ||
        discountPer == null||
        discountUni === ""
      ) {
        alert("Por favor, complete todos los campos correctamente.");
        return; 
      }  
      if (imageFile) {
   
        const reader = new FileReader();
        reader.onload = function () {
          imageBase64 = reader.result as string;
          console.log(imageBase64); 
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
            imagen: imageBase64, 
          };

          editP(product);
          btnUpt.classList.add("noShow")

        };
        reader.readAsDataURL(imageFile);
      } else {
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
   
        editP(product);
        alert("Producto Actualizado")
      }
    });
    });
  }

  

  addImg = ():void=>{
  
    let pImagen = document.getElementById("product_imagen") as HTMLInputElement;
    pImagen.onchange=function(e:any){
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=function(){
        let imgTag = document.getElementById("product_img") as HTMLImageElement;
        console.log(reader.result)
        if (typeof reader.result === 'string') {
          imgTag.src = reader.result;
        }
      }
    }
  }

  addP = (addP: (product: ProductInterface) => void): void => {
    const btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
    btnAdd.addEventListener("click", () => {
      this.quitarReadOnly()
      this.pImg.src = "img/not_found.png";
      this.pId.value = ``;
      this.pTitulo.value = ``;
      this.pDescripcion.value = ``;
      this.pPrecio.value = ``;
      this.pCantidad.value = ``;
      this.pDescuento.value = `true`;
      this.pPorcentaje.value = ``;
      this.pUnidad.value = ``;
      const btnSave = document.getElementById("saveButton") as HTMLButtonElement;
      btnSave.classList.remove("noShow")
      btnSave.addEventListener("click", () => {
        const title = this.pTitulo.value;
        const amount = this.pCantidad.value;
        const price = parseFloat(this.pPrecio.value);
        const description = this.pDescripcion.value;
        const favorite = false;
        const discount = this.pDescuento.value;
        const discountPer = parseFloat(this.pPorcentaje.value);
        const discountUni = this.pUnidad.value;
        const id = parseInt(this.pId.value);
        if (
          id ==null ||
          title === "" ||
          amount === "" ||
          price ==null ||
          description === "" ||
          discount === "" ||
          discountPer == null||
          discountUni === ""
        ) {
          alert("Por favor, complete todos los campos correctamente.");
          return; 
        }  
        const imagen = document.getElementById('product_imagen') as HTMLInputElement;
        const imageFile = imagen.files ? imagen.files[0] : null;
        let imageBase64 = ''; 
        if (imageFile) {
          const reader = new FileReader();
          reader.onload = function () {
            imageBase64 = reader.result as string;
            console.log(imageBase64);
             
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
            alert("Producto guardado")
            btnSave.classList.add("noShow")
          };
          reader.readAsDataURL(imageFile);
        } else {
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
          addP(product);
          alert("Producto guardado")
          btnSave.classList.add("noShow")
        }
      });
    });
  }
  
  togglePorcentajeEditable = (): void => {
      const descuentoValue = this.pDescuento.value;
      const porcentajeField = this.pPorcentaje;
    
      porcentajeField.disabled = descuentoValue !== "true";
    }
  
     quitarReadOnly = () => {
      this.pImg.removeAttribute('readonly');
      this.pId.removeAttribute('readonly');
      this.pTitulo.removeAttribute('readonly');
      this.pDescripcion.removeAttribute('readonly');
      this.pPrecio.removeAttribute('readonly');
      this.pCantidad.removeAttribute('readonly');
      this.pDescuento.removeAttribute('readonly');
      this.pPorcentaje.removeAttribute('readonly');
      this.pUnidad.removeAttribute('readonly');
    };
     

  
  }
  



