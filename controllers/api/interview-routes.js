const router = require('express').Router();
const { Interview, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    Interview.findAll({
        include: [
            // {
            //     model: Comment,
            //     include: {
            //         model: User,
            //         attributes: ['username']
            //     }
            // },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbInterviewData => res.json(dbInterviewData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Interview.findOne({
        where: {
            id: req.params.id
        },
        include: [
            // {
            //     model: Comment,
            //     include: {
            //         model: User,
            //         attributes: ['username']
            //     }
            // },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbInterviewData => {
        if (!dbInterviewData) {
            res.status(404).json({ message: 'No interviews here hillbilly!' });
            return;
        }
        res.json(dbInterviewData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;