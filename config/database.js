import { Sequelize } from "sequelize";

// configure the database server to connected using sequelizer
const db = new Sequelize('pagerdb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;