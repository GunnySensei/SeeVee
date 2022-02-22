const router = require('express').Router();

const userRoutes = require('./user-routes');
const codeRoutes = require('./code-routes');
const commentRoutes = require('./comment-routes');
const jobRoutes = require('./job-routes')

router.use('/users', userRoutes);
router.use('/code', codeRoutes);
router.use('/comment', commentRoutes);
router.use('/jobs', jobRoutes);

module.exports = router;