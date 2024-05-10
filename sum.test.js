// business has given us requirements to write a math module that sums, divides, multiplys, subtracts

// jest - describe test expect

const sum = require('./sum');

describe('Math Module Tests', () => {
    test('As a user I want to sum 2 numbers', () => {
        expect(sum(3,5)).toEqual(8);
    });
});

