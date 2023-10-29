import User from "../models/user.js";
import path from 'path';

// getting all user picture for face recognition train data.
export const getAllUser = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['user_picture']
        });
        res.json(response);
    } catch (error) {
        console.log(error.message)
    }
}

// get the user current status.
export const getUserStatus = async (req, res) => {
    try {
        let response = await User.findOne({
            where: {
                user_id: req.params.id
            },
            attributes: ['islogin']
        });
        res.json(response);
    } catch (error) {
        console.log(error.message)
    }
}

// getting user data by id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: req.params.id
            }
        });
        res.json(user);
    } catch (error) {
        console.log(error.message)
    }
}

// get the user by username and password
export const getUserByLogin = async (req, res) => {
    const { username, password } = req.params;

    const user = await User.findOne({
        where: {
            user_username: username
        }
    });

    if (user) {
        const check = bcrypt.compare(password, user.password);
        if (check) {
            // Password valid
            const response = await User.update({ islogin: 'true' }, {
                where: {
                    user_id: user.user_id
                }
            });

            const userData = await User.findOne({
                where: {
                    user_id: user.user_id
                }
            });

            res.json(userData);
        } else {
            // Password salah
            res.status(401).json({ msg: 'Password salah' });
        }
    } else {
        res.status(404).json({ msg: 'Pengguna tidak ditemukan' });
    }
}
//  login by face recog
export const getUserByFace = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                user_picture: req.body.picture
            }
        });

        if (user.user_id) {
            await User.update({ islogin: 'true' }, {
                where: {
                    user_id: user.user_id
                }
            });

            const response = await User.findOne({
                where: {
                    user_id: user.user_id
                }
            });
            res.json(response)
        } else {
            return res.status(500).json({ msg: 'something wrong?!' })
        }
    } catch (error) {
        console.log(error.message)
    }
}

//  logout user an change login status
export const logoutUser = async (req, res) => {
    try {
        await User.update({ islogin: 'false' }, {
            where: {
                user_id: req.params.id
            }
        });
        res.status(200).json({ msg: 'User logged out' });
    } catch (error) {
        console.log(error)
    }
}

//  create new user profile
export const createUser = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: 'No File Uploaded' });

    const bcrypt = require('bcrypt');
    const picture = req.files.file;
    const fileSize = picture.data.length;
    const ext = path.extname(picture.name);
    const fileName = picture.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;


    const allowType = '.jpeg';

    if (!allowType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ msg: 'Invalid Image, must be jpeg format' });
    if (fileSize > 5000000) return res.status(422).json({ msg: 'Image must be less than 5 MB' });

    picture.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: 'err.message' });

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await User.create({
                user_username: req.body.username,
                user_firstname: req.body.firstname,
                user_lastname: req.body.lastname,
                user_password: hashedPassword,
                user_email: req.body.email,
                key1: req.body.key1,
                key2: req.body.key2,
                key3: req.body.key3,
                user_picture: url,
                islogin: 'false'
            });
            res.status(201).json({ msg: 'user created successfully' })
        } catch (error) {
            console.log(error.message);
        }
    });

}

// change user password
export const changePasswordUser = async (req, res) => {
    const newPassword = req.body.password;
    console.log(newPassword)
    try {
        await User.update({ user_password: newPassword }, {
            where: {
                user_email: req.body.email
            }
        });
        res.status(200).json({ msg: 'password change' });
    } catch (error) {
        console.log(error.message);
    }
}