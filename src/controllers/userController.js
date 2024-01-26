
const userService = require('../services/userService');
const { serviceHandler } = require('../utils/serviceHandler');


const userController={
    signUp:async (req, res) => {
        const user=userService.signUp(req.body);
        serviceHandler(user,res);
    },

    login:async (req, res) => {
        const user=userService.login(req.body);
        serviceHandler(user,res);
    },
    
    changeRole:async (req, res) => {
        const user=userService.changeRole(req.body);
        serviceHandler(user,res);
    },
  
  
}


module.exports = userController;
