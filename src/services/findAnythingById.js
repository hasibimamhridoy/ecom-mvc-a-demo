const mongoose = require("mongoose")
const createError = require('http-errors')

const findAnythingById = async (id, model,next,options = {}) => {

    try {
        const singleItem = await model.findById(id, options)

        if (singleItem) {
            return singleItem
        } else {
            throw createError(404, `No ${model.modelname} found with this id`)
        }


    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(createError(404, `No ${model.modelName} found with this id`))
        }
    }

}

module.exports = { findAnythingById }