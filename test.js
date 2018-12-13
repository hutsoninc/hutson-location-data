const data = require('.');
const isValidPhone = require('is-phone');

test('is array', () => {
    expect(Array.isArray(data));
});

test('phone numbers are valid', () => {
    data.forEach(obj => {
        expect((isValidPhone(obj.phone) && obj.phone.length === 10)).toBeTruthy();
    });
});

test('location numbers are unique', () => {
    let nums = [];
    data.forEach(obj => {
        let unique = false;
        if (nums.indexOf(obj.locationNumber) === -1) {
            nums.push(obj.locationNumber);
            unique = true;
        }
        expect(unique).toBeTruthy();
    });
});

test('dealer numbers are unique', () => {
    let types = {
        ag: [],
        turf: [],
        cwp: []
    }
    let keys = Object.keys(types);
    data.forEach(obj => {
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let unique = false;
            let num = obj.dealerNumber[key];
            if (num === '') continue;
            if (types[key].indexOf(num) === -1) {
                types[key].push(num);
                unique = true;
            }
            expect(unique).toBeTruthy();
        }
    });
});
