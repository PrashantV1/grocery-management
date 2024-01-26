const logger = require("../appConfig/logger");
const GroceryItem = require("../models/groceryItem");
const ApiError = require("../utils/apiError");
const commonGroceryService = require("./grocery.service");

const adminService = {
  addGroceryItem: async (payload) => {
    try {
      const { name, price, inventory } = payload;
      const newGroceryItem = await GroceryItem.create({
        name,
        price,
        inventory,
      });
      return newGroceryItem;
    } catch (error) {
      throw new ApiError(500, error);
    }
  },

  removeGroceryItem: async (payload) => {
    try {
      const {itemId} = payload ;
      const checkIfExists= commonGroceryService.getSingleGrocery(itemId);

      const deleteItem= GroceryItem.destroy({
        where: { id: itemId },
      });
      await Promise.all([checkIfExists,deleteItem]);

      return { message: "Grocery item deleted successfully" };
    } catch (error) {
      logger.error(error);
      throw new ApiError(error.statusCode||500, error.errorMsg||"Internal Server Error");
    }
  },

  updateGroceryItem: async (payload) => {
    try {
      const { itemId, updateItems } = payload;
      const checkIfExists= commonGroceryService.getSingleGrocery(itemId);
     const updateItem=  GroceryItem.update(updateItems, {
        where: { id: itemId },
      });
 
      await Promise.all([checkIfExists,updateItem]);

      return { message: "Grocery item updated successfully" };
    } catch (error) {
      logger.error(error);
      throw new ApiError(error.statusCode||500, error.errorMsg||"Internal Server Error");
    }
  },
};

module.exports = adminService;
