const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');
const seedJobs = require('./job-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('seeeeeeeeeeeeeeed');
    await seedUsers();
    console.log('Ussssssssssssseeeerrrrrrrrsssssss');
    await seedJobs();
    console.log('JJJJJJJOOOOOOOBBBBBSSSSSS');

    process.exit(0);
};

seedAll();