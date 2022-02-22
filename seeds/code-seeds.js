const { Code } = require('../models');

const codeDate = [
    {
        title: 'Code challenge.',
        code_url: 'https://cssbattle.dev/',
        user_id: 1
    },
    {
        title: 'H4cK1Ng ch4ll3Ng3: Back end GET routes...',
        code_url: 'https://www.youtube.com/',
        user_id: 2
    },
];

const seedCodes = () => Code.bulkCreate(codeDate);

module.exports = seedCodes;