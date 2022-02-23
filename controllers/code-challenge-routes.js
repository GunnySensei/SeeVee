const router = require('express').Router();
const { User, Code, Comment } = require('../models');

router.get('/', (req, res) => {
    Code.findAll({
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
    .then(dbCodeData => {
        const challenges = dbCodeData.map(challenge => challenge.get(
            ({ plain: true })
        ));

        res.render('coding-challenges', {
            challenges,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/codes/:id', (req, res) => {
    Code.findOne({ 
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
    .then(dbCodeData => {
        if (!dbCodeData) {
            res.status(404).json({ message: 'no challenge found with this id' });
            return;
        }

        const challenge = dbCodeData.get({ plain: true });

        res.render('single-challenge', {
            challenge,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;