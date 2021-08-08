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
const { arrayUsers } = require('./users');
const { arrayProducts } = require('./products');
const { arrayPayments } = require('./payments');
const { arrayOrders } = require('./orders');
const { userIdExist, userEmailExist, userLoginCheck, userCrudCheck, userAdminCheck, loginCheck,
        productIdExist, productCrudCheck,
        paymentIdExist, paymentCrudCheck
} = require("./middleware");

// Inicializacion del server
const app = express();
app.use(express.json());


/*************************************ENDPOINTS********************************/

/**********************USERS*******************/

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
    res.send({ version: "Resto v1.0.0" })
})

//Lista usuarios
app.get('/users', function (req, res) {
    console.log(arrayUsers);
    res.send(arrayUsers);
});

//Agrega usuarios
app.post('/users', userIdExist, userEmailExist, function (req, res) {
    let user = req.user;
    console.log(user);
    arrayUsers.push(user);
    res.send(user);
});

//Inicio de sesion
app.post('/login', userLoginCheck, function (req, res) {
    console.log('Login OK: ', req.user.id);
    res.json({result: true, id: req.user.id});
})

//Actualizar usuarios
app.put('/users/:id', userCrudCheck, function (req, res) {
    let user = req.body;
    let index = req.index
    result = 'Se modifico el indice N°: ' + index;
    arrayUsers[index] = user;
    res.send({ resultado: result, valor: user });
});

//Borrar usuarios
app.delete('/users/:id', userCrudCheck, function (req, res) {
    let user = req.user
    let index = req.index
    result = 'Se elimino el indice N°: ' + index
    arrayUsers.splice(index, 1);
    res.send({ resultado: result, valor: user });
});

/**********************PRODUCTS*******************/
//Lista productos
app.get('/products/:idUser', loginCheck, function (req, res) {
    if(req.result === true){
        console.log(arrayProducts);
        res.send(arrayProducts);
    }
    else{
        resultado = 'El usuario no tiene la sesion activa';
        res.send({ resultado: resultado });
    }
});

//Agrega Productos
app.post('/products/:idUser', loginCheck, userAdminCheck, productIdExist, function (req, res) {
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
app.put('/products/:idUser/:idProduct',loginCheck, userAdminCheck, productCrudCheck, function (req, res) {
    let product = req.body;
    let index = req.index
    result = 'Se modifico el indice N°: ' + index;
    arrayProducts[index] = product;
    res.send({ resultado: result, valor: product });
});

//Borrar producto
app.delete('/products/:idUser/:idProduct', loginCheck, userAdminCheck, productCrudCheck, function (req, res) {
    let product = req.params.idProduct
    let index = req.index
    result = 'Se elimino el indice N°: ' + index
    arrayProducts.splice(index, 1);
    res.send({ resultado: result, ID: product });
});

/**********************PAYMENTS*******************/
//Lista metodos de pago
app.get('/payments/:idUser', loginCheck, userAdminCheck, function (req, res) {
    if(req.result === true){
        console.log(arrayPayments);
        res.send(arrayPayments);
    }
    else{
        resultado = 'El usuario no tiene la sesion activa';
        res.send({ resultado: resultado });
    }
});

//Agrega Pagos
app.post('/payments/:idUser', loginCheck, userAdminCheck, paymentIdExist, function (req, res) {
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

//Actualizar pagos
app.put('/payments/:idUser/:idPayment',loginCheck, userAdminCheck, paymentCrudCheck, function (req, res) {
    let payment = req.body;
    let index = req.index
    result = 'Se modifico el indice N°: ' + index;
    arrayPayments[index] = payment;
    res.send({ resultado: result, valor: payment });
});

//Borrar pagos
app.delete('/payments/:idUser/:idPayment', loginCheck, userAdminCheck, paymentCrudCheck, function (req, res) {
    let payment = req.params.idPayment
    let index = req.index
    result = 'Se elimino el indice N°: ' + index
    arrayPayments.splice(index, 1);
    res.send({ resultado: result, valor: payment });
});


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs)); //Uso de Swagger

app.listen(config.port, function () {
    console.log(`Escuchando el puerto ${config.port}!`);
});

/**********************ORDERS*******************/
//Lista pedidos
app.get('/orders/:idUser', loginCheck, userAdminCheck, function (req, res) {
    if(req.result === true){
        console.log(arrayPayments);
        res.send(arrayPayments);
    }
    else{
        resultado = 'El usuario no tiene la sesion activa';
        res.send({ resultado: resultado });
    }
});