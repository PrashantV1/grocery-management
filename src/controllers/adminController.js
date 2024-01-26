
const adminService = require('../services/adminService');
const { serviceHandler } = require('../utils/serviceHandler');


const adminController={
   addGroceryItem : async (req, res) => {
        const addItem=adminService.addGroceryItem(req.body);
        serviceHandler(addItem,res);
    },
    
   removeGroceryItem : async (req, res) => {
        const response=adminService.removeGroceryItem(req.body)
        serviceHandler(response,res);
    },
    
   updateGroceryItem : async (req, res) => {
        const updateResponse=adminService.updateGroceryItem(req.body);
        serviceHandler(updateResponse,res);
    }
}


module.exports = adminController;
