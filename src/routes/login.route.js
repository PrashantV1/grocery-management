const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const  validate  = require('../middleWare/inputValidator');
const loginSchema = require('../schema/loginSchema');
const AuthService = require('../middleWare/authMiddleWare');


 router.post('/login',validate(loginSchema.login), userController.login);
router.post('/signup',validate(loginSchema.signUp), userController.signUp);
 router.post('/changeRole',validate(loginSchema.changeRole),AuthService.verifyToken,AuthService.checkRole(['admin']), userController.changeRole);

module.exports = router;
