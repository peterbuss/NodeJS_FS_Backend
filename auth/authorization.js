require('dotenv').config();
const jwt = require('jsonwebtoken');
const errorTemplate = require('../templates/errorTemplate');
const messages = require('../messages/messages');
const { findUser, saveUser } = require('../db/db');


module.exports = (req, res, next) => {
    try {
        // 'Bearer: ndgatlöoejhtfgpiqwodfdf'
        console.log("authorization", req.headers.authorization);
        console.log("req.headers", req.headers);
        let token;
        //const [, token] = req.headers.authorization.split(" ");
        if(req.headers.authorization)
            [, token] = req.headers.authorization.split(" ");
        console.log('token:', token);
        console.log('secret', process.env.jwt_secret);
/*         
        if(token === process.env.jwt_secret) {
            console.log('token ok');
        }
        else {
            console.log('token does not match');
        }

 */        
        const decoded = jwt.verify(token, process.env.jwt_secret);
        console.log("decoded",  decoded);
        // this didn't work at first - it faulted
        
        next();
    }
    catch(e) {
        console.log('token verify failed: ', e.message);
        errorTemplate(res, e, messages.auth_failed, 500);
    }
}

