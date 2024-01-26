const jwt = require('jsonwebtoken');
const config = require('../appConfig/config');
const { ExtractJwt } = require('passport-jwt');
const ApiError = require('../utils/apiError');
const { errorHandler } = require('../utils/serviceHandler');
const UserService = require('../services/userService');




const AuthService = {
    verifyToken: async(req, res, next) => {
        try {
            const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
            if (!token) {
                throw new ApiError(401, 'No Token Found');
            }
        
            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(token, config.jwt.secret, (err, decoded) => {
                    if (err) {
                        reject({statusCode:401,message:'Invalid Token'});
                    } else {
                        resolve(decoded);
                    }
                });
            });
        
            const user = await UserService.getUser(decoded.sub);
            if (!user) {
                throw new ApiError(401, 'Invalid User Token');
            }
        
            req.user = user.dataValues;
            next();
        } catch (err) {
            return errorHandler(err, res);
        }
    },

    checkRole: (accessibleToRoles) => function (req, res, next) {
        try {
            if (!accessibleToRoles.length) {
                next();
                return;
            }
            const user = req.user;
            if (!user.role || !accessibleToRoles.includes(user.role)) {
                throw new ApiError(403, 'Forbidden Request');
            }
            next();
        }
        catch (err) {
            return  errorHandler(err, res);
        }

    },
}


module.exports = AuthService;

