const express = require("express");
const cors = require('cors');

const app = express();

// use middleware to form our contract for incoming json payloads ONLY!
app.use(express.json());
// use middleware for url encoding
app.use(express.urlencoded({ extended: true }));
// use middleware to handle cors policy
app.use(cors());

// health point or actuator
// http://localhost:3001
app.get('/', (req,res,next)=>{
    res.status(200).json({  message: 'Service is up' });
});

// routers



// app.use('/register', registrationRouter)
// bad url or error we can handle
// with middleware
app.use((res, req, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    // does not work with error.status(404) ;
    next(error);  // required to go to next section to handle error, otherwise it hangs
});

    /* typical Error constructor
        class Error {
            let message;
            let status;

            Error(){}

            Error(string message) {

            }
        }
    */

// the previous next jumps to here

app.use((error,req,res,next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status,
        },
    });
});

// db

module.exports = app;


