const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all Comment route
router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(418).json(err);
    })
});



// POST new Comment route
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            code_id: req.body.code_id,
            job_id: req.body.job_id,
            interview_id: req.body.interview_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

// DELETE remove Comment route
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;