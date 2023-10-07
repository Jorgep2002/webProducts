export default class IndexController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init = () => {
            this.view.renderProducts(this.model.getProducts());
        };
        this.searchProduct = (id) => {
            this.view.renderProduct(this.model.searchProduct(id));
        };
        this.deleteP = (idProduct) => {
            this.view.renderProducts(this.model.deleteP(idProduct));
        };
        this.editP = (product) => {
            this.view.renderProducts(this.model.editP(product));
        };
        this.addP = (product) => {
            this.view.renderProducts(this.model.addP(product));
        };
        console.log('IndexController constructor');
        this.view.nextProduct(this.model.getProducts());
        this.view.prevProduct(this.model.getProducts());
        this.view.formGetProduct(this.searchProduct);
        this.view.deleteP(this.deleteP);
        this.view.addP(this.addP);
        this.view.editP(this.editP);
    }
}
