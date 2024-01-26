

const commonGroceryService = require('../services/grocery.service');
const { serviceHandler } = require('../utils/serviceHandler');


const groceryController={
    viewGroceryItems : async (req, res) => {
        const groceryItems = commonGroceryService.viewGroceryItems()
        serviceHandler(groceryItems,res);
    },

    viewSingleItem:async (req, res) => {
        const {id}=req.params
        const groceryItems = commonGroceryService.getSingleGrocery(id)
        serviceHandler(groceryItems,res);
    },
    
}


module.exports = groceryController;
