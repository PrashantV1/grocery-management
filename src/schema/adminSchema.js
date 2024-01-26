const Joi = require("joi");


const adminActionValidator = {
    addGroceryItem: {
        body: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            inventory: Joi.number().required(),
        }
    },

    removeGroceryItem: {
        body: {
            itemId: Joi.number().required()
        }
    },

    updateGroceryItem: {
        body: {
            itemId: Joi.number().required(),
            updateItems: Joi.object().keys({
                name: Joi.string(),
                price: Joi.number(),
                inventory: Joi.number(),
            }).or('name', 'price', 'inventory').required(),
        }
    }
}

module.exports = adminActionValidator;
