const router = require('express').Router();

const apiRoutes = require('../api/book-routes');

router.use('/api/', apiRoutes);

module.exports = router;