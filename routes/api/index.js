// import the api routes to prefix their endpoint names
const router = require('express').Router();
const userRoutes = require('./user-routes');

// add prefix of '/user' to routes created in 'user-routes.js'
router.use('/user', userRoutes);

module.exports = router;