const User = require('./user');
const Post = require('./post');
const Job = require('./job');
const Interview = require('./interview');

User.hasMany(Job);

Job.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Interview);

Interview.belongsTo(User);




module.exports = { User, Post, Job, Interview };