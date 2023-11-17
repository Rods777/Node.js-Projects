const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes

// Create, Retrieve, Update, Delete (CRUD Operations)

router.get('/', userController.view); // Retrieves Data
router.post('/', userController.find); // Searches/Finds Data from the HTML form with medthod = POST

module.exports = router;