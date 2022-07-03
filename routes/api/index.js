// import the api routes to prefix their endpoint names
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add prefix of '/user' to routes created in 'user-routes.js'
router.use('/user', userRoutes);
// same thought process for thought
router.use('/thought', thoughtRoutes);

module.exports = router;