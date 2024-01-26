const express = require('express');
const admin = require('./admin.route');
const login = require('./login.route');
const AuthService = require('../middleWare/authMiddleWare');
const customer = require('./customer.route')
const grocery=require('./grocery.route')
const router = express.Router();

const defaultRoutes = [
  {
    path: '/admin',
    route: admin,
    tokenVerify: AuthService.verifyToken,
    roleVerify: AuthService.checkRole(['admin'])
  },
  {
    path: '/customer',
    route: customer,
    tokenVerify: AuthService.verifyToken,
    roleVerify: AuthService.checkRole(['user'])
  },
  {
    path: '/grocery',
    route: grocery,
    tokenVerify: AuthService.verifyToken,
    roleVerify: AuthService.checkRole(['user','admin'])
  },
];


router.use('/', login)

defaultRoutes.forEach((route) => {
  router.use(route.path, route.tokenVerify, route.roleVerify, route.route);
});



module.exports = router;