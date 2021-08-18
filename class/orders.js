let arrayUsers = require('./users');
let { arrayProducts, product1, product2, product3 } = require('./products');
console.log(arrayProducts);

let idOrder = 0;
let arrayOrders = [];
let orderStatus = ['PEND', 'CONF', 'PREP', 'ENVI', 'ENTR', ]

addOrder = (order) => {
    idOrder += 1;
    order.setOrderNumber(idOrder);
    arrayOrders.push(order);
}

class Order {
    constructor(id, user, payment, address) {
        this.id = id,
        this.user = user;
        this.payment = payment;
        this.address = address;
        this.datetime = new Date();
        this.status = 'PEND';
        this.totAmount = 0;
        this.products = [];
    }

    setOrderNumber(id) {
        this.id = id;
    };

    addProduct(product) {
        this.totAmount += parseFloat(product.price);
        this.products.push(product);
    }

    setStatus(status) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    setAddress(address) {
        this.address = address;
    }

    getPayment(){
        return this.payment;
     }
 
     setPayment(payment) {
         this.payment = payment;
     }
}

let order1 = new Order(1, 'pablo@pablo', 'TD', 'San martin 257');
order1.addProduct(product1);
order1.addProduct(product2);
addOrder(order1);

let order2 = new Order(2, 'osva@osva', 'TF', '25 de mayo 1636');
order2.addProduct(product3);
order2.addProduct(product3);
addOrder(order2);

console.log('Pedidos Cargados:', arrayOrders);

module.exports = { arrayOrders, orderStatus, Order };