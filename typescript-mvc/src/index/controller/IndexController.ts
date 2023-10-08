import IndexModel from '../model/IndexModel.js'
import ProductInterface from '../types/ProductInterface.js';
import IndexView from '../view/IndexView.js'

export default class IndexController {
  constructor (private readonly model: IndexModel, private readonly view: IndexView) {
    console.log('IndexController constructor')
    this.view.nextProduct(this.model.getProducts());
    this.view.prevProduct(this.model.getProducts());
    this.view.formGetProduct(this.searchProduct);
    this.view.deleteP(this.deleteP);
    
    this.view.addP(this.addP);
    this.view.editP(this.editP);

  }

  init = (): void => {
    this.view.renderProducts(this.model.getProducts())
  }

  searchProduct = (id:string):void =>{
    this.view.renderProduct(this.model.searchProduct(id))
  }

  deleteP=(idProduct:string):void=>{
    this.view.renderProducts(this.model.deleteP(idProduct));
  }

  editP=(product:ProductInterface):void=>{
    this.view.renderProducts(this.model.editP(product));
  }

  addP =(product:ProductInterface):void=>{
    this.view.renderProducts(this.model.addP(product))
  }
}
