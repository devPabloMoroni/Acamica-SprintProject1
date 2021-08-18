//Express
const express = require('express');
const app = express();
app.use(express.json());

//#region /Definicion de Swagger
const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: 'Deliah Resto',
            version: '2.0.0',
            description: 'Proyecto final de Sprint 1'
        }
    },
    apis: ['./src/app.js'],
    tags: [
        {
            name: 'data',
            description: 'Versionado'
        },
        {
            name: 'login',
            description: 'Iniciar sesion'
        },
        {
            name: 'signup',
            description: 'Crear usuario'
        },
        {
            name: 'users',
            description: 'Usuarios'
        },
        {
            name: 'orders',
            description: 'Pedidos'
        },
        {
            name: 'products',
            description: 'Productos'
        },
        {
            name: 'payments',
            description: 'Formas de Pago'
        },
    ]
};
const swaggerDocs = swaggerJsDocs(swaggerOptions);
//#endregion

//Variables de entorno
const config = require('../config');

// Importacion de clases y middlewares
const { arrayUsers, User } = require('../class/users');
const { arrayProducts } = require('../class/products');
const { arrayPayments, Payments } = require('../class/payments');
const { arrayOrders, Order } = require('../class/orders');

const { 
    userIdExist, userEmailExist, userPassCheck, adminCheck, loginCheck, DisableUser,
    productDisableCheck, productIdExist, productIndexExist, DisableProduct,
    orderUserCheck
} = require("./middleware");

//#region / Inicial
/**
 * @swagger
 * /:
 *  get:
 *    tags: [data]
 *    summary: Endpoint inicial
 *    description : Muestra version
 *    responses:
 *     200: 
 *       description: Muestra version
 */
//#endregion
app.get('/', function (req, res) {
    res.send({ App: "Deliah Resto v2.0.0" })
})

/**********************USERS*******************/
//#region / Inicio de sesion
/**
 * @swagger
 * /login:
 *  post:
 *    tags: [login]
 *    summary: Iniciar sesion de usuario.
 *    description : Iniciar sesion de usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: datos
 *        description: Email y contraseña de usuario
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            email:
 *              description: Email de usuario a loguearse.
 *              type: email
 *              example: admin@admin
 *            password:
 *              description: Contraseña de usuario a loguearse 
 *              type: string
 *              example: admin
 *    responses:
 *      200:
 *       description: Login de usuario correcto. 
 *      400:
 *       description: Usuario no encontrado (email y/o contraseña incorrecta)
 */
//#endregion
app.post('/login', userPassCheck, function (req, res) {
    res.json({result: req.result, index: req.userIndex});
})


//#region / Registrar usuario
/**
 * @swagger
 * /signup:
 *  post:
 *    tags: [signup]
 *    summary: Crear usuario
 *    description : Crear usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: users
 *        description: usuario  a crear
 *        schema:
 *          type: object
 *          required:
 *            - id
 *            - name
 *            - surname
 *            - email
 *            - password
 *            - phone
 *            - address
 *          properties:
 *            id:
 *              description: Id de usuario
 *              type: int
 *              example: 4
 *            name:
 *              description: Nombre del usuario
 *              type: string
 *              example: Lucas
 *            surname:
 *              description: Apellido del usuario 
 *              type: string
 *              example: Lagunas
 *            email:
 *              description: Correo electrónico del usuario 
 *              type: email
 *              example: lucas@lucas.com
 *            password:
 *              description: Contraseña
 *              type: password
 *              example: 1234
 *            phone:
 *              description: Telefono del usuario
 *              type: string
 *              example: 15777777
 *            address:
 *              description: Dirección de envio
 *              type: string
 *              example: Perito Moreno 123
 *            
 *    responses:
 *      200:
 *       description: Usuario registrado
 *      400:
 *       description: Usuario no registrado
 *      
 */
//#endregion
app.post('/signup', userIdExist, userEmailExist, function (req, res) {
    let { id, name, surname, email, password, phone, address } = req.user;
    user = new User(id, name, surname, email, password, phone, address);
    arrayUsers.push(user);
    res.send(user);
});


//#region / Listar usuarios
/**
 * @swagger
 * /users:
 *  get:
 *    tags: [user]
 *    summary: Listar usuarios
 *    description: Listar usuarios
 *    tag: Usuario
 *    parameters:
 *       - in: query
 *         name: userIndex
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *         description: Listado mostrado correctamente
 *       400:
 *        description: Listado no encontrado 
 */
//#endregion
app.get('/users', loginCheck, adminCheck, function (req, res) {
    res.send(arrayUsers);
});

//#region / Actualizar usuarios
/**
 * @swagger
 * /users/{index}:
 *  put:
 *    tags: [user]
 *    summary: Actualizar usuario
 *    description : Actualizar usuario
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userIndex
 *        required: true
 *        description: Indice del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0
 *      - in: path
 *        name: index
 *        required: true
 *        description: Indice de usuario a actualizar.
 *        schema:
 *          type: string
 *          example: 3
 *      - in: body
 *        name: user
 *        description: usuario a modificar
 *        schema:
 *          type: object
 *          required:
 *            - id
 *            - name
 *            - surname
 *            - email
 *            - password
 *            - phone
 *            - address
 *          properties:
 *            id:
 *              description: Id de usuario
 *              type: int
 *              example: 4
 *            name:
 *              description: Nombre del usuario
 *              type: string
 *              example: Lucas
 *            surname:
 *              description: Apellido del usuario 
 *              type: string
 *              example: Lagunas
 *            email:
 *              description: Correo electrónico del usuario 
 *              type: email
 *              example: lucas123@lucas.com
 *            password:
 *              description: Contraseña
 *              type: password
 *              example: 1234
 *            phone:
 *              description: Telefono del usuario
 *              type: string
 *              example: 15777777
 *            address:
 *              description: Dirección de envio
 *              type: string
 *              example: Perito Moreno 123
 *    responses:
 *      200:
 *       description: Producto actualizado
 *      400:
 *       description: Producto no actualizado
 *      
 */
//#endregion
app.put('/users/:index', loginCheck, adminCheck, function (req, res) {
    let user = req.body;
    let userIndex = req.params.index
    result = 'Se modifico el indice N°: ' + userIndex;
    arrayUsers[userIndex] = user;
    res.send({ resultado: result, valor: user });
});

//#region / Borrar usuarios
/**
 * @swagger
 * /users/{index}:
 *  delete:
 *    tags: [user]
 *    summary: Eliminar usuario
 *    description: Eliminar usuario
 *    parameters:
 *       - in: query
 *         name: userIndex
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: path
 *         name: index
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: integer
 *           example: 1
 *    responses:
 *       200:
 *        description: Usuario borrado.
 *       400:
 *        description: Ocurrio un error.  
 */
//#endregion
app.delete('/users/:index', loginCheck, adminCheck, DisableUser, function (req, res) {
    let user = req.user
    let userIndex = req.userIndex
    result = 'El usuario con indice N° ' + userIndex + ', se dio de baja';
    arrayUsers[userIndex] = user;
    res.send({ resultado: result, valor: user });
});

/**********************PRODUCTS*******************/
//#region / Listar productos
/**
 * @swagger
 * /products:
 *  get:
 *    tags: [products]
 *    summary: Listado de productos
 *    description: Listado de productos 
 *    parameters:
 *       - in: query
 *         name: userIndex
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *         description: Listado de usuarios
 */
//#endregion
app.get('/products/', loginCheck, productDisableCheck, function (req, res) {
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

//#region / Agrega Productos
/**
 * @swagger
 * /products:
 *  post:
 *    tags: [products]
 *    summary: Agrega producto.
 *    description : Agrega producto.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userIndex
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0
 *      - in: body
 *        name: product
 *        description: producto a agregar
 *        schema:
 *          type: object
 *          required:
 *            - id
 *            - code
 *            - name
 *            - price
 *            - stock
 *            - isDeleted
 *          properties:
 *            id:
 *              description: Id
 *              type: int
 *              example: 4
 *            code:
 *              description: Código
 *              type: string
 *              example: ENSMIX
 *            name:
 *              description: Nombre
 *              type: string
 *              example: Ensalada Mixta
 *            price:
 *              description: Precio de venta
 *              type: float
 *              example: 300
 *            stock:
 *              description: Stock
 *              type: integer
 *              example: 1
 *            isDeleted:
 *              description: Indica si el producto esta borrado
 *              type: bool
 *              example: false
 *    responses:
 *      200:
 *       description: Producto creado
 *      400:
 *       description: Ocurrio un error al crear
 *      
 */
//#endregion
app.post('/products/', loginCheck, adminCheck, productIdExist, function (req, res) {
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

//#region / Actualizar producto
/**
 * @swagger
 * /products/{productIndex}:
 *  put:
 *    tags: [products]
 *    summary: Actualiza producto.
 *    description : Actualiza producto.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userIndex
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0
 *      - in: path
 *        name: productIndex
 *        required: true
 *        description: Código de producto a actualizar.
 *        schema:
 *          type: string
 *          example: 1
 *      - in: body
 *        name: product
 *        description: producto a modificar
 *        schema:
 *          type: object
 *          required:
 *            - id
 *            - code
 *            - name
 *            - price
 *            - stock
 *            - isDeleted
 *          properties:
 *            id:
 *              description: Id
 *              type: int
 *              example: 2
 *            code:
 *              description: Código
 *              type: string
 *              example: SANJAM
 *            name:
 *              description: Nombre
 *              type: string
 *              example: Sandwich de jamon
 *            price:
 *              description: Precio de venta
 *              type: float
 *              example: 400
 *            stock:
 *              description: Stock
 *              type: integer
 *              example: 10
 *            isDeleted:
 *              description: Indica si el producto esta borrado
 *              type: bool
 *              example: false
 *    responses:
 *      200:
 *       description: Producto creado
 *      400:
 *       description: Ocurrio un error al crear
 *      
 */
//#endregion
app.put('/products/:productIndex', loginCheck, adminCheck, productIndexExist, function (req, res) {
    let product = req.body;
    let productIndex = req.productIndex;
    result = 'Se modifico el indice N°: ' + productIndex;
    arrayProducts[productIndex] = product;
    res.send({ resultado: result, valor: product });
});

//#region / Borrar producto
/**
 * @swagger
 * /products/{productIndex}:
 *  delete:
 *    tags: [products]
 *    summary: Eliminar producto.
 *    description: Eliminar producto.
 *    parameters:
 *       - in: query
 *         name: userIndex
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: path
 *         name: productIndex
 *         required: true
 *         description: Código de producto a borrar.
 *         schema:
 *           type: int
 *           example: 1
 *    responses:
 *       200:
 *        description: producto eliminado.
 *       400:
 *        description: Ocurrio un problema al eliminar.  
 */
//#endregion
app.delete('/products/:productIndex', loginCheck, adminCheck, productIndexExist, DisableProduct, function (req, res) {
    let product = req.product
    let productIndex = req.productIndex
    result = 'El producto con indice N° ' + productIndex + ', se dio de baja';
    arrayProducts[productIndex] = product;
    res.send({ resultado: result, valor: product });
});

/**********************PAYMENTS*******************/
//#region / Lista metodos de pago
/**
 * @swagger
 * /payments:
 *  get:
 *    tags: [payments]
 *    summary: Listado de formas de pago 
 *    description: Listado de formas de pago 
 *    parameters:
 *       - in: query
 *         name: userIndex
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *         description: Listado de formas de pago
 */
//#endregion
app.get('/payments', loginCheck, adminCheck, function (req, res) {
    res.send(arrayPayments);
});

//#region / Agrega Pagos
/**
 * @swagger
 * /payments:
 *  post:
 *    tags: [payments]
 *    summary: Agrega formas de pago
 *    description : Agrega formas de pago
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userIndex
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0 
 *      - in: body
 *        name: payment
 *        description: forma de pago a agregar
 *        schema:
 *          type: object
 *          required:
 *            - id
 *            - code
 *            - name
 *            - isDeleted
 *          properties:
 *            id:
 *              description: ID de la forma de pago
 *              type: int
 *              example: 4
 *            code:
 *              description: Código de la forma de pago
 *              type: string
 *              example: MP
 *            name:
 *              description: Nombre de la forma de pago 
 *              type: string
 *              example: Mercado Pago
 *            isDeleted:
 *              description: Indica si esta borrado 
 *              type: bool
 *              example: false
 *    responses:
 *      200:
 *       description: Forma de pago creada
 *      400:
 *       description: Ocurrio un error al crear la forma de pago
 *      
 */
//#endregion
app.post('/payments', loginCheck, adminCheck, function (req, res) {
    payment = req.body;
    newPayment = new Payments(payment.id, payment.code, payment.name);
    arrayPayments.push(newPayment);
    res.send(newPayment);
});

//#region / Actualizar metodo de pago
/**
 * @swagger
 * /payments/{index}:
 *  patch:
 *    tags: [payments]
 *    summary: Actualizar formas de pago
 *    description : Actualizar formas de pago
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userIndex
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0 
 *      - in: path
 *        name: index
 *        required: true
 *        description: Código del pago a actualizar.
 *        schema:
 *          type: string
 *          example: 1
 *      - in: body
 *        name: payment
 *        description: forma de pago a actualizar
 *        schema:
 *          type: object
 *          required:
 *            - id
 *            - code
 *            - name
 *          properties:
 *            id:
 *              description: ID de la forma de pago
 *              type: int
 *              example: 2
 *            code:
 *              description: Código de la forma de pago
 *              type: string
 *              example: MP
 *            name:
 *              description: Nombre de la forma de pago 
 *              type: string
 *              example: Mercado Pago
 *    responses:
 *      200:
 *       description: Forma de pago creada
 *      400:
 *       description: Ocurrio un error al crear la forma de pago
 *      
 */
//#endregion
app.patch('/payments/:index',loginCheck, adminCheck, function (req, res) {
    paymentIndex = req.params.index;
    payment = arrayPayments[paymentIndex];
    let { code, name } = req.body;
    payment.setCode(code);
    payment.setName(name);
    res.send(payment);
});

//#region / Borrar metodo de pago
/**
 * @swagger
 * /payments/{index}:
 *  delete:
 *    tags: [payments]
 *    summary: Eliminar pago.
 *    description: Eliminar pago.
 *    parameters:
 *       - in: query
 *         name: userIndex
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: path
 *         name: index
 *         required: true
 *         description: Código del pago a borrar.
 *         schema:
 *           type: int
 *           example: 1
 *    responses:
 *       200:
 *        description: Pago eliminado.
 *       400:
 *        description: Ocurrio un problema al eliminar.  
 */
//#endregion
app.delete('/payments/:index', loginCheck, adminCheck, function (req, res) {
    paymentIndex = req.params.index;
    payment = arrayPayments[paymentIndex];
    payment.setIsDeleted();
    res.send(payment);
});


/**********************ORDERS*******************/
//#region / Lista las ordenes
/**
 * @swagger
 * /orders:
 *  get:
 *    tags: [orders]
 *    summary: Listado de ordenes 
 *    description: Listado de ordenes 
 *    parameters:
 *       - in: query
 *         name: userIndex
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *         description: Listado de ordenes
 */
//#endregion
app.get('/orders', loginCheck, orderUserCheck, function (req, res) {
    if(req.result === true){
        //Verifica el resultado del middleware, si es admin, muestra todos los metodos de pago.
        if(req.flag === true){
            res.send(arrayOrders);
        }
        //Si flag == false, el usuario no es admin, por ende solo muestra los metodos activos.
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

//#region / Crear Orden
/**
 * @swagger
 * /orders:
 *  post:
 *    tags: [orders]
 *    summary: Agregado de orden.
 *    description : Agregado de orden.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userIndex
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 1
 *      - in: body
 *        name: order
 *        description: orden a crear
 *        schema:
 *          type: object
 *          required:
 *            - address
 *            - payment
 *          properties:
 *            address:
 *              description: Dirección de envio
 *              type: string
 *              example: Belgrano 1350
 *            payment:
 *              description: Forma de Pago 
 *              type: string
 *              example: TF
 *    responses:
 *      200:
 *       description: Pedido creado
 *      400:
 *       description: Pedido no creado
 *      
 */
//#endregion
app.post('/orders', loginCheck, function (req, res) {
    let { address, payment } = req.body;
    userIndex = req.userIndex;
    user = arrayUsers[userIndex];
    if (!payment in ['TC', 'TD', 'TF']) {
        return res.status(404).send({ resultado: `El metodo de pago no existe: ${payment}` });
    }
    else{
        number = (arrayOrders.length) +1;
        address = address;
        order = new Order(number, user.email, payment);
        order.setAddress(address);
        addOrder(order);
        res.send(order);
    }
});

//#region / Modificar Orden
/**
 * @swagger
 * /orders/{id}:
 *  put:
 *    tags: [orders]
 *    summary: Modificar orden.
 *    description : Modificar orden.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userIndex
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 1
 *      - in: path
 *        name: id
 *        required: true
 *        description: index de la orden a modificar
 *        schema:
 *          type: integer
 *          example: 0
 *      - in: body
 *        name: order
 *        description: orden a modificar
 *        schema:
 *          type: object
 *          required:
 *            - address
 *            - payment
 *          properties:
 *            address:
 *              description: Dirección de envio
 *              type: string
 *              example: Belgrano 1350
 *            payment:
 *              description: Forma de Pago 
 *              type: string
 *              example: TF
 *    responses:
 *      200:
 *       description: Orden modificada
 *      400:
 *       description: Ocurrio un problema al actualizar
 *      
 */
//#endregion
app.put('/orders/:id', loginCheck, function (req, res) {
    orderIndex = req.params.id;
    order = arrayOrders[orderIndex];
    let { address, payment } = req.body;
    index = req.query.index;
    user = arrayUsers[index];
    if (!payment in ['EF', 'TC', 'TD', 'MP']) {
        return res.status(404).send({ resultado: `El metodo de pago no existe: ${payment}` });
    }
    if (arrayOrders[orderIndex].status != 'PEND') {
        return res.status(404).send({ resultado: `El pedido no esta pendiente` })
    }
    address = address;
    order.setPayment(payment);
    order.setAddress(address);
    res.send(order);
});


//#region / Agregar producto
/**
 * @swagger
 * /orders/{id}/product/{productIndex}:
 *  post:
 *    tags: [orders]
 *    summary: Agregar producto
 *    description: Agregar producto
 *    consumes:
 *      - application/json
 *    parameters:   
 *      - in: query
 *        name: userIndex
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 1
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del pedido a modificar
 *        schema:
 *          type: integer
 *          example: 0
 *      - in: path
 *        name: productIndex
 *        required: true
 *        description: indice del producto a agregar
 *        schema:
 *          type: integer
 *          example: 1
 *    responses:
 *      200:
 *        description: Producto agregado correctamente
 */
//#endregion
app.post('/orders/:id/product/:productIndex', loginCheck, function (req, res) {
    orderIndex = req.params.id;
    userOrder = arrayOrders[orderIndex];
    if (userOrder.status != 'PEND') {
        return res.status(404).send({ resultado: `El pedido no esta pendiente` })
    }
    productIndex = req.params.productIndex;
    product = arrayProducts[productIndex];
    userOrder.addProduct(product);
    res.send({ resultado: 'Se agrego el producto exitosamente', product });
});

/**
 * @swagger
 * /orders/{id}:
 *  patch:
 *    tags: [orders]
 *    summary: Cambio de estado de orden
 *    description: Cambio de estado de orden
 *    consumes:
 *      - application/json
 *    parameters:   
 *      - in: query
 *        name: userIndex
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID de la orden a modificar
 *        schema:
 *          type: integer
 *          example: 0
 *      - in: body
 *        name: status
 *        description: Código del estado a cambiar
 *        schema:
 *          type: object
 *          required:
 *            - status
 *          properties:
 *            status:
 *              description: Código de Estado (PEND, CONF, PREP, ENVI, ENTR)
 *              type: string
 *              example: CONF
 *    responses:
 *      200:
 *        description: Se modifico el estado correctemente
 */
app.patch('/orders/:id', loginCheck, adminCheck, function (req, res) {
    orderIndex = req.params.id;
    userOrder = arrayOrders[orderIndex];
    orderStatus = req.body.status;
    userOrder.setStatus(orderStatus);
    res.send({ resultado: 'Se realizo el cambio de estado. Estado actual : ' + userOrder.getStatus() });
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(config.port, function(){
    console.log(`Servidor iniciado en el puerto ${config.port}...`);
});