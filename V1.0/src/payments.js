let arrayPayments = [];

class Payments {
    constructor(id, type, status) {
        this.id = id,
        this.type = type;
        this.status = status;
    }

}

let payment1 = new Payments('1', 'VISA Credito', true);
let payment2 = new Payments('2', 'Mercado Pago', true);
let payment3 = new Payments('3', 'Transferencia', true);

arrayPayments = [payment1, payment2, payment3];
console.log('Información cargada correctamente.');

module.exports = { arrayPayments };