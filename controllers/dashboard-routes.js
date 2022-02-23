const router = require('express').Router();
const { User, Job, Interview, Code } = require('../models');

router.get('/', (req, res) => {
    User.findAll({
        include: {
            model: Job,
            model: Interview,
            model: Code
        }
    })
    .then(dbUserData => {
        const posts = dbUserData.map(post => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

module.exports = router;