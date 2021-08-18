let arrayUsers = [];

class User {
    constructor(id, name, surname, email, password, phone, address, isAdmin) {
        this.id = id,
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.isAdmin = isAdmin === undefined ? false : true;
        this.isLogged = false;
        this.isDeleted = false;
    }
}

//Carga de Usuarios
let admin = new User('1', 'admin', null, 'admin@admin', 'admin', null, null, true);
let user1 = new User('2', 'Pablo', 'Moroni', 'pablo@pablo', '1234', '15555555', 'Prefectura');
let user2 = new User('3', 'Osvaldo', 'Catalan', 'osva@osva', '1234', '15666666', 'San Martin');

arrayUsers = [admin, user1, user2];
console.log('Usuarios Cargados: ', arrayUsers);

module.exports = { arrayUsers, User };