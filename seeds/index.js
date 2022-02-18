const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('seeeeeeeeeeeeeeed');
    await seedUsers();
    console.log('Ussssssssssssseeeerrrrrrrrsssssss');

    process.exit(0);
};

seedAll();