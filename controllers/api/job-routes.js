const router = require('express').Router();
const { Job, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    Job.findAll({
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
    .then(dbJobData => res.json(dbJobData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Job.findOne({
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
    .then(dbJobData => {
        if (!dbJobData) {
            res.status(404).json({ message: 'Not any jobs here homie!' });
            return;
        }
        res.json(dbJobData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    
})

module.exports = router;