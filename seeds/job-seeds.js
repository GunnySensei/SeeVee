const { Job } = require('../models');

const jobData = [
    {
        company_name: 'mojo',
        title: 'engineer',
        description: 'Engineer some stuff',
        location: 'Your moms',
        job_url: 'yourmom.com',
        user_id: 2
    },
    {
        company_name: 'mojos',
        title: 'broomer',
        description: 'clean some stuff',
        location: 'Your moms',
        job_url: 'yourmom.com',
        user_id: 1
    }
];

const seedJobs = () => Job.bulkCreate(jobData);

module.exports = seedJobs;