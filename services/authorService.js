const mongoose = require('mongoose');
const Author = require('../models/authorModel');
const errorTemplate = require('../templates/errorTemplate');
const successTemplate = require('../templates/successTemplate');
const messages = require('../messages/messages');
const {  findAuthors, 
    findAuthorById, 
    saveAuthor,  
    updateAuthor, 
    deleteAuthor } = require('../db/authorDb');

exports.postAuthor = async(req, res) => {
    try {
        // find the Author
        console.log('request.body:', req.body);
        //const id = req.params.authorId;
        const author = await findAuthorById({
            name: req.body.name, 
            book: req.body.bookId
        });
         // if author throw new Error
        if(author) {
            throw new Error(message.author_exists);
        }
        // else
        else {
            console.log(author);
            // make our author using Object.assign
            const newAuthor = new Author({
                _id: new mongoose.Types.ObjectId,  // not required in this version of mongoose, but new was required, but not in instructors version
            });
            const assignedAuthor = Object.assign(newAuthor, req.body);
            console.log('auth:', assignedAuthor);
            // then save  and success
            const savedAuthor = await saveAuthor(assignedAuthor);
            return successTemplate(res, savedAuthor, messages.author_saved, 201);
        }
    }
    catch(e) {
        errorTemplate(res, e, e.message, 501);
    }
};

exports.getAuthors = async (req, res) =>  {
    try {
        // findAuthors return list/array
        const authors = await findAuthors({});
        //check if list.length > 0 
        if(authors.length > 0) {
             // return success
            return successTemplate(res, authors, messages.authors_found, 200);
        }
        // else
        else {
            // throw an error
            throw new Error(messages.no_authors_found);
        }
    }
    catch(e) {
        return errorTemplate(res, e, e.message, 500);
    }
};

exports.getAuthorById = async(req, res) => {
    try {
        const id = req.params.authorId;
        // find an author
        const author = await findAuthorById({_id: id});
        // if author
        if(author) {
            // return sauccess
            return successTemplate(res, author, messages.author_found, 200);
        }
        // else
        else {
            // throw error
            throw new Error(messages.no_author_found);
        }
    }
    catch(e) {
        return errorTemplate(res, e, e.message, 500);
    }
};

exports.patchAuthor = async (req, res) => {
    try {
        // get the id from params
        const id = req.params.authorId;
        console.log("Author Id", id);
        // create an author object
        const author = new Author();
        // object assign req.body
        const update = Object.assign(author, req.body);
        console.log("updated author", update);
        // updateAuthor return success
        const result = await updateAuthor({_id: id}, update);
        return successTemplate(res, result, messages.author_updated, 200);
    }
    catch(e) {
        return errorTemplate(res, e, messages.author_not_updated, 500);
    }
};

exports.deleteAuthor = async(req, res) => {
    try {
        // get the id
        const id = req.params.authorId;
        // call db deleteAuthor
        const result = await deleteAuthor({_id: id});
        // return success
        return successTemplate(res, result, messages.author_deleted, 200);
    }   
    catch(e) {
        return errorTemplate(res, e, messages.author_not_deleted, 500);
    }
};
