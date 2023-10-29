import { Sequelize } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcryptjs"; // Import modul bcrypt

const {DataTypes} = Sequelize;

const User = db.define('user', {
    user_id: {
        type: DataTypes.INTEGER(13),
        primaryKey: true,
        autoIncrement: true
    },
    user_username: {
        type: DataTypes.STRING(25).BINARY,
        allowNull: false,
        unique: true
    },
    user_firstname: {
        type: DataTypes.STRING(25).BINARY,
        allowNull: false
    },
    user_lastname: {
        type: DataTypes.STRING(25).BINARY,
        allowNull: false
    },
    user_password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },
    user_picture: {
        type: DataTypes.STRING(255),
    },
    key1: {
        type: DataTypes.STRING(20).BINARY,
        allowNull: false
    },
    key2: {
        type: DataTypes.STRING(20).BINARY,
        allowNull: false
    },
    key3: {
        type: DataTypes.STRING(20).BINARY,
        allowNull: false
    },
    islogin: {
        type: DataTypes.STRING(255),
    }
},
{
    freezeTableName: true   ,
    timestamps:  true
})

// Pre-hook sebelum data disimpan
User.beforeCreate(async (user) => {
    if (user.user_password) {
        if (!user.user_password.startsWith("$2")) {
            // Jika password belum di-hash, hash password
            const hashedPassword = await bcrypt.hash(user.user_password, 10); // 10 adalah salt rounds
            user.user_password = hashedPassword;
        }
    }
});

// Method untuk memeriksa password
User.prototype.validPassword = async function(password) {
    if (!this.user_password.startsWith("$2")) {
        // Jika password belum di-hash, langsung cocokkan
        return this.user_password === password;
    } else {
        // Jika password sudah di-hash, verifikasi dengan bcrypt
        return await bcrypt.compare(password, this.user_password);
    }
};

export default User;

(async()=>{
    await db.sync();
})