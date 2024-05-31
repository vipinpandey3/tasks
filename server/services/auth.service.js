const bcrypt = require('bcryptjs');
const config = require('../config');
const user = require('../models/user');
const models = require('../models');
const moment = require('moment');

const auth_service = {
    create_user: async(reqBody) => {
        try {
            console.log("inside the create_user");
            let message = ""
            let existingUser = await models.User.findOne({
                where: {
                    email: reqBody.email
                }
            });
            if(existingUser) return {status: false, message: "user already exits with this email, please login"}
            let password = bcrypt.hashSync(reqBody.password, config.SALT_ROUNDS);
            reqBody.password = password;
            // reqBody.created_at = moment();
            // reqBody.updated_at = moment();
            let createdUser = await models.User.create(reqBody);
            if(!createdUser) message = "error creating user"
            else message = "user created"
            return {
                status: true,
                message: message
            }
        } catch (error) {
            console.log("error inside the create_user", error)
            return {
                status: false,
                message: error.message
            }
        }
    }
}

module.exports = auth_service;