let regex = /\S+@\S+\.\S+/;

function check(arr, regex) {
    arr.forEach(str => {
        // console.log(str.match(regex));
        console.log(str.match(regex) && str.match(regex)[0] === str);
    });
}

check(arrVal1, regex);


let arrVal1 = ['email@example.com', // all are true, just as they should be
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    'email@123.123.123.123',
    'email@[123.123.123.123]',
    '"email"@example.com',
    '1234567890@example.com',
    'email@example-one.com',
    '_______@example.com',
    'email@example.name',
    'email@example.museum',
    'email@example.co.jp',
    'firstname-lastname@example.com'];

let arrVal2 = [
    'much.”more\ unusual”@example.com', // false
    'very.unusual.”@”.unusual.com@example.com', // true
    'very.”(),:;<>[]”.VERY.”very@\\ "very”.unusual@strange.example.com' // false
];

let arrInv = [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'あいうえお@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@example.web', //! true
    'email@111.222.333.44444', //! true
    'email@example..com',
    'Abc..123@example.com',

    '”(),:;<>[\]@example.com',
    'just”not”right@example.com',
    'this\ is"really"not\allowed@example.com',
];

let reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

// using REG: 2 of the invalids came out as valid, all the 3 strange valids came out as invalid