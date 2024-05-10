const { connect, disconnect, saveUser, findUser } = require('./db.js');
const User  = require('../models/userModel');
const mongoose = require('mongoose');

// describe, test(), expect()

jest.mock('./db');

beforeAll(async () => {
    return await connect();
});

describe('User Test Suite', () => {
    test('As a user I want to save a user to the database', async() => {
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            firstName: 'Peter',
            lastName: 'Buss',
            address: '8 Bordstrasse',
            city: 'Bellach',
            state: 'NONE',
            zipCode: '4512',
            email: 'peter@mail.com',
            password: '1234',
        });
        const user = await saveUser(newUser);
        expect(user.firstName).toEqual('Peter');
        expect(user.lastName).toEqual('Buss');
        expect(user.address).toEqual('8 Bordstrasse');                
        expect(user.city).toEqual('Bellach');
        expect(user.state).toEqual('NONE');
        expect(user.zipCode).toEqual('4512');
        expect(user.email).toEqual('peter@mail.com');         
        expect(user.password).toEqual('123');            
    });

    test('As a user I want to find a user by any property', async () => {
        const obj =  { email: 'peter@mail.com'};

        await findUser(obj).then((user) => {
            expect(user.firstName).toBe('Peter');
            expect(user.lastName).toEqual('Buss');
            expect(user.address).toEqual('8 Bordstrasse');                
            expect(user.city).toEqual('Bellach');
            expect(user.state).toEqual('NONE');
            expect(user.zipCode).toEqual('4512');
            expect(user.email).toEqual('peter@mail.com');         
            expect(user.password).toEqual('123');                

        }).catch((err) => {
            console.log('Error' + err.message);
        });
    });

});

afterAll(async () => {
    return await  disconnect();
});

