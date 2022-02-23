const User = require('./user');
const Code = require('./code');
const Job = require('./job');
const Comment = require('./comment');
const Interview = require('./interview');

// User associations
User.hasMany(Code);

User.hasMany(Job);

User.hasMany(Comment);

User.belongsToMany(Code, {
    through: Comment,
    as: 'user_code',
    foreignKey: 'user_id'
});

User.belongsToMany(Job, {
    through: Comment,
    as: 'user_job',
    foreignKey: 'user_id'
});

User.hasMany(Interview);

// Code associations
Code.belongsTo(User, {
    foreignKey: 'user_id'
});

Code.belongsToMany(User, {
    through: Comment,
    as: 'code_comment',
    foreignKey: 'code_id'
});

Code.hasMany(Comment);

// Job associations
Job.belongsTo(User, {
    foreignKey: 'user_id'
});

Job.belongsToMany(User, {
    through: Comment,
    as: 'job_comment',
    foreignKey: 'job_id'
})

Job.hasMany(Comment);

// Interview associations
Interview.belongsTo(User);

// Comment associations
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Code, {
    foreignKey: 'code_id'
});

Comment.belongsTo(Job, {
    foreignKey: 'job_id'
});




module.exports = { User, Code, Job, Comment };
