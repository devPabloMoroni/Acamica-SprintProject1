let arrayPayments = [];

class Payments {
    constructor(id, code, name) {
        this.id = id,
        this.code = code;
        this.name = name;
        this.isDeleted = false;
    }

    setCode(code) {
        this.code = code;
    }
    setName(name) {
        this.name = name;
    }
    setIsDeleted() {
        this.isDeleted = true;
    }
}

let payment1 = new Payments('1', 'TC', 'Credito');
let payment2 = new Payments('2', 'TD', 'Debito');
let payment3 = new Payments('3', 'TF', 'Transferencia');


arrayPayments = [payment1, payment2, payment3];
console.log('Pagos Cargados: ', arrayPayments);

module.exports = { arrayPayments, Payments };