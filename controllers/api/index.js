const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');

router.use('/user', userRoutes);
router.use('/blog', blogRoutes);

module.exports = router;