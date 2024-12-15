const RuleService = require('../models/RuleService');
const BookService = require('../models/BookService');
class RuleController {
    async getRules(req, res) {
        try {
            const rules = await RuleService.getRules();
            res.status(200).json(rules);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message,
            });
        }
    }

    async updateRules(req, res) {
        try {
            const { minInputBook, maxStoredBook, minStoredAfterSelling, maxBoughtBook, allowDebt } = req.body;
            await RuleService.updateRule({ minInputBook, maxStoredBook, minStoredAfterSelling, maxBoughtBook, allowDebt });
            res.status(200).json({
                status: 'success',
                message: 'Rule is updated successfully',
            });
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message,
            });
        }
    }

    async checkRules(req, res) {
        try {
            const { bookName, bookKind, bookAuthor, amountInputBook, amountBoughtBook } = req.body;
            const currentAmount = await BookService.getAmountBook({ bookName, bookKind, bookAuthor });
            const result = await RuleService.checkRules({ currentAmount: currentAmount.data, amountInputBook, amountBoughtBook });
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message,
            });
        }
    }
}

module.exports = new RuleController;