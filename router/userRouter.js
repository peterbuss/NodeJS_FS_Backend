const express = require('express');

const router = express.Router();

router.post('/register', (req, res, next) => {
    // findUser
    // if user exists
    // return response that says email exists try loging in
    // else
    // encrypt the password
    // set the password with the encryted password
    // save the user to the database


});

router.post('/login', (req, res) => {

});


module.exports = router;

