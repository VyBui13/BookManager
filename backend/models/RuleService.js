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

    async checkRules({ minInputBook, maxStoredBook, minStoredAfterSelling, maxBoughtBook, allowDebt }) {
        try {
            const rules = await Rule.find();
            if (rules.length === 0) {
                return {
                    status: 'error',
                    message: 'No rules found',
                };
            }
            const rule = rules[0];
            if (minInputBook) {
                if (minInputBook < rule.minInputBook) {
                    return {
                        status: 'error',
                        message: `Minimum input book is ${rule.minInputBook}`,
                    };
                }
            }

            if (maxStoredBook) {
                if (maxStoredBook > rule.maxStoredBook) {
                    return {
                        status: 'error',
                        message: `Maximum stored book is ${rule.maxStoredBook}`,
                    };
                }
            }

            if (minStoredAfterSelling) {
                if (minStoredAfterSelling < rule.minStoredAfterSelling) {
                    return {
                        status: 'error',
                        message: `Minimum stored after selling is ${rule.minStoredAfterSelling}`,
                    };
                }
            }

            if (maxBoughtBook) {
                if (maxBoughtBook > rule.maxBoughtBook) {
                    return {
                        status: 'error',
                        message: `Maximum bought book is ${rule.maxBoughtBook}`,
                    };
                }
            }

            if (allowDebt) {
                if (allowDebt !== rule.allowDebt) {
                    return {
                        status: 'error',
                        message: `Allow debt is ${rule.allowDebt}`,
                    };
                }
            }
            return {
                status: 'success',
                message: 'All rules are valid',
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