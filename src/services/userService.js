const Users = require("../models/users");
const ApiError = require("../utils/apiError");
const { genRandom } = require("../utils/random");
const { encrypt512 } = require("../utils/sha");
const TokenService = require('./tokenService');

const UserService = {
  signUp: async (payload) => {
    const { email, password, name } = payload;
    if (await UserService.getUser(email)) {
      throw new ApiError(400, 'Email already taken');
    }
    if (!password.match(/\d/) || !password.match(/[a-zA-Z]/)) {
      throw new ApiError(400, 'Password must contain at least one letter and one number');
    }


    const salt = genRandom(email.toUpperCase().substr(0, 3), name.length);
    const userBody = {
      email, name, salt, password: encrypt512(password, salt), role: 'user'
    }
    await Users.create(userBody);
    return {
      success: true,
      message: 'User Created'
    };
  },

  login: async (payload) => {
    const { email, password } = payload;
    const user = await UserService.getUser(email)
    if (!user)
      throw new ApiError(404, 'User not found');

    const hashPassword = encrypt512(password, user.salt)
    if (hashPassword !== user.password)
      throw new ApiError(400, 'Invalid Password');

    const token = TokenService.generateAuthToken(user.dataValues, user.role);
    return token;


  },
  changeRole: async (payload) => {
    const { email, role } = payload;
    const user = await UserService.getUser(email)
    if (!user)
      throw new ApiError(404, 'User not found');

      await Users.update({ role }, {
        where: { email }
      });
      
    return {
      success:true
    };


  },


  getUser: async (email) => {
    return await Users.findOne({
      where: {
        email: email
      }
    });
  }

};

module.exports = UserService;
