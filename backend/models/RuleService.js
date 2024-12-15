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

    async checkRules({ currentAmount, amountInputBook, amountBoughtBook }) {
        try {
            const rules = await Rule.find();
            if (rules.length === 0) {
                return {
                    status: 'warning',
                    message: 'No rules found',
                };
            }
            const rule = rules[0];
            if (amountInputBook) {
                if (currentAmount > rule.maxStoredBook) {
                    return {
                        status: 'warning',
                        message: `Maximum stored book is ${rule.maxStoredBook}`,
                    };
                }

                if (amountInputBook < rule.minInputBook) {
                    return {
                        status: 'warning',
                        message: `Minimum input book is ${rule.minInputBook}`,
                    };
                }
            }



            if (amountBoughtBook) {
                if (amountBoughtBook < currentAmount) {
                    return {
                        status: 'error',
                        message: `Amount bought book must be greater than current amount`,
                    };
                }

                if (amountBoughtBook > rule.maxBoughtBook) {
                    return {
                        status: 'warning',
                        message: `Maximum bought book is ${rule.maxBoughtBook}`,
                    };
                }

                if (currentAmount - amountBoughtBook < rule.minStoredAfterSelling) {
                    return {
                        status: 'warning',
                        message: `Minimum stored after selling is ${rule.minStoredAfterSelling}`,
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