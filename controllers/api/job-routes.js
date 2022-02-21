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
    Job.create({
        company_name: req.body.company_name,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        job_url: req.body.job_url,
        user_id: req.session.user_id
    })
    .then(dbJobData => res.json(dbJobData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Job.update(
        {
            title: req.body.title,
            description: req.body.description
        },
        {
            where: {
                id: req.params.id
            }
        } )
        .then(dbJobData => {
            if (!dbJobData) {
                res.status(404).json({ message: 'No job found with this id!' });
                return;
            }
            res.json(dbJobData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Job.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbJobData => {
        if (!dbJobData) {
            res.status(404).json({ message: 'No Job matches this id!' });
            return;
        }
        res.json(dbJobData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;