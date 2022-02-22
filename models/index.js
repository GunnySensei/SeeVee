const User = require('./user');
const Code = require('./code');
const Job = require('./job');

User.hasMany(Job);

Job.belongsTo(User, {
    foreignKey: 'user_id'
});




module.exports = { User, Code, Job };