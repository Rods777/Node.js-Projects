const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes

// Create, Retrieve, Update, Delete (CRUD Operations)

router.get('/', userController.view); // Retrieves Data
router.post('/', userController.find); // Searches/Finds Data from the HTML form with method = POST
router.get('/adduser', userController.add) // Routes to Add User page
router.post('/adduser', userController.create); // Create Data
router.get('/edituser/:id', userController.edit) // Routes to Add User page
router.post('/edituser/:id', userController.update); // Create Data
router.get('/:id', userController.delete); // Delete Data
router.get('/viewuser/:id', userController.viewUser); // Retrieves Data

module.exports = router;