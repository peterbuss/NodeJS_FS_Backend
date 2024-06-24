const Author = require('../models/authorModel');
const mongoose = require('mongoose');
const { findAuthors, 
        findAuthorById, 
        saveAuthor,  
        updateAuthor, 
        deleteAuthor  } = require('../db/authorDb');
const { JsonWebTokenError } = require('jsonwebtoken');

jest.mock('./authorDb.js');

let id = null;

describe("Author DB Tests", () => {
    test("As a user I want to save an author to the db", async () => {
        const newAuthor = new Author({
            _id: new mongoose.Types.ObjectId(),
            name: "Mike Leaf",
            book: "63dkdajkgfhisgfhjdfoödasj;dfdfrrasdf",
            publisher: "Tynsdale",
            website: "http://www.tynsdale.com",
            twitter: "@leafy",
            about: "I'm leaveing"
        });
        const savedAuthor = await saveAuthor(newAuthor);
        id = savedAuthor._id;
        expect(savedAuthor.name).toEqual("Mike Leaf");
        expect(savedAuthor.book).toEqual("63dkdajkgfhisgfhjdfoödasj;dfdfrrasdf");
        expect(savedAuthor.publisher).toEqual("Tynsdale");
        expect(savedAuthor.website).toEqual("http://www.tynsdale.com");
        expect(savedAuthor.twitter).toEqual("@leafy");
        expect(savedAuthor.about).toEqual("I'm leaveing");
    });

    test("As a user I want to get all the authors", async() => {
        const authors = await findAuthors({});
        expect(authors[0].name).toEqual("Mike Leaf");
        expect(authors[0].book).toEqual("63dkdajkgfhisgfhjdfoödasj;dfdfrrasdf");
        expect(authors[0].publisher).toEqual("Tynsdale");
        expect(authors[0].website).toEqual("http://www.tynsdale.com");
        expect(authors[0].twitter).toEqual("@leafy");
        expect(authors[0].about).toEqual("I'm leaveing");        
    });

    test("As a user I want to get an author by Id", async() => {
        const author = await findAuthorById({_id: id});
        expect(author.name).toEqual("Mike Leaf");
        expect(author.book).toEqual("63dkdajkgfhisgfhjdfoödasj;dfdfrrasdf");
        expect(author.publisher).toEqual("Tynsdale");
        expect(author.website).toEqual("http://www.tynsdale.com");
        expect(author.twitter).toEqual("@leafy");
        expect(author.about).toEqual("I'm leaveing");        
    });

    test("As a user I want to update an author", async () => {
        /*
            {
                    "acknowledged": true,
                    "modifiedCount": 1,
                    "upsertedId": null,
                    "upsertedCount": 0,
                    "matchedCount": 1
                }        
         */
        const author = await updateAuthor({_id: id});
        expect(author.acknowledged).toEqual(true);
        expect(author.modifiedCount).toEqual(1);
        expect(author.upsertedId).toEqual(null);
        expect(author.upsertedCount).toEqual(0);
        expect(author.matchedCount).toEqual(1);
    });

    test("As a user I want to delete a author", async () => {
        /*
            {
                "acknowledged": true,
                "deletedCount": 1
            }        
         */
        const author = await deleteAuthor({_id: id});
        expect(author.acknowledged).toEqual(true);
        expect(author.deletedCount).toEqual(1);
    });    

});