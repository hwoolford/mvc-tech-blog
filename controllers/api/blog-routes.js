const router = require('express').Router();
const { Blog } = require('../../models');

// Create Blog Post
router.post('/', async (req, res) => {
    try {
        const dbBlogData = await Blog.create({
            title: req.body.title,
            content: req.body.content,
        });

        if (!dbBlogData) {
            res.status(400).json({ message: 'Please enter a title and content'});
            return;
        }
        
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({ message: 'Thank you for posting!'});
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to post a blog at this time. Please try again later.'});
    }
});


module.exports = router;