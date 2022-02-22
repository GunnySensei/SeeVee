const seedUsers = require('./user-seeds');
const seedCodes = require('./code-seeds');
const seedJobs = require('./job-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('seeeeeeeeeeeeeeed');
    await seedUsers();
    console.log('Ussssssssssssseeeerrrrrrrrsssssss');
    await seedCodes();
    console.log('Coooooo00000000ooooddde');
    await seedJobs();
    console.log('JJJJJJJOOOOOOOBBBBBSSSSSS');
    await seedComments();
    console.log('CoooooOOOOOOOOMMMEEEEEEEEEENTSSSSSSSSSSSSSSSS');

    process.exit(0);
};

seedAll();