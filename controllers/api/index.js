const router = require('express').Router();

const userRoutes = require('./user-routes');
const codeRoutes = require('./code-routes');
const commentRoutes = require('./comment-routes');
const jobRoutes = require('./job-routes');
const interviewRoutes = require('./interview-routes');

router.use('/users', userRoutes);
router.use('/codes', codeRoutes);
router.use('/comments', commentRoutes);
router.use('/jobs', jobRoutes);
router.use('/interviews', interviewRoutes);

module.exports = router;