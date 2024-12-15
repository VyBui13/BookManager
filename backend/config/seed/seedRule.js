const Rule = require('../../schema/Rule');

async function seedRule() {

    const newRule = new Rule({
        minInputBook: 150,
        maxStoredBook: 200,
        minStoredAfterSelling: 20,
        maxBoughtBook: 10,
        allowDebt: true,
    });

    await newRule.save();
}

module.exports = { seedRule };