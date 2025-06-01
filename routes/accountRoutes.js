const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// CRED for Account
router.post('/', accountController.createAccount);
router.get('/get_all_accounts', accountController.getAllAccounts);
router.get('/:accountId', accountController.getAccountById);
router.put('/:accountId', accountController.updateAccount);
router.delete('/:accountId', accountController.deleteAccount);

module.exports = router;
