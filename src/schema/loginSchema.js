const Joi = require("joi");


const LoginValidator={
    signUp : {
        body: {
          email: Joi.string().required().email(),
          name: Joi.string().required(),
          password: Joi.string().required(),
        }
      },

      login : {
        body: {
          email: Joi.string().required().email(),
          password: Joi.string().required(),
        }
      },

      changeRole : {
        body: {
          email: Joi.string().required().email(),
          role: Joi.string().valid("user","admin").required(),
        }
      },
}

module.exports=LoginValidator;
