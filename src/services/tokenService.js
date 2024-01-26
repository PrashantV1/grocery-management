const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../appConfig/config');
const ApiError = require('../utils/apiError');
const logger = require('../appConfig/logger');



const TokenService = {
    generateAuthToken:  (user, tokenFor = 'admin') => {
        try{
            const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
            const secret = config.jwt.secret;
            const accessToken = TokenService.generateToken(user.email, accessTokenExpires, 'access', tokenFor, secret);
            return {
                access: {
                    token: accessToken,
                    expires: accessTokenExpires.toDate(),
                }
            };
        }catch(err){
            logger.error(err)
            throw new ApiError(500,'Error in generating token')
        }

    },
    generateToken: (email, expires, type, tokenFor, secret) => {
        const payload = {
            sub: email,
            iat: moment().unix(),
            exp: expires.unix(),
            type,
            tokenFor,
        };
        return jwt.sign(payload, secret);
    }
}



module.exports = TokenService;

