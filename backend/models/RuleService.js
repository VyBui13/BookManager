const Rule = require('../schema/Rule');

class RuleService {
    async getRules() {
        try {
            const rules = await Rule.find();
            if (rules.length === 0) {
                return {
                    status: 'error',
                    message: 'No rules found',
                };
            }
            const data = rules[0];
            return {
                status: 'success',
                message: 'Get all rules successfully',
                data: data,
            };
        }
        catch (err) {
            return {
                status: 'error',
                message: err.message,
            };
        }
    }

    async updateRule({ minInputBook, maxStoredBook, minStoredAfterSelling, maxBoughtBook, allowDebt }) {
        try {
            await Rule.deleteMany();
            const rule = new Rule({
                minInputBook,
                maxStoredBook,
                minStoredAfterSelling,
                maxBoughtBook,
                allowDebt,
            });
            await rule.save();
            return {
                status: 'success',
                message: 'Rule is updated successfully',
            };
        }
        catch (err) {
            return {
                status: 'error',
                message: err.message,
            };
        }
    }
}

module.exports = new RuleService;