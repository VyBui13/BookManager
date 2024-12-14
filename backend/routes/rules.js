const express = require('express');
const router = express.Router();

const RuleController = require('../controllers/RuleController');

router.post('/', RuleController.updateRules);
router.get('/', RuleController.getRules);

module.exports = router;