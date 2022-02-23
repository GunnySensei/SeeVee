const router = require('express').Router();
const { User, Interview, Comment } = require('../models');

router.get('/', (req, res) => {
    Interview.findAll({
        include: [
            {
                model: Comment,
                attributes: [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    .then(dbInterviewData => {
        const interviews = dbInterviewData.map(interview => interview.get(
            ({ plain: true })
        ));

        res.render('interview-experiences', {
            interviews,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/interviews/:id', (req, res) => {
    Interview.findOne({ 
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
    .then(dbInterviewData => {
        if (!dbInterviewData) {
            res.status(404).json({ message: 'no interview found with this id' });
            return;
        }

        const interview = dbInterviewData.get({ plain: true });

        res.render('single-interview', {
            interview,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;