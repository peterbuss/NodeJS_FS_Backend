const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const userSchema = mongoose.Schema({
    // id
    // firstName, lastName, address, city, state, zipCode, email, password

    // mongoose.Schema.Types.ObjectId, - from instructor 
    // in current version could use mongoose.Typee.ObjectId, but mongoose does this for us.

/*     _id: {
        type: String,  -> is defined automatically by mongoose. trying this made problems!
    },
 */    
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);