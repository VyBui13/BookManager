const Rule = require('./schema/Rule');

async function seedRule() {
    await Rule.deleteMany({});

    const newRule = new Rule({
        minInputBook: 150,
        maxStoredBook: 200,
        minStoredAfterSelling: 20,
        maxBoughtBook: 10,
        allowDebt: true,
    });

    await newRule.save();
    console.log('Rule seeded');
}

module.exports = { seedRule };