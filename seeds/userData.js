const { User } = require('../models');

const userData = [
    {
        username: 'blah',
        email: 'blah@blah.com',
        password: 'blahblah123',
    },
]


const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;