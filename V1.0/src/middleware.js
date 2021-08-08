// Importacion de clases

const { arrayUsers } = require("./users");
const { arrayProducts } = require("./products");
const { arrayPayments } = require("./payments");

// Declaracion de middlewares

/*************************************USERS********************************/
//Verifica antes de crear un nuevo usuario que el ID no exista 
function userIdExist(req, res, next) {
    user = req.body;
    id = user.id;
    index = arrayUsers.findIndex(elemento => elemento.id == id);
    console.log(req.body,index);
    if (index === -1) {
        req.user = user;
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `El ID ya existe` });
    }
}
exports.userIdExist = userIdExist;

//Verifica antes de crear un nuevo usuario que el email no exista 
function userEmailExist(req, res, next) {
    user = req.user;
    email = user.email;
    index = arrayUsers.findIndex(elemento => elemento.email == email);
    console.log(req.user,index);
    if (index === -1) {
        req.user = user;
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `El email ya se encuentra registrado` });
    }
}
exports.userEmailExist = userEmailExist;

//Verifica que el usuario y la contraseña ingresadas sean correctas 
function userLoginCheck(req, res, next) {
    email = req.body.email;
    password = req.body.password;
    index = arrayUsers.findIndex(elemento => elemento.email == email && elemento.password == password);
    console.log(req.body,index);
    if (index === -1) {
        res.status(404).send({ result: false, msj: `Usuario no logueado o inexistente` });
    } else {
        arrayUsers[index].isLogged = true;
        req.result = true;
        req.userIndex = index;
        req.user = arrayUsers[index];
        next();
    }
}
exports.userLoginCheck = userLoginCheck;

//Verifica que el usuario exista antes de modificarlo/borrarlo
function userCrudCheck(req, res, next) {
    id = req.params.id;
    index = arrayUsers.findIndex(elemento => elemento.id == id);
    user = arrayUsers[index];
    console.log(req.body,index);
    if (index === -1) {
        res.status(404).send({ resultado: false, mensaje: `El usuario no existe` });
    } else {
        req.user = user;
        req.index = index;
        next();
    }
}
exports.userCrudCheck = userCrudCheck;

//Verifica que el usuario haya iniciado la sesion
function loginCheck(req, res, next) {
    idUser = req.params.idUser;
    index = arrayUsers.findIndex(elemento => elemento.id == idUser);
    user = arrayUsers[index];
    if (user.isLogged === true) {
        req.result = true;
        req.user = user;
        next();
    } else {
        res.status(404).send({ result: false, msj: `El usuario no tiene iniciada la sesion` });
    }
}
exports.loginCheck = loginCheck;

//Verifica que el usuario sea Administrador
function userAdminCheck(req, res, next) {
    result = req.result;
    user = req.user;
    if(result == true){
        if (user.isAdmin === true) {
            res.result = true;
            res.user = user;
            next();
        } else {
            res.status(404).send({ resultado: false, mensaje: `El usuario no es Administrador` });
        }
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `El usuario no esta Logeado` });
    }
    
}
exports.userAdminCheck = userAdminCheck;

/*************************************PRODUCTS********************************/
//Verifica antes de crear un nuevo producto que el ID no exista 
function productIdExist(req, res, next) {
    user = req.user;
    product = req.body;
    index = arrayProducts.findIndex(elemento => elemento.id == product.id);
    if (index === -1) {
        req.product = product;
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `El ID de producto ya existe` });
    }
}
exports.productIdExist = productIdExist;

//Verifica que el usuario sea administrador para poder crear productos
function productCrudAdminCheck(req, res, next) {
    user = req.user;
    product = req.product;
    if (index === -1) {
    res.status(404).send({ resultado: false, mensaje: `El usuario no existe` });
    } else {
        req.user = user;
        req.index = index;
        next();
    }
}
exports.productCrudAdminCheck = productCrudAdminCheck;

//Verifica que el producto exista antes de modificarlo/borrarlo
function productCrudCheck(req, res, next) {
    idProduct = req.params.idProduct;
    index = arrayProducts.findIndex(elemento => elemento.id == idProduct);
    product = arrayProducts[index];
    if (index === -1) {
        res.status(404).send({ resultado: false, mensaje: `El producto no existe` });
    } else {
        req.product = product;
        req.index = index;
        next();
    }
}
exports.productCrudCheck = productCrudCheck;

/*************************************PAYMENTS********************************/
//Verifica antes de crear un nuevo pago que el ID no exista 
function paymentIdExist(req, res, next) {
    user = req.user;
    payment = req.body;
    index = arrayPayments.findIndex(elemento => elemento.id == payment.id);
    if (index === -1) {
        req.payment = payment;
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `El ID de pago ya existe` });
    }
}
exports.paymentIdExist = paymentIdExist;

//Verifica que el pago exista antes de modificarlo/borrarlo
function paymentCrudCheck(req, res, next) {
    idPayment = req.params.idPayment;
    index = arrayPayments.findIndex(elemento => elemento.id == idPayment);
    payment = arrayPayments[index];
    if (index === -1) {
        res.status(404).send({ resultado: false, mensaje: `El metodo no existe` });
    } else {
        req.payment = payment;
        req.index = index;
        next();
    }
}
exports.paymentCrudCheck = paymentCrudCheck;