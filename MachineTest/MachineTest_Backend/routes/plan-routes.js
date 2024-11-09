const express = require('express');
const router = express.Router();
const planController = require('../controllers/plan-controller'); // Adjust the path as necessary

// Route to create a new membership plan
router.post('/', planController.createPlan);

// Route to get all membership plans
router.get('/', planController.getPlans);

// Route to get a specific membership plan by ID
router.get('/:id', planController.getPlanById);

// Route to update a specific membership plan by ID
router.patch('/:id', planController.updatePlan);

// Route to delete a specific membership plan by ID
router.delete('/:id', planController.deletePlan);

module.exports = router;