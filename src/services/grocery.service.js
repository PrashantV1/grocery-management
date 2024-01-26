const logger = require('../appConfig/logger');
const GroceryItem = require('../models/groceryItem');
const ApiError = require('../utils/apiError');

const commonGroceryService={

    getSingleGrocery : async (id) => {
        try {
          const groceryItem = await GroceryItem.findByPk(id);
      
          if (!groceryItem) {
            throw new ApiError(404, 'Grocery item not found');
          }
      
          return groceryItem.dataValues;
        } catch (error) {
          logger.error(error);
          throw new ApiError(error.statusCode||500, error.errorMsg||"Internal Server Error");
        }
      },
    
    
      viewGroceryItems: async () => {
        try {
          const groceryItems = await GroceryItem.findAll();
          return(groceryItems);
        } catch (error) {
          logger.error(error);
          throw new ApiError(error.statusCode||500, error.errorMsg||"Internal Server Error");
        }
      },

      updateInventory: async (inventory,itemId,transaction) => {
        try {

          await GroceryItem.update({ inventory }, {
            where: { id: itemId },
            transaction
          });
        
        } catch (error) {
          logger.error(error);
          throw new ApiError(error.statusCode||500, error.errorMsg||"Internal Server Error");
        }
      },
}



module.exports = commonGroceryService;
