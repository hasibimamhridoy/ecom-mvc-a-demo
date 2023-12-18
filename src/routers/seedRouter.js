const express = require("express")
const router  = express.Router()
const {seedController} = require('../controllers/seedController')

router.get('/users',seedController)

module.exports = router