const express = require('express');
//const { findUser } = require('../db/__mocks__/db');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { findUser, saveUser} = require('../db/db');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/register', (req, res, next) => {
    console.log("1");
    findUser({ email: req.body.email }).then((user) => {
        console.log("2");
        console.log("user:", user);
        if(user) {
            console.log("3");
            console.log(user);
            return res.status(409).json({message: "User exists, try logging in"});
        }
        else {
            // map req.body to user model
            console.log("4");
            const userAdd = new User();
            console.log("41");
            //userAdd._id = mongoose.Types.ObjectId;  -> can't define here, get source code otherwise. Is defined automatically.
            console.log("412");
            const newUser = Object.assign(userAdd, req.body);
            console.log("413");
            const salt = 10;
            console.log("42");
            console.log("newUser:", newUser);
            // encrypt pw
            bcrypt.hash(newUser.password, salt, (err, hash)  => {
                if(err) {
                    console.log("5");
                    return  res.status(501).json({message: 'Error: ' + err.message });
                }
                else {
                    console.log("6");
                    // set the pw with the ecrypted pw
                    newUser.password = hash;
                    // Store hash in your password DB.
                    saveUser(newUser).then((userData) => {
                        console.log("7");
                        console.log("userData:", userData);
                        return res.status(201).json({
                            message: 'Successful Registration', 
                            user: userData
                        });
                    }).catch((err) => {
                        error: {
                            console.log("8");
                            
                            console.log("Error message", err.message);
                            message: err.message;
                        }
                    });
                    
                }
            });          
        }
    })
    .catch(err => {
        error: {
            message: err.message;
        }
    });
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

