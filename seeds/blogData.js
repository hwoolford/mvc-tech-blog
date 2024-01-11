const { Blog } = require('../models');

const blogData = [
    {
        title: 'blah blah',
        content: 'blah blah blah blah blah blah',
    },
]




const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;