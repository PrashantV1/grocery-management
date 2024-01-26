const sequelize = require("../appConfig/dbConfig");
const logger = require("../appConfig/logger");
const GroceryOrders = require("../models/groceryOrders");
const ApiError = require("../utils/apiError");
const commonGroceryService = require("./grocery.service");


const customerService = {

  bookGrocery: async (payload) => {
    const transaction = await sequelize.transaction();
    try {

      const { user, items } = payload;
      let totalPrice = 0;
      const inventoryPromiseArr = []

      for (let i = 0; i < items.length; i++) {
        const { grocery, quantity } = items[i];
        const groceryData = await commonGroceryService.getSingleGrocery(grocery);
        if (groceryData.inventory < quantity) {
          throw new ApiError(400, `Stock is less for ${groceryData.name}`);
        }

        totalPrice += groceryData.price * quantity;

        await commonGroceryService.updateInventory(groceryData.inventory - quantity, grocery, transaction);
      };

      await Promise.all(inventoryPromiseArr);
      const orderDetails = await GroceryOrders.create(
        {
          userId: user.id,
          amount: totalPrice,
          items,
        },
        { transaction }
      );

      await transaction.commit();

      return {
        totalPrice,
        orderId: orderDetails.id,
      };
    } catch (err) {
      if (transaction)
        await transaction.rollback();
      logger.error(err)
      throw new ApiError(400, err.errorMsg || 'Error while placing order');
    }
  }

}



module.exports = customerService;
