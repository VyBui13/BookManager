const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
    minInputBook: {
        type: Number,
        default: 150,
    },

    maxStoredBook: {
        type: Number,
        default: 200,
    },

    minStoredAfterSelling: {
        type: Number,
        default: 20,
    },

    maxBoughtBook: {
        type: Number,
        default: 10,
    },

    allowDebt: {
        type: Boolean,
        default: true,
    },
});

const Rule = mongoose.model('Rule', RuleSchema);
module.exports = Rule;
