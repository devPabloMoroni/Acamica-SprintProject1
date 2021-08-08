let arrayOrders = [];

class Orders {
    constructor(id, status, time, number, description, price, payMethod, userId, address, products) {
        this.id = id,
        this.status = status;
        this.time = time;
        this.number = number;
        this.description = description;
        this.price = price;
        this.payMethod = payMethod;
        this.userId = userId;
        this.address = address;
        this.products = products;
    }

}

let order = new Orders('1', 'Pendiente', '12:01AM', '1', '1xHamQue 2xHamVeg', 1300, 'VISA Credito', 
                        '2', 'Prefectura', [{'id': 1, 'qty':1}, {'id':2, 'qty':2}]);
                        
let order1 = new Orders('2', 'Confirmado', '11:15AM', '2', '1xEnsVeg 2xHamVeg', 1200, 'Transferencia', 
                        '3', 'San Martin', [{'id': 3, 'qty':1}, {'id':2, 'qty':2}]);

arrayOrders = [order, order1];
console.log('Información de pedidos cargada correctamente.');

module.exports = { arrayOrders };