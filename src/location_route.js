const express = require('express');

const router = express.Router();
const LocationController = require('./location_controller.js');

router.post('/', LocationController.addLocation)
router.get('/all', LocationController.getAllLocations)
router.delete('/:id', LocationController.deleteLocation)
router.get('/:id', LocationController.getLocation)
router.put('/:id', LocationController.updateLocation)
router.put('/:id/addDevice', LocationController.addDeviceToLocation);

module.exports = router;