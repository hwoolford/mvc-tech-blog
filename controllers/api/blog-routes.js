const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Create Blog Post Route
router.post('/', withAuth, async (req, res) => {
    try {
        const dbBlogData = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        // req.session.save(() => {
        //     req.session.loggedIn = true;
            res.status(200).json(dbBlogData);
        // });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Unable to post a blog at this time. Please try again later.'});
    }
});

// Update (edit) Blog Post by Id Route
router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbBlogData = await Blog.update(req.body, {
            include: [{ model: User}],
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (dbBlogData[0] === 0) {
            res.status(404).json({ message: 'No blog with this id'});
            return;
        }
        res.status(200).json(dbBlogData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete Blog Post by Id Route
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const dbBlogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if (!dbBlogData) {
            res.status(404).json({ message: 'No blog with this id'});
            return;
        }
        res.status(200).json(dbBlogData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;