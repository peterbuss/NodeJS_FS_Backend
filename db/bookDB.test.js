const Book = require('../models/bookModel');
const mongoose = require('mongoose');
const { saveBook, findBooks, findBook, updateBook, deleteBook } = require('../db/bookDB');

// describe test and expect
jest.mock('./bookDB.js');
let id = null;

describe("Book DB Tests", () => {
    test("As a user I want to save a user to the DB", async () => {
        const newBook = new Book({
            _id: new mongoose.Types.ObjectId(),
            title: "A tree grows in Brooklyn",
            author: "Mike Leaf",
            price: 9.99,
            ISBN: "345-57570-3930-0",
            numberOfPages: '500',
            yearPublished: '1999'
        });
        const savedBook = await saveBook(newBook);
        id = savedBook._id;
        expect(savedBook.title).toEqual("A tree grows in Brooklyn");
        expect(savedBook.author).toEqual("Mike Leaf");
        expect(savedBook.price).toEqual(9.99);
        expect(savedBook.ISBN).toEqual("345-57570-3930-0");
        expect(savedBook.numberOfPages).toEqual('500');
        expect(savedBook.yearPublished).toEqual("1999");
    });

    test("As a user I want to get all the books", async () => {
        const books = await findBooks({_id: id});
        expect(books[0].title).toEqual("A tree grows in Brooklyn");
        expect(books[0].author).toEqual("Mike Leaf");
        expect(books[0].price).toEqual(9.99);
        expect(books[0].ISBN).toEqual("345-57570-3930-0");
        expect(books[0].numberOfPages).toEqual('500');
        expect(books[0].yearPublished).toEqual("1999");        
    });

    test("As a user I want to get  one book", async () => {
        const book = await findBook({_id: id});
        expect(book.title).toEqual("A tree grows in Brooklyn");
        expect(book.author).toEqual("Mike Leaf");
        expect(book.price).toEqual(9.99);
        expect(book.ISBN).toEqual("345-57570-3930-0");
        expect(book.numberOfPages).toEqual('500');
        expect(book.yearPublished).toEqual("1999");        
    });

    test("As a user I want to update a book", async () => {
        /*
            {
                    "acknowledged": true,
                    "modifiedCount": 1,
                    "upsertedId": null,
                    "upsertedCount": 0,
                    "matchedCount": 1
                }        
         */
        const book = await updateBook({_id: id});
        expect(book.acknowledged).toEqual(true);
        expect(book.modifiedCount).toEqual(1);
        expect(book.upsertedId).toEqual(null);
        expect(book.upsertedCount).toEqual(0);
        expect(book.matchedCount).toEqual(1);
    });

    test("As a user I want to delete a book", async () => {
        /*
            {
                "acknowledged": true,
                "deletedCount": 1
            }        
         */
        const book = await deleteBook({_id: id});
        expect(book.acknowledged).toEqual(true);
        expect(book.deletedCount).toEqual(1);
    });
});