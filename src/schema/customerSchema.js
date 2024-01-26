const Joi = require('joi');

const bookGrocery = {
    body: {
        orderDetails: Joi.array().items(
            Joi.object().keys({
                grocery: Joi.number().required(),
                quantity: Joi.number().required(),
            })
        ).required(),
    }
};


module.exports = bookGrocery;