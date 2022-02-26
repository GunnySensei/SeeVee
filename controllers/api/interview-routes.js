const router = require('express').Router();
const { Interview, User, Comment, Vote } = require('../../models');
const { sequelize } = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Interview.findAll({
        attributes: [
            "id",
            "title",
            "code_url",
            "user_id",
            [
              sequelize.literal(
                "(SELECT COUNT(*) FROM vote WHERE interview.id = vote.interview_id)"
              ),
              "vote_count",
            ],
          ],
          order: [["created_at", "ASC"]],
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
    .then(dbInterviewData => res.json(dbInterviewData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET single Interview route
router.get('/:id', withAuth, (req, res) => {
    Interview.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "title",
            "code_url",
            "user_id",
            [
              sequelize.literal(
                "(SELECT COUNT(*) FROM vote WHERE interview.id = vote.interview_id)"
              ),
              "vote_count",
            ],
          ],
          order: [["created_at", "DESC"]],
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

// POST new Interview route
router.post('/', (req, res) => {
    Interview.create({
        company: req.body.company,
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id
    })
    .then(dbInterviewData => res.json(dbInterviewData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT upvote Interview route
router.put("/upvote", withAuth, (req, res) => {
    Vote.create({
      user_id: req.session.user_id,
      code_id: req.body.code_id,
    })
      .then((dbCodeData) => res.json(dbCodeData))
      .catch((err) => res.json(err));
});

// PUT update Interview route
router.put('/:id', withAuth, (req, res) => {
    Interview.update(
        {
            company: req.body.company,
            title: req.body.title,
            description: req.body.description
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbInterviewData => {
        if (!dbInterviewData) {
            res.status(404).json({ message: 'No interview associated with this id!' });
            return;
        }
        res.json(dbInterviewData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE remove Interview route
router.delete('/:id', withAuth, (req, res) => {
    Interview.destroy({
        where: { id: req.params.id }
    })
    .then(dbInterviewData => {
        if (!dbInterviewData) {
            res.status(404).json({ message: 'No interview matches this query!' });
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