const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../secret');
const createError = require('http-errors')
const verifyTokenForActiveAcc = async (req, next, model) => {

    try {
        const token = req.body.token;
        if (!token) throw createError(404, "token not found");
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        if (!decoded?.data) throw createError(404, "User register failed. ERROR FROM : verifyTokenForActiveAcc ");
        const userExists = await model.exists({ email: decoded?.data?.email })

        if (!userExists) {
            if (decoded?.data) await model.create(decoded.data)
        } else {
            throw createError(401, "Already account registered. Please Login Your Account.")
        }



    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw createError(401, "Token Expired: verifyTokenForActiveAcc ")
        } 
        else if (error.name === "JsonWebTokenError") {
            throw createError(401, "Invalid Token")
        } else {
            throw error
        }
    }


}

module.exports = verifyTokenForActiveAcc