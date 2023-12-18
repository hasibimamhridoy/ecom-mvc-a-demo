const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const { defaultUserImagePath } = require('../../secret')
const createError = require('http-errors')
const { default: mongoose } = require('mongoose')


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minlength: [6, 'User name can be minimum 31 charecters'],
        maxlength: [31, 'User name can be maxium 31 charecters']
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function () {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            },
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minlength: [6, 'User password can be minimum 6 charecters'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    image: {
        type: String,
        default: defaultUserImagePath
    },
    address: {
        type: String,
        required: [true, 'User address is required'],
    },
    phone: {
        type: String,
        required: [true, 'User phone number is required'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })



userSchema.query = {

    adminSearchUserFilter: function (searchValue) {

        const searchRegExp = new RegExp(".*" + searchValue + ".*", "i")

        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ]
        }

        const options = { password: 0 }

        return this.find(filter).select(options)

    },

    pagination: function (page, limit) {

        const skip = ((page - 1) * limit)
        return this.limit(limit).skip(skip)
    },

}

userSchema.statics = {

    countUserMethod: function (searchValue) {

        const searchRegExp = new RegExp(".*" + searchValue + ".*", "i")
        console.log(searchRegExp);
        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ]
        }

        const options = { password: 0 }

        return this.find(filter).select(options).countDocuments()

    },

}


const User = model("User", userSchema)

module.exports = User