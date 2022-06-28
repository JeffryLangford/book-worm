const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const choiceRoutes = require('./choice-route');
const commentRoutes = require('./comment-route');
const bookRoutes = require('./book-routes.js');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/choices',choiceRoutes);
router.use('/comments',commentRoutes);
router.use('/books', bookRoutes);

module.exports = router;