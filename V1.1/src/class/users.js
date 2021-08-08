let arrayUsers = [];

class Users {
    constructor(id, name, surname, email, password, phone, address, isAdmin, isLogged, status) {
        this.id = id,
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.isAdmin = isAdmin;
        this.isLogged = isLogged;
        this.status = status;
    }

}

let admin = new Users('1', 'admin', null, 'admin@admin', 'admin', null, null, true, false, true);
let user1 = new Users('2', 'Pablo', 'Moroni', 'pablo@pablo', '1234', '15555555', 'Prefectura', false, false, true);
let user2 = new Users('3', 'Juan', 'Lopez', 'juan@juan', '1234', '15666666', 'San Martin', false, false, true);

arrayUsers = [admin, user1, user2];
console.log('Información de usuarios cargada correctamente.');

module.exports = { arrayUsers };