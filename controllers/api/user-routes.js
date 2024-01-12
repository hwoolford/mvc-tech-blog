const router = require('express').Router();
const { User } = require('../../models');

// Create User Route
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Unable to create an account at this time. Please try again later.'});
    }
});


// User Login Route
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!'});
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!'});
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id;
            res.status(200).json({ user: dbUserData, message: 'You are now logged in!'});
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//User Logout Route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;