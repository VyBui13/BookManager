const { seedBook } = require('./seedBook');
const { seedUser } = require('./seedUser');
const { seedRule } = require('./seedRule');
const { resetdb } = require('./resetdb');

async function seed() {
    await resetdb();
    console.log('\x1b[1;31mSeeding database...');

    try {
        await Promise.all([
            seedBook(),
            seedUser(),
            seedRule()
        ]);
    } finally {
        console.log('\x1b[1;32mDatabase seeded');
        console.log('\x1b[1;34m....................................................\x1b[0;0m');
    }
}

module.exports = { seed };
