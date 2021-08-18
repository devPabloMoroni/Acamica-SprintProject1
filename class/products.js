let arrayProducts = [];

class Products {
    constructor(id, code, name, price, stock) {
        this.id = id,
        this.code = code,
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.isDeleted = false;
    }

    getStock() {
        return this.stock;
    }
    setStock(stock) {
        this.stock = stock;
    }

    //Verifica que haya stock del producto
    sale() {
        if (this.stock >= 1) {
            this.stock -= 1;
            return true
        } 
        else {
            return false;
        }
    }

}

let product1 = new Products(1, 'HAMQUE', 'Hamburguesa de queso', '500', 1);
let product2 = new Products(2, 'ENSFRU', 'Ensalada de Frutas', '400', 1);
let product3 = new Products(3, 'SANVEG', 'Sandwich Veggie', '500', 1);

arrayProducts = [product1, product2, product3];
console.log('Productos Cargados: ', arrayProducts);

module.exports = { arrayProducts, product1, product2, product3 };