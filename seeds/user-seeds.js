const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
    {
        username: 'JimBob',
        email: 'JimBob@jim.com',
        password: '12345',
        languages: 'HTML, CSS, SHIT'
    },
    {
        username: 'Bilbo',
        email: 'bilbo@baggins.com',
        password: '12345',
        languages: 'hobbit'
    }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});
module.exports = seedUsers;