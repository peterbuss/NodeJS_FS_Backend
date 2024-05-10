
const connect = async() => {
    console.log(`MongoDB mock connection`);
};

const disconnect = async () => {
    console.log("Mocked Disconnect");
};

// obj { firstName: req.body.firstName, email: req.body.email }
const findUser = async (obj) =>  {
    return Promise.resolve({
            firstName: 'Peter',
            lastName: 'Buss',
            address: '8 Bordstrasse',
            city: 'Bellach',
            state: 'NONE',
            zipCode: '4512',
            email: 'peter@mail.com',
            password: '123',
    });
};

const saveUser = async (newUser) =>  {
    return Promise.resolve({
        firstName: 'Peter',
        lastName: 'Buss',
        address: '8 Bordstrasse',
        city: 'Bellach',
        state: 'NONE',
        zipCode: '4512',
        email: 'peter@mail.com',
        password: '123',
    });
};

module.exports = { connect, disconnect, findUser, saveUser };

