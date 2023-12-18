var createError = require('http-errors')
const { errorResponse } = require('../../controllers/responseController')

const routeErrorHandler = (req,res,next)=>{
    next(createError(404,"Your requested content was not found"))
}

const defaultErrorHandler = (err,req,res,next)=>{
    
    return errorResponse(res,{
        statusCode : err.status,
        message : err.message
    })

}

module.exports = {routeErrorHandler,defaultErrorHandler}