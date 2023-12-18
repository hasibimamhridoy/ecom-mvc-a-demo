const multer = require("multer")
const path = require("path")
const { UPLOAD_DIRECTORY, ALLOWED_FILE_TYPE, MAX_FILE_SIZE } = require("../../../secret")
var createError = require('http-errors')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_DIRECTORY)
    },
    filename: function (req, file, cb) {
      const extensionName = path.extname(file.originalname)
      cb(null,Date.now() + "-" + file.originalname.replace(extensionName,'') + extensionName)
    }
  })
  
  const fileFilter = (req,file,cv)=>{
    const extensionName = path.extname(file.originalname)

    if (!ALLOWED_FILE_TYPE.includes(extensionName.substring(1))) {
        
  
        return cb (new Error("File type not allowed"),false)

    } else{

       cb(null,true)

    }

  }

  const upload = multer({ 
    storage: storage , 
    limits :{fileSize :MAX_FILE_SIZE},
    fileFilter

}) 

  module.exports = upload