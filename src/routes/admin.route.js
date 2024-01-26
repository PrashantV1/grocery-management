const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const  validate  = require('../middleWare/inputValidator');
const adminActionValidator = require('../schema/adminSchema');



router.post('/addgroceryItem',validate(adminActionValidator.addGroceryItem), adminController.addGroceryItem);
router.post('/removeGrocery',validate(adminActionValidator.removeGroceryItem), adminController.removeGroceryItem);
router.post('/updateGroceryItem',validate(adminActionValidator.updateGroceryItem), adminController.updateGroceryItem);

module.exports = router;
