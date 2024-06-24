


const saveAuthor = async (newAuthor) => {
    console.log("Mocked Saved author to db");
    return Promise.resolve({
        name: "Mike Leaf",
        book: "63dkdajkgfhisgfhjdfoödasj;dfdfrrasdf",
        publisher: "Tynsdale",
        website: "http://www.tynsdale.com",
        twitter: "@leafy",
        about: "I'm leaveing"
    })
};

const findAuthors = async (obj) => {
    console.log("Mocked Find all the authors");
    return Promise.resolve([
        {
            name: "Mike Leaf",
            book: "63dkdajkgfhisgfhjdfoödasj;dfdfrrasdf",
            publisher: "Tynsdale",
            website: "http://www.tynsdale.com",
            twitter: "@leafy",
            about: "I'm leaveing"        
        }
    ])
};

const findAuthorById = async (obj) => {
    console.log("Mocked Find an author by Id");
    return Promise.resolve(
        {
            name: "Mike Leaf",
            book: "63dkdajkgfhisgfhjdfoödasj;dfdfrrasdf",
            publisher: "Tynsdale",
            website: "http://www.tynsdale.com",
            twitter: "@leafy",
            about: "I'm leaveing"        
        }        
    )
};

const updateAuthor = async (filter, update) => {
    console.log("Mocked Author Update");
    return Promise.resolve(
        {
            "acknowledged": true,
            "modifiedCount": 1,
            "upsertedId": null,
            "upsertedCount": 0,
            "matchedCount": 1
        }
    );
};

const deleteAuthor = async (obj) => {
    console.log("Mocked Author Delete");
    return Promise.resolve(
        {
            "acknowledged": true,
            "deletedCount": 1
        }        
    );
};

module.exports = {  findAuthors, 
                    findAuthorById, 
                    saveAuthor,  
                    updateAuthor, 
                    deleteAuthor };

