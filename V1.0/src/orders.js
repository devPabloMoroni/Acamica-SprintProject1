let arrayOrders = [];

class Orders {
    constructor(id, status, time, number, description, price, payMethod, user, address, products) {
        this.id = id,
        this.status = status;
        this.time = time;
        this.number = number;
        this.description = description;
        this.price = price;
        this.payMethod = payMethod;
        this.user = user;
        this.address = address;
        this.products = products;
    }
}

let order = new Orders('1', 'Pendiente', '12:01AM', '1', '1xHamQue 2xHamVeg', 1300, 'VISA Credito', 
                        'Pablo Moroni', 'Prefectura', [{'id': 1, 'qty':1}, {'id':2, 'qty':2}]);
                        
let order1 = new Orders('1', 'Confirmado', '11:15AM', '2', '1xEnsFru 2xHamVeg', 
                        'Transferencia', 'Juan Lopez', 'San Martin');

arrayOrders = [order, order1];
console.log('Información cargada correctamente.');

module.exports = { arrayOrders };