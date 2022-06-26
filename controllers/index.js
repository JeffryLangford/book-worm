const router = require('express').Router();

//const apiRoutes = require('./api/book-routes.js');
const homeRoutes = require('./home-routes.js');

//router.use('/', homeRoutes);
router.use('/api/', homeRoutes);

module.exports = router;