const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'Have a good time on the site!',
        user_id: 1,
        code_id: null,
        job_id: 1
    },
    {
        comment_text: 'hahaha!!!!!!',
        user_id: 2,
        code_id: 1,
        job_id: null
    },
    {
        comment_text: "what's your sign, homie?",
        user_id: 2,
        code_id: null,
        job_id: 1
    },
    {
        comment_text: 'better to be safe than sorry',
        user_id: 1,
        code_id: 2,
        job_id: null
    },
    {
        comment_text: 'Guess what? Butt!',
        user_id: 2,
        code_id: null,
        job_id: 1
    },
    {
        comment_text: "what's ur mom's number lol",
        user_id: 1,
        code_id: 2,
        job_id: null
    },
    {
        comment_text: 'FAKE',
        user_id: 2,
        code_id: null,
        job_id: 1
    },

    {
        comment_text: "if u want some real advice, i know a great therapist who also owns a pizzeria. his name's howard and he's a really great doctor! worked wonders on me and my husband with our divorce",
        user_id: 1,
        code_id: null,
        job_id: 2
    },
    {
        comment_text: 'this sucks ass',
        user_id: 1,
        code_id: 2,
        job_id: null
    },
    {
        comment_text: 'gg!',
        user_id: 2,
        code_id: null,
        job_id: 1
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;