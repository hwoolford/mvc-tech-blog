const User = require('./User');
const Blog = require('./Blog')

// User belongs to many blogs

// Blog belongs to one User


module.exports = { User, Blog }; //add other models here separated by a comma and a space