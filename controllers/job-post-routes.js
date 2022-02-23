const router = require('express').Router();
const { User, Job, Comment } = require('../models');

router.get('/', (req, res) => {
    Job.findAll({
        include: [
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbJobData => {
        const postings = dbJobData.map(post => post.get(
            ({ plain: true })
        ));

        res.render('jobs', {
            postings,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/jobs/:id', (req, res) => {
    Job.findOne({ 
        where: req.params.id, 
        include: [
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbJobData => {
        if (!dbJobData) {
            res.status(404).json({ message: 'no post found with this id' });
            return;
        }

        const post = dbJobData.get({ plain: true });

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;