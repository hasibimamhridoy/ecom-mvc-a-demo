const jwt = require('jsonwebtoken');
require('dotenv')
const { JWT_SECRET_KEY } = require('../../secret');


const createJSONWebToken = (payload, secretKey, expiresIn) => {

    if (typeof payload !== 'object' || !payload) {
        throw new Error('Payload must be a non-empty object.Error From : createJSONWebToken Function')
    }

    if (typeof secretKey !== 'string' || secretKey === '') {
        throw new Error('Secret key must be a non-empty string.Error From : createJSONWebToken Function')
    }

    try {
        const token = jwt.sign({
            data: payload
        }, secretKey, { expiresIn })
        return token
    } catch (error) {
        console.log('failed to sign the JWT.Error From : createJSONWebToken Function', error);
        throw error
    }
}

module.exports = createJSONWebToken