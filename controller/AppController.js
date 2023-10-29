import App from "../models/app.js";
import User from "../models/user.js";
import moment from "moment-timezone";


// get all app
export const getAllApp = async (req, res) => {
    try {
        const response = await App.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

// get app by id
export const getAppById = async (req, res) => {
    try {
        const response = await App.findOne({
            where: {
                app_id: req.params.id,
            },
        });
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

// get all app from user with id ..
export const getAppByUserId = async (req, res) => {
    try {
        const response = await App.findAll({
            where: {
                userUserId: req.params.id,
            },
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

// create or write new app list to the database
export const createApp = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: req.body.user_id,
            },
        });

        if (user) {
            App.create({
                userUserId: req.body.user_id,
                app_name: req.body.app_name,
                app_type: req.body.app_type,
                app_link: req.body.app_link,
                app_username: req.body.app_username,
                app_password: req.body.app_password,
                app_email: req.body.app_email,
            });
            res.status(201).json({ msg: "App created Succcessfully" });
        }
    } catch (error) {
        console.log(error.message);
    }
};

// update app with current id
export const updateApp = async (req, res) => {

    const currentDate = moment().tz("Asia/Jakarta").format("YYYY-MM-DD");
    const before = await App.findOne({
        where: {
            app_id: req.params.id,
        },
    });

    if (before.app_password !== req.body.password) {
        try {
            await App.update(
                {
                    app_name: req.body.name,
                    app_type: req.body.type,
                    app_link: req.body.link,
                    app_username: req.body.username,
                    app_password: req.body.password,
                    app_email: req.body.email,
                    last_password_change: currentDate,
                },
                {
                    where: {
                        app_id: req.params.id,
                    },
                }
            );

            res.status(200).json({ msg: "app updated" });
        } catch (error) {
            console.log(error.message);
        }
    } else {
        try {
            await App.update(
                {
                    app_name: req.body.name,
                    app_type: req.body.type,
                    app_link: req.body.link,
                    app_username: req.body.username,
                    app_password: req.body.password,
                    app_email: req.body.email,
                },
                {
                    where: {
                        app_id: req.params.id,
                    },
                }
            );

            res.status(200).json({ msg: "app updated" });
        } catch (error) {
            console.log(error.message);
        }
    }
};

// deleting / drop app from the database
export const deleteApp = async (req, res) => {
    const app = App.findOne({
        where: {
            app_id: req.params.id,
        },
    });
    if (!app) return res.status(404).json({ msg: "data not found" });

    try {
        await App.destroy({
            where: {
                app_id: req.params.id,
            },
        });
        res.status(200).json({ msg: "App list  Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
    }
};
