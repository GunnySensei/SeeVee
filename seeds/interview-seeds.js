const { Interview } = require('../models');

const interviewData = [
    {
        company: 'bootscoot',
        title: 'They told me to get nekkid.',
        description: 'I dont like doing that in front of everbody!',
        user_id: 1
    },
    {
        company: 'hillbilly hackers',
        title: 'They said I had a pretty mouth.',
        description: 'I told them I know how to use it too!',
        user_id: 2
    }
];

const seedInterview = () => Interview.bulkCreate(interviewData);

module.exports = seedInterview;