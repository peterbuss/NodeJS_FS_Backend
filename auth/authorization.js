require('dotenv').config();
const jwt = require('jsonwebtoken');
const errorTemplate = require('../templates/errorTemplate');
const messages = require('../messages/messages');


module.exports = (req, res, next) => {
    try {
        // 'Bearer: ndgatlöoejhtfgpiqwodfdf'

        const [, token] = req.headers.authorization.split(" ");
        console.log('token:', token);
        console.log('secret', process.env.jwt_secret);
        if(token === process.env.jwt_secret) {
            console.log('token ok');
        }
        else {
            console.log('token does not match');
        }
        //const decoded = jwt.verify(token, process.env.jwt_secret);  --  not done right token should have 3 parts
        // token could be ok if set by postman
        // but process.env.jwt_secret is not write, it should be in user service created token
        // which is not saved anywhere.
        console.log('simple token verified'); // bar      
        next();
    }
    catch(e) {
        console.log('token verify failed: ', e.message);
        errorTemplate(res, e, messages.auth_failed, 500);
    }
}

