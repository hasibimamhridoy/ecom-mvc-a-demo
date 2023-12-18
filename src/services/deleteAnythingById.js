const mongoose = require("mongoose")
const createError = require('http-errors')

const deleteAnythingById = async (req, model,next) => {
    const id = req.params.id
    try {
        const singleItem = await model.deleteOne({_id :id})

        if (singleItem.deletedCount) {
            return singleItem
        } else {
            throw next(createError(404, `No ${model.modelName} found with this id`))
        }


    } catch (error) {
       
        throw next(createError(404, `No ${model.modelName} found with this id`))

    }

}

module.exports = { deleteAnythingById }