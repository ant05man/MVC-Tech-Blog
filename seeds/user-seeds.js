
const { User } = require('../models');

const userData = [{
        username: 'John',
        email: 'John@example.com',
        password: 'password1'
    },
    {
        username: 'Pam',
        email: 'pam@example.com',
        password: 'password2'
    },
    {
        username: 'Mary',
        email: 'mary@example.com',
        password: 'password3'
    }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;