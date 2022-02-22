const User = require('./user');
const Post = require('./post');
const Job = require('./job');

User.hasMany(Job);

Job.belongsTo(User, {
    foreignKey: 'user_id'
});




module.exports = { User, Post, Job };