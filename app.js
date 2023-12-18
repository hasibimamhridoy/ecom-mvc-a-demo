////external import
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit')

//internal import
const { SERVER_PORT } = require('./secret')
const { routeErrorHandler, defaultErrorHandler } = require("./src/middleware/errorHandaling/errorHandaling")
const userRouter = require('./src/routers/usersRouter')
const seedRouter = require('./src/routers/seedRouter')
const connectDb = require('./src/config/db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(xssClean())

// const rateLimiter = rateLimit({
//     windowMs: 1 * 60 * 1000,// 1 minute
//     max: 5,
//     message: "Too many request from this IP. Please try again later"
// })

// app.use(rateLimiter)



// routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/seed", seedRouter)


//error handler
app.use(routeErrorHandler)
app.use(defaultErrorHandler)


//listen
app.listen(SERVER_PORT, async () => {
    console.log(`app is listening port : ${SERVER_PORT}`);
    //connect database
    await connectDb()

})

