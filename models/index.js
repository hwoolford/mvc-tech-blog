const User = require('./User');
const Blog = require('./Blog')

// User belongs to many blogs
User.hasMany(Blog, {
    foreignKey: 'user_id',
})

// Blog belongs to one User
Blog.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Blog }; 