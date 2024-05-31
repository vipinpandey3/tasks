const express = require('express');
var passport = require('passport');
const router = express.Router();
const {create_user} = require('../controller/auth.controller');
const {validateUserRegistration, validateUserLogin} = require('../middlewares/validators')

router.post('/create-user', validateUserRegistration, create_user);

router.post('/login',
    validateUserLogin,
    passport.authenticate('login-custom', {
        session: false
    }),
    (req, res) => {
        console.log("req.user", req.user);
        if(req.user.status) {
            const result = {
                resultShort: 'success',
                resultLong: req.user.message,
                data: req.user
            }
            return res.status(200).json(result);
        } else {
            const result = {
                resultShort: 'failure',
                resultLong: req.user.message,
            }
            return res.status(200).json(result)
        }
});

module.exports = router;
