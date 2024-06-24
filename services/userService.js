const errorTemplate = require("../templates/errorTemplate");
const { findUser, saveUser } = require('../db/db');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.registerUser = async (req, res ) => {
    try { 
            console.log("1 and email", req.body.email);
            const user = await findUser({ email: req.body.email }) ;
            console.log("2");
            console.log("user:", user);
            if(user) {
                console.log("3");
                console.log(user);
                throw new Error("User exists, try logging in");
            }
            else {
                // map req.body to user model
                console.log("4");
                const userAdd = new User();
                console.log("41");
                //userAdd._id = mongoose.Types.ObjectId;  -> can't define here, get source code otherwise. Is defined automatically.
                console.log("412");
                const newUser = Object.assign(userAdd, req.body);
                // instructor now has assign(user, req.body);
                console.log("413");
                const salt = 10;
                console.log("42");
                console.log("newUser:", newUser);
                // encrypt pw
                const hash = await bcrypt.hash(newUser.password, salt);
                console.log("6");
                // set the pw with the ecrypted pw
                newUser.password = hash;
                // Store hash in your password DB.
                const savedUser = await saveUser(newUser);
                console.log("7");
                console.log("userData:", savedUser);
                savedUser.password = null;

                return res.status(201).json({
                    message: 'Successful Registration', 
                    user: savedUser,
                });
             } 
        }
        catch(err) {
            return errorTemplate(res, err, err.message);
        }

        // findUser
        // if user exists
        // return response that says email exists try loging in
        // else
        // encrypt the password
        // set the password with the encryted password
        // save the user to the database    

};

exports.loginUser = async (req, res) => {
    // email and password
    // find the user - returns a user
    // if the user is NOT found
    // return response stating athentication failed
    // else
    // use bcrypt to compare the passwords
    // returns an error or result (true or false)
    // if err
    // return respone stating athenticaton failed
    // else
    // test the result with if statement
    // if result 
    // create a JSON Web Token - if err return response authenticaton failed else
    // return response stating authenticaton successful, token, Logged:true 
    // else
    // return response authenticaton failed (passwords didn't compare)    
    try {
        const loggedUser = await findUser({email: req.body.email});
        
        if(!loggedUser) {
            throw new Error('Authentication Failed: Uable to find user');
        } else {
            const result = await bcrypt.compare(
                req.body.password, 
                loggedUser.password
            );
            if(result) {
                loggedUser.password = null;
                const token = jwt.sign({ user: loggedUser }, process.env.jwt_secret);
                console.log('user login token signed:', token);
                return res.status(201).json({
                    user: loggedUser,
                    logged: true,
                    token: token,
                    message: 'Login Successful',
                });
    
            } else {
                throw new Error(
                    'Authentication failed: Email or Password does not match'
                );
            }
        }
    }
    catch(err) {
        return errorTemplate(res, err, err.message);
    }
};

 