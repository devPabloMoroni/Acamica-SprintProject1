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

//Verifica que el usuario exista antes de modificarlo/borrarlo
function userExist(req, res, next) {
    userIndex = req.params.userIndex;
    if(arrayUsers[userIndex]){
        req.user = arrayUsers[userIndex];
        req.userIndex = userIndex;
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `El usuario no existe` });
    }
}
exports.userExist = userExist;

//Desabilita un usuario
function DisableUser(req, res, next) {
    userIndex = req.params.userIndex;
    user = arrayUsers[userIndex];
    user.status = false;
    req.user = user;
    req.userIndex = userIndex;
    next();
}
exports.DisableUser = DisableUser;

//Verifica que el usuario no haya sido borrado
function userStatusCheck(req, res, next) {
    id = req.params.id;
    index = arrayUsers.findIndex(elemento => elemento.id == id);
    user = arrayUsers[index];
    if(user.status === true){
        req.user = user;
        req.index = index;
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `El usuario no esta habilitado para usar la app` });
    }
}
exports.userStatusCheck = userStatusCheck;

//Verifica que el usuario y la contraseña ingresadas sean correctas 
function userPassCheck(req, res, next) {
    email = req.body.email;
    password = req.body.password;
    index = arrayUsers.findIndex(elemento => elemento.email == email && elemento.password == password);
    if (index === -1) {
        res.status(404).send({ result: false, msj: `Usuario no logueado o inexistente` });
    } else {
        if(arrayUsers[index].status === false){
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
    userIndex = req.params.userIndex;
    if (arrayUsers[userIndex].isAdmin === true) {
        req.result = true;
        next();
    } else {
        res.status(404).send({ result: false, msj: `El usuario no es administrador` });
    }
}
exports.adminCheck = adminCheck;

//Verifica que el usuario haya iniciado la sesion
function loginCheck(req, res, next) {
    userIndex = req.params.userIndex;
    if (arrayUsers[userIndex].isLogged === true) {
        req.result = true;
        req.userIndex = userIndex;
        next();
    } else {
        res.status(404).send({ result: false, msj: `El usuario no tiene iniciada la sesion` });
    }
}
exports.loginCheck = loginCheck;

/*************************************PRODUCTS********************************/
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
    product.status = false;
    req.product = product;
    req.productIndex = productIndex;
    next();
}
exports.DisableProduct = DisableProduct;

//Verifica los productos desabilitados y si es un usuario comun no los muestra
function productDisableCheck(req, res, next) {
    userIndex = req.userIndex;
    if(arrayUsers[userIndex].isAdmin === true){
        req.result = true;
        req.flag = true;
        next();
    }
    else{
        newProductsArray = [];
        for ( let product of arrayProducts){
            if(product.status === true){
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

/*************************************PAYMENTS********************************/
//Verifica antes de crear un nuevo pago que el ID no exista 
function paymentIdExist(req, res, next) {
    payment = req.body;
    index = arrayPayments.findIndex(elemento => elemento.id == payment.id);
    if (index === -1) {
        req.payment = payment;
        req.result = true;
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `El ID de pago ya existe` });
    }
}
exports.paymentIdExist = paymentIdExist;

//Verifica que exista el indice antes de modificarlo/borrarlo
function paymentIndexExist(req, res, next) {
    paymentIndex = req.params.paymentIndex;
    if (arrayPayments[paymentIndex] == null) {
        res.status(404).send({ resultado: false, mensaje: `El metodo de pago no existe` });
    } 
    else {
        payment = arrayPayments[paymentIndex];
        req.payment = payment;
        req.paymentIndex = paymentIndex;
        next();
    }
}
exports.paymentIndexExist = paymentIndexExist;

//Desabilita un metodo de pago
function DisablePayment(req, res, next) {
    paymentIndex = req.params.paymentIndex;
    payment = arrayPayments[paymentIndex];
    payment.status = false;
    req.payment = payment;
    req.paymentIndex = paymentIndex;
    next();
}
exports.DisablePayment = DisablePayment;

//Verifica los metodos de pago desabilitados y si es un usuario comun no los muestra
function paymentDisableCheck(req, res, next) {
    userIndex = req.userIndex;
    if(arrayUsers[userIndex].isAdmin === true){
        req.result = true;
        req.flag = true;
        next();
    }
    else{
        newPaymentsArray = [];
        for ( let payment of arrayPayments){
            if(payment.status === true){
                newPaymentsArray.push(payment);
            }
        }
        req.result = true;
        req.newPaymentsArray = newPaymentsArray ;
        req.flag = false;
        next();
    }
}
exports.paymentDisableCheck = paymentDisableCheck;

/*************************************ORDERS********************************/
//Verifica quien es el usuario que esta solicitando ver el listado de pedidos,
//si es admin, ve todos, sino cada usuario ve unicamente sus pedidos
function ordersUserCheck(req, res, next) {
    userIndex = req.userIndex;
    if(arrayUsers[userIndex].isAdmin === true){
        req.result = true;
        req.flag = true;
        next();
    }
    else{
        idUser = arrayUsers[userIndex].id;
        newOrdersArray = [];
        for ( let order of arrayOrders){
            if(order.userId === idUser){
                newOrdersArray.push(order);
            }
        }
        req.result = true;
        req.newOrdersArray = newOrdersArray ;
        req.flag = false;
        next();
    }
}
exports.ordersUserCheck = ordersUserCheck;

//Verifica antes de crear un nuevo pedido que el ID no exista 
function orderIdExist(req, res, next) {
    order = req.body;
    index = arrayOrders.findIndex(elemento => elemento.id == order.id);
    if (index === -1) {
        req.order = order;
        req.result = true;
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `El ID de la orden ya existe` });
    }
}
exports.orderIdExist = orderIdExist;

//Verifica que exista el indice de pedido antes de modificarlo/borrarlo
function orderIndexExist(req, res, next) {
    orderIndex = req.params.orderIndex;
    userIndex = req.params.userIndex;
    if (arrayOrders[orderIndex] == null) {
        res.status(404).send({ resultado: false, mensaje: `El pedido no existe` });
    } 
    else {
        order = arrayOrders[orderIndex];
        req.order = order;
        req.orderIndex = orderIndex;
        req.userIndex = userIndex;
        next();
    }
}
exports.orderIndexExist = orderIndexExist;

//Verifica que la orden que se quiere modificar correponde al usuario logeado
function orderUserCheck(req, res, next) {
    orderIndex = req.orderIndex;
    userIndex = req.userIndex;
    idUser = arrayUsers[userIndex].id;
    if(arrayOrders[orderIndex].userId == idUser){
        req.orderIndex = orderIndex;
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `El pedido no corresponde al usuario` });
    }
}
exports.orderUserCheck = orderUserCheck;

//Verifica que el pedido no se encuentre cerrado
function orderStatusCheck(req, res, next){
    orderIndex = req.orderIndex;
    if(arrayOrders[orderIndex].status == 'Confirmado' ||
        arrayOrders[orderIndex].status == 'En preparacion' ||
        arrayOrders[orderIndex].status == 'Enviado' ||
        arrayOrders[orderIndex].status == 'Entregado')
    {
        res.status(404).send({ resultado: false, mensaje: `El pedido no se puede modificar ya que se encuentra cerrado` });
    }
    else{
        req.orderIndex = orderIndex;
        next();
    }
}
exports.orderStatusCheck = orderStatusCheck;