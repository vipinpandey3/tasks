/* eslint-disable curly */
// *********************************************************
// Copyright (c) 2017 Agra Technologies Pvt. Ltd.. All rights reserved
// *********************************************************
const CustomStrategy = require('passport-custom').Strategy;
const config = require('../../config')
var models = require('../../models');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var moment = require('moment');
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SIGNING_KEY
};

module.exports = function(passport) {
    passport.use('login-custom', new CustomStrategy(async(req, done) => {
        console.log("Inside the passport CustomStrategy")
        try {
            let reqBody = req.body;
            let password = reqBody.password
            let user = await models.User.findOne({
                where: {
                    email: reqBody.email
                }
            })
            if(!user) {
                return done(null, {
                    status: false,
                    message:"user does not exist, please sign up"
                })
            }
            let compare_result = await bcrypt.compare(password, user.password);
            if(!compare_result) {
                return done(null, {
                    success: false,
                    message: "user phone or password does not match"
                })
            }
            return done(null, {
                jwt: jwt.sign({
                    data: {
                        user_id: user.id,
                        user_email: user.email,
                        user_name: user.firstName + " " + user.lastName
                    }
                }, config.JWT_SIGNING_KEY, {
                    "issuer" : "testing",
                    "audience" : "all"
                }),
                user_details: {
                    user_id: user.id,
                    user_email: user.email,
                    user_first_name: user.firstName,
                    user_last_name: user.lastName
                },
                message: "login successfull",
                status: true
            })
        } catch (error) {
            console.log("testing", error)
            return  done(null, {
                status: false,
                message: error.message
            })
        }
    }))


    passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
        console.log("jwt_payload",jwt_payload)
        try {
            let data = jwt_payload.data;
            return done(null, data)
        } catch (error) {
            console.log("Error while api authentication", error)
            done(null, jwt_payload.data)
        }
    }))
}