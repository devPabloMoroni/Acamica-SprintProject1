const express = require('express'); //Importacion de Express
const config = require('../config'); //Importacion de archivo de configuracion
const swaggerJsDoc = require('swagger-jsdoc'); //Importacion de Swagger docs
const swaggerUI = require('swagger-ui-express'); //Importacion de Swagger UI

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Deliah Resto',
            version: '1.0.0'
        }
    },
    apis: ['./src/apps.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Importacion de clases, middlewares, etc
const { arrayUsers } = require('./class/users');
const { arrayProducts } = require('./class/products');
const { arrayPayments } = require('./class/payments');
const { arrayOrders } = require('./class/orders');

const { 
        userIdExist, userEmailExist, userExist, DisableUser, userStatusCheck, userPassCheck, loginCheck, adminCheck,
        productIdExist, productIndexExist, DisableProduct, productDisableCheck,
        paymentIdExist, paymentIndexExist, DisablePayment, paymentDisableCheck,
        ordersUserCheck, orderIdExist, orderIndexExist, orderUserCheck, orderStatusCheck
} = require("./middlewares/middleware");

// Inicializacion del server
const app = express();
app.use(express.json());


/*************************************ENDPOINTS********************************/
//TEST
/**
 * @swagger
 * /:
 *  get:
 *    summary: Test de endpoint /
 *    description : Prueba de swagger
 *    responses:
 *     200: 
 *       description: endpoint / para test de swagger
 */
app.get('/', function (req, res) {
    res.send({ version: "Resto v1.1.0" })
})

/**********************USERS*******************/
//Lista usuarios
app.get('/users', function (req, res) {
    res.send(arrayUsers);
});

//Agrega usuarios
app.post('/users/register', userIdExist, userEmailExist, function (req, res) {
    let user = req.user;
    arrayUsers.push(user);
    res.send(user);
});

//Actualizar usuarios
app.put('/users/update/:userIndex', userExist, function (req, res) {
    let user = req.body;
    let userIndex = req.userIndex
    result = 'Se modifico el indice N°: ' + userIndex;
    arrayUsers[userIndex] = user;
    res.send({ resultado: result, valor: user });
});

//Borrar usuarios
app.delete('/users/delete/:userIndex', userExist, DisableUser, function (req, res) {
    let user = req.user
    let userIndex = req.userIndex
    result = 'El usuario con indice N° ' + userIndex + ', se dio de baja';
    arrayUsers[userIndex] = user;
    res.send({ resultado: result, valor: user });
});

//Inicio de sesion
app.post('/login', userPassCheck, function (req, res) {
    res.json({result: req.result, index: req.userIndex});
})

/**********************PRODUCTS*******************/
//Listar productos
app.get('/products/:userIndex', loginCheck, productDisableCheck, function (req, res) {
    if(req.result === true){
        //Verifica el resultado del middleware, si es admin, muestra todos los productos.
        if(req.flag === true){
            res.send(arrayProducts);
        }
        //Si flag == false, el usuario no es admin, por ende solo muestra los productos activos.
        else{
            userArrayProducts = [];
            userArrayProducts = req.newProductsArray;
            res.send(userArrayProducts);
        }
    }
    else{
        resultado = 'El usuario no tiene la sesion activa por lo cual no puede ver los productos';
        res.send({ resultado: resultado });
    }
});

//Agrega Productos
app.post('/products/:userIndex/create', loginCheck, adminCheck, productIdExist, function (req, res) {
    let result = req.result;
    let product = req.body;
    if( result === true){
        arrayProducts.push(product);
        res.send(product);
    }
    else{
        res.send({ resultado: "No se permite agregar"});
    }   
});

//Actualizar producto
app.put('/products/:userIndex/update/:productIndex',loginCheck, adminCheck, productIndexExist, function (req, res) {
    let product = req.body;
    let productIndex = req.productIndex;
    result = 'Se modifico el indice N°: ' + productIndex;
    arrayProducts[productIndex] = product;
    res.send({ resultado: result, valor: product });
});

//Borrar producto
app.delete('/products/:userIndex/delete/:productIndex', loginCheck, adminCheck, productIndexExist, DisableProduct, function (req, res) {
    let product = req.product
    let productIndex = req.productIndex
    result = 'El producto con indice N° ' + productIndex + ', se dio de baja';
    arrayProducts[productIndex] = product;
    res.send({ resultado: result, valor: product });
});


/**********************PAYMENTS*******************/
//Lista metodos de pago
app.get('/payments/:userIndex', loginCheck, paymentDisableCheck, function (req, res) {
    if(req.result === true){
        //Verifica el resultado del middleware, si es admin, muestra todos los metodos de pago.
        if(req.flag === true){
            res.send(arrayPayments);
        }
        //Si flag == false, el usuario no es admin, por ende solo muestra los metodos activos.
        else{
            userArrayPayments = [];
            userArrayPayments = req.newPaymentsArray;
            res.send(userArrayPayments);
        }
    }
    else{
        resultado = 'El usuario no tiene la sesion activa por lo cual no puede ver los productos';
        res.send({ resultado: resultado });
    }
});

//Agrega Pagos
app.post('/payments/:userIndex/create', loginCheck, adminCheck, paymentIdExist, function (req, res) {
    let result = req.result;
    let payment = req.body;
    if( result === true){
        arrayPayments.push(payment);
        res.send(payment);
    }
    else{
        res.send({ resultado: "No se permite agregar"});
    }   
});

//Actualizar metodo de pago
app.put('/payments/:userIndex/update/:paymentIndex',loginCheck, adminCheck, paymentIndexExist, function (req, res) {
    let payment = req.body;
    let paymentIndex = req.paymentIndex;
    result = 'Se modifico el indice N°: ' + paymentIndex;
    arrayPayments[paymentIndex] = payment;
    res.send({ resultado: result, valor: payment });
});

//Borrar metodo de pago
app.delete('/payments/:userIndex/delete/:paymentIndex', loginCheck, adminCheck, paymentIndexExist, DisablePayment, function (req, res) {
    let payment = req.payment
    let paymentIndex = req.paymentIndex
    result = 'El metodo con indice N° ' + paymentIndex + ', se dio de baja';
    arrayPayments[paymentIndex] = payment;
    res.send({ resultado: result, valor: payment });
});

/**********************ORDERS*******************/
//Lista pedidos
app.get('/orders/:userIndex', loginCheck, ordersUserCheck, function (req, res) {
    if(req.result === true){
        //Verifica el resultado del middleware, si es admin, muestra todos las ordenes
        if(req.flag === true){
            res.send(arrayOrders);
        }
        //Si flag == false, solo muestra los pedidos para ese usuario.
        else{
            userArrayOrders = [];
            userArrayOrders = req.newOrdersArray;
            res.send(userArrayOrders);
        }
    }
    else{
        resultado = 'El usuario no tiene la sesion activa por lo cual no puede ver los productos';
        res.send({ resultado: resultado });
    }
});

//Agrega Pedidos
app.post('/orders/:userIndex/create', loginCheck, orderIdExist, function (req, res) {
    let result = req.result;
    let order = req.body;
    if( result === true){
        arrayOrders.push(order);
        res.send(order);
    }
    else{
        res.send({ resultado: "No se permite agregar"});
    }   
});

//Actualizar pedidos
app.put('/orders/:userIndex/update/:orderIndex',loginCheck,  orderIndexExist, orderUserCheck, orderStatusCheck, function (req, res) {
    let order = req.body;
    let orderIndex = req.orderIndex;
    result = 'Se modifico el indice N°: ' + orderIndex;
    arrayOrders[orderIndex] = order;
    res.send({ resultado: result, valor: order });
});

//Cambiar de estado con el usuario administrador























app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs)); //Uso de Swagger

app.listen(config.port, function () {
    console.log(`Escuchando el puerto ${config.port}!`);
});