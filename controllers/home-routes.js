const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to get all blogs
router.get('/', async (req, res) => {
    try {
    const dbBlogData = await Blog.findAll({
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
        blogs,
        loggedIn: req.session.loggedIn
    });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


// Route to get blog by id
router.get('/blog/:id', async (req, res) => {
    try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ['name',]
            },
        ],
    });
    const blog = dbBlogData.get({ plain: true });

    res.render('blog', {
        ...blog,
        loggedIn: req.session.loggedIn
    });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to get Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const dbUserData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = dbUserData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('dashboard');
});

module.exports = router;
