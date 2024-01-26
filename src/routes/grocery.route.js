const express = require('express');
const router = express.Router();
const groceryController = require('../controllers/groceryController');
const singleGrocery = require('../schema/grocerySchema');
const  validate  = require('../middleWare/inputValidator');

router.get('/viewItems', groceryController.viewGroceryItems);
 router.get('/viewItems/:id',validate(singleGrocery), groceryController.viewSingleItem);

module.exports = router;
