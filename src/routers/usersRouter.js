const express = require("express")
const router  = express.Router()
const {getUsers,getUser,deleteUser,updateUser,processRegister,activateUserAccount} = require('../controllers/usersController')
const upload = require("../middleware/uploadFile/uploadFile")

router.get('/',getUsers)
router.get('/:id',getUser)
router.delete('/:id',deleteUser)
router.patch('/:id',updateUser)
router.post('/process-register',upload.single("image"), processRegister)
router.post('/verify',activateUserAccount)

module.exports = router