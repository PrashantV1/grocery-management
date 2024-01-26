const Joi = require('joi');

const singleGrocery = {
    params: {
        id: Joi.number().required(),
    }
};


module.exports = singleGrocery;