const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();
const  validate  = require('../middleWare/inputValidator');
const bookGrocery = require('../schema/customerSchema');


 router.post('/book',validate(bookGrocery), customerController.bookGrocery);


module.exports = router;
