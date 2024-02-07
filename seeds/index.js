const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const seedUser = require('./userData.json');
const seedBlog = require('./blogData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(seedUser, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of seedBlog) {
        await Blog.create({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedAll();

// const seedAll = async () => {
//     await sequelize.sync({ force: true });
//     await seedUser();
//     await seedBlog();
//     process.exit(0);
// };

// seedAll();