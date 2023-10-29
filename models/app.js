import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./user.js";

const {DataTypes} = Sequelize;

const App = db.define('app', {
    app_id: {
        type: DataTypes.INTEGER(13),
        primaryKey: true,
        autoIncrement: true
    },
    app_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    app_type: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    app_link: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    app_username: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    app_password: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    app_email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    last_password_change:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},
{
    freezeTableName: true
})

App.belongsTo(User);

export default App;

(async()=>{
    await db.sync();
})