const express = require("express");
const cors = require('cors');
const userRouter = require('../router/userRouter');
const bookRouter = require('../router/bookRouter');
const authorRouter = require('../router/authorRouter');
const { connect } = require('../db/db');
const app = express();
const swaggerUi = require('swagger-ui-express');
const document = require('../config/swaggerOptions.json');


// use middleware to form our contract for incoming json payloads ONLY!
app.use(express.json());

// use middleware for url encoding  -- was it the next line that was required for it to work
// otherwise no data would be returned by form requests
app.use(express.urlencoded({ extended: true }));
// use middleware to handle cors policy
app.use(cors());

// health point or actuator
// http://localhost:3001
app.get('/', (req,res,next)=>{
    res.status(200).json({  message: 'Service is up' });
});

// routers
app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

// use middleware for api-docs swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document));

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
connect();
// up to here is called only once, then the app sleeps and waits for requests

module.exports = app;


