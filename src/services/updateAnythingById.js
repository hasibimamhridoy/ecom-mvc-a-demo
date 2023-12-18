const mongoose = require("mongoose")
const createError = require('http-errors')
const { findAnythingById } = require("./findAnythingById")

const updateAnythingById = async (req,model,next) => {

    const query = { _id: req.params.id }
    const updateSet = {
        $set: req.body.updateInfo
    }

    try {
        const singleItem = await model.updateOne(query,updateSet)

        if (singleItem.matchedCount) {
            return singleItem
        } else {
            throw next(createError(404, `No ${model.modelName} found with this id`))
        }


    } catch (error) {

        throw next(createError(404, `No ${model.modelName} found with this id`))
        
    }

}

module.exports = { updateAnythingById }