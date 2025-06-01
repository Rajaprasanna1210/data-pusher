const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

// CRED for Destinations
router.post('/create_destination', destinationController.createDestination);
router.get('/get_all_destinations', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);
router.put('/update_destination/:id', destinationController.updateDestination);
router.delete('/delete/:id', destinationController.deleteDestination);

// Get all destinations for a specific account
router.get('/account/:accountId', destinationController.getDestinationsByAccountId);

module.exports = router;
