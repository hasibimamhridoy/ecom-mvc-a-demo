var createError = require('http-errors')
const User = require('../models/userModel');
const { count, error } = require('console');
const { successResponse } = require('./responseController');
const { default: mongoose } = require('mongoose');
const { findAnythingById } = require('../services/findAnythingById');
const { deleteAnythingById } = require('../services/deleteAnythingById');
const { options } = require('../routers/usersRouter');
const { updateAnythingById } = require('../services/updateAnythingById');
const deleteImage = require('../helper/deleteImage');
const jwt = require('jsonwebtoken');
const createJSONWebToken = require('../helper/jsonwebtoken');
const { JWT_SECRET_KEY, CLIENT_SITE_URL } = require('../../secret');
const sendEmailWithNodeMailer = require('../helper/email');
const verifyTokenForActiveAcc = require('../helper/verifyTokenForActiveAcc');



//get all the user with pagination
const getUsers = async (req, res, next) => {

    try {

        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const users = await User.find().adminSearchUserFilter(search).pagination(page, limit)
        const countUser = await User.countUserMethod(search)
        if (!users) throw createError(404, "No users found")

        return successResponse(res, {
            payload: {
                pagination: {
                    totalUser: countUser,
                    totalPages: Math.ceil(countUser / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(countUser / limit) ? page + 1 : null

                },

                users,
            }
        })

    } catch (error) {
        next(error)
    }

}

//get single user findById
const getUser = async (req, res, next) => {
    const id = req.params.id
    const options = { password: 0 }
    try {

        const singleUser = await findAnythingById(id, User, next, options)
        return successResponse(res, {
            payload: {
                singleUser
            }
        })

    } catch (error) {

        next(error)
    }
}

//delete single user findById
const deleteUser = async (req, res, next) => {

    try {
        const user = await findAnythingById(req.params.id, User, next)
        const result = await deleteAnythingById(req, User, next)
        const userImagePath = user?.image;

        //async way to deleted user image
        deleteImage(userImagePath)

        //this is the promises resolve pattern way
        // fs.access(userImagePath)
        // .then(()=>fs.unlink(userImagePath))
        // .then(()=>console.log('user image was deleted'))
        // .catch((err)=>console.error("User image does not exits"))


        // this is the callback pattern way
        // fs.access(userImagePath,(err)=>{
        //     if (err) {
        //         console.error("User image does not exits");
        //     } else {
        //         fs.unlink(userImagePath , (err)=>{
        //             if (err) {
        //                 throw createError(404,"User image does not exits")
        //             } else {
        //                 console.log('user image was deleted');
        //             }
        //         })
        //     }
        // })

        return successResponse(res, {
            payload: {
                message: "Deleted Successfully",
                data: result
            }
        })

    } catch (error) {

        next(error)
    }
}

//update single user findById
const updateUser = async (req, res, next) => {

    try {
        const result = await updateAnythingById(req, User, next)
        return successResponse(res, {
            payload: {
                message: "Updated Successfully",
                data: result,
            }
        })

    } catch (error) {

        next(error)
    }
}



//update single user findById
const processRegister = async (req, res, next) => {

    try {
        const { name, email, password, phone, address } = req.body

        const newUser = { name, email, password, phone, address }

        const userExists = await User.exists({ email: email })

        if (userExists) {

            throw createError(409, "User Already Exists")

        } else {

            //step- One create token
            const token = createJSONWebToken(newUser, JWT_SECRET_KEY, "10m")

            //Step-two----prepare email
            const emailData = {
                email: email,
                subject: "Account Activation Email",
                html: `
            
            <p>Assalamu alaikum , ${name} !
            <p>Please click here to <a href ="${CLIENT_SITE_URL}/api/v1/users/activate/${token}"> activated your account .</a></p>
            
            `
            }

            try {
                await sendEmailWithNodeMailer(emailData)
            } catch (error) {
                next(createError(409, "Failed to send verification email."))
                return
            }

            return successResponse(res, {
                payload: {
                    message: `Please go for your ${email} for activated your account`,
                    data: token,
                }
            })
        }
        
    } catch (error) {

        next(error)
    }
}


//active single user findById
const activateUserAccount = async (req, res, next) => {

    try {

        await verifyTokenForActiveAcc(req, next, User)
        return successResponse(res, {
            payload: {
                statusCode: 201,
                message: `User was registered successfully`,
            },
        });
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        next(error);
    }
};




module.exports = { getUsers, getUser, deleteUser, updateUser, processRegister, activateUserAccount }