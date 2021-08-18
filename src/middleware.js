// Importacion de clases
const { arrayUsers } = require("../class/users");
const { arrayProducts } = require("../class/products");
const { arrayPayments } = require("../class/payments");
const { arrayOrders } = require("../class/orders");

// Declaracion de middlewares

/*************************************USERS********************************/
//Verifica antes de crear un nuevo usuario que el ID no exista 
function userIdExist(req, res, next) {
    user = req.body;
    console.log(user);
    id = user.id;
    index = arrayUsers.findIndex(elemento => elemento.id == id);
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
    if (index === -1) {
        req.user = user;
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `El email ya se encuentra registrado` });
    }
}
exports.userEmailExist = userEmailExist;

//Verifica que el usuario y la contraseña ingresadas sean correctas 
function userPassCheck(req, res, next) {
    email = req.body.email;
    password = req.body.password;
    index = arrayUsers.findIndex(elemento => elemento.email == email && elemento.password == password);
    if (index === -1) {
        res.status(404).send({ result: false, msj: `Usuario no logueado o inexistente` });
    } else {
        if(arrayUsers[index].isDeleted === true){
            res.status(404).send({ result: false, msj: `Su usuario se encuentra desabilitado o fue borrado` });
        }
        else{
            arrayUsers[index].isLogged = true;
            req.result = true;
            req.userIndex = index;
            //req.user = arrayUsers[index];
            next();
        }
    }
}
exports.userPassCheck = userPassCheck;

//Verifica que el usuario sea administrador
function adminCheck(req, res, next) {
    userIndex = req.userIndex;
    if (arrayUsers[userIndex].isAdmin === true) {
        req.result = true;
        req.userIndex = userIndex;
        next();
    } else {
        res.status(404).send({ result: false, msj: `El usuario no es administrador` });
    }
}
exports.adminCheck = adminCheck;

//Verifica que el usuario haya iniciado la sesion
function loginCheck(req, res, next) {
    userIndex = req.query.userIndex;
    if (arrayUsers[userIndex].isLogged === true) {
        req.result = true;
        req.userIndex = userIndex;
        next();
    } else {
        res.status(404).send({ result: false, msj: `El usuario no tiene iniciada la sesion` });
    }
}
exports.loginCheck = loginCheck;

//Desabilita un usuario
function DisableUser(req, res, next) {
    userIndex = req.params.index;
    user = arrayUsers[userIndex];
    user.isDeleted = true;
    req.user = user;
    req.userIndex = userIndex;
    next();
}
exports.DisableUser = DisableUser;

/*************************************PRODUCTS********************************/
//Verifica los productos desabilitados y si es un usuario comun no los muestra
function productDisableCheck(req, res, next) {
    userIndex = req.query.userIndex;
    if(arrayUsers[userIndex].isAdmin === true){
        req.result = true;
        req.flag = true;
        next();
    }
    else{
        newProductsArray = [];
        for ( let product of arrayProducts){
            if(product.isDeleted === false){
                newProductsArray.push(product);
            }
        }
        req.result = true;
        req.newProductsArray = newProductsArray ;
        req.flag = false;
        next();
    }
}
exports.productDisableCheck = productDisableCheck;

//Verifica antes de crear un nuevo producto que el ID no exista 
function productIdExist(req, res, next) {
    product = req.body;
    index = arrayProducts.findIndex(elemento => elemento.id == product.id);
    if (index === -1) {
        req.product = product;
        req.result = true;
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `El ID de producto ya existe` });
    }
}
exports.productIdExist = productIdExist;

//Verifica que exista el indice antes de modificarlo/borrarlo
function productIndexExist(req, res, next) {
    productIndex = req.params.productIndex;
    if (arrayProducts[productIndex] == null) {
        res.status(404).send({ resultado: false, mensaje: `El producto no existe` });
    } 
    else {
        product = arrayProducts[productIndex];
        req.product = product;
        req.productIndex = productIndex;
        next();
    }
}
exports.productIndexExist = productIndexExist;

//Desabilita un producto
function DisableProduct(req, res, next) {
    productIndex = req.params.productIndex;
    product = arrayProducts[productIndex];
    product.isDeleted = true;
    req.product = product;
    req.productIndex = productIndex;
    next();
}
exports.DisableProduct = DisableProduct;

/*************************************PAYMENTS********************************/


/*************************************ORDERS********************************/
//Verifica quien es el usuario logeado y devuelve solo el historial de ese pedido o si es admin devuelve todo
function orderUserCheck(req, res, next) {
    userIndex = req.userIndex;
    if(arrayUsers[userIndex].isAdmin === true){
        req.result = true;
        req.flag = true;
        next();
    }
    else{
        userEmail = arrayUsers[userIndex].email;
        newOrdersArray = [];
        for ( let order of arrayOrders){
            if(order.user === userEmail){
                newOrdersArray.push(order);
            }
        }
        req.result = true;
        req.newOrdersArray = newOrdersArray ;
        req.flag = false;
        next();
    }
}
exports.orderUserCheck = orderUserCheck;