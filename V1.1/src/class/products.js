let arrayProducts = [];

class Products {
    constructor(id, name, price, img, short, status) {
        this.id = id,
        this.name = name;
        this.price = price;
        this.img = img;
        this.short = short;
        this.status = status;
    }

}

let product1 = new Products('1', 'Hamburguesa de queso', '500', '1.jpg', 'HamQue', true);
let product2 = new Products('2', 'Haburguesa Veggie', '600', '2.jpg', 'HamVeg', true);
let product3 = new Products('3', 'Ensalada Veggie', '400', '3.jpg', 'EnsVeg', true);

arrayProducts = [product1, product2, product3];
console.log('Información de productos cargada correctamente.');

module.exports = { arrayProducts };