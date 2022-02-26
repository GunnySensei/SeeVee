const User = require("./user");
const Code = require("./code");
const Job = require("./job");
const Comment = require("./comment");
const Interview = require("./interview");
const Vote = require("./vote");

// User associations
User.hasMany(Code);

User.hasMany(Job);

User.hasMany(Interview);

User.hasMany(Comment, {
  foreignKey: "user_id",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

User.belongsToMany(Code, {
  through: Comment,
  as: "user_code",
  foreignKey: "user_id",
});

User.belongsToMany(Job, {
  through: Comment,
  as: "user_job",
  foreignKey: "user_id",
});

User.belongsToMany(Interview, {
  through: Comment,
  as: "user_interview",
  foreignKey: "user_id",
});

// Code associations
Code.belongsTo(User, {
  foreignKey: "user_id",
});

Code.belongsToMany(User, {
  through: Comment,
  as: "code_comment",
  foreignKey: "code_id",
});

Code.hasMany(Comment, {
  foreignKey: "code_id",
});

Code.hasMany(Vote, {
  foreignKey: "code_id",
});

// Job associations
Job.belongsTo(User, {
  foreignKey: "user_id",
});

Job.belongsToMany(User, {
  through: Comment,
  as: "job_comment",
  foreignKey: "job_id",
});

Job.hasMany(Comment, {
  foreignKey: "job_id",
});

Job.hasMany(Vote, {
  foreignKey: "job_id",
});

// Interview associations
Interview.belongsTo(User, {
  foreignKey: "user_id",
});

// Interview.belongsToMany(User, {
//     through: Comment,
//     as: 'interview_comment',
//     foreignKey: 'interview_id'
// });

Interview.hasMany(Comment, {
  foreignKey: "interview_id",
});

Interview.hasMany(Vote, {
  foreignKey: "interview_id",
});

// Comment associations
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Code, {
  foreignKey: "code_id",
});

Comment.belongsTo(Job, {
  foreignKey: "job_id",
});

Comment.belongsTo(Interview, {
  foreignKey: "interview_id",
});

// Vote associations
// Code
User.belongsToMany(Code, {
  through: Vote,
  as: "voted_codes",
  foreignKey: "user_id",
});

Code.belongsToMany(User, {
  through: Vote,
  as: "voted_codes",
  foreignKey: "code_id",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Code, {
  foreignKey: "code_id",
});

// Job
User.belongsToMany(Job, {
  through: Vote,
  as: "voted_jobs",
  foreignKey: "user_id",
});

Job.belongsToMany(User, {
  through: Vote,
  as: "voted_jobs",
  foreignKey: "job_id",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Job, {
  foreignKey: "job_id",
});

// Interview
User.belongsToMany(Interview, {
  through: Vote,
  as: "voted_interviews",
  foreignKey: "user_id",
});

Interview.belongsToMany(User, {
  through: Vote,
  as: "voted_interviews",
  foreignKey: "interview_id",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Interview, {
  foreignKey: "interview_id",
});

module.exports = { User, Code, Job, Comment, Interview, Vote };
