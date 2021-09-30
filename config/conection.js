const { Sequelize } = require('sequelize');

//Configuracione de la conexion usando variables de archivo .ENV
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

//Realizo la conexion con la funcion authenticate usando la configuracion indicada
async function auth() {
    try{
        await sequelize.authenticate();
        console.log('Conexion a la base exitosa!');
    } catch (error) {
        console.log('Ocurrio un error: ', error);
    }
};

auth();