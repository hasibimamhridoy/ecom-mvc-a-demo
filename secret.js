require('dotenv').config()

const SERVER_PORT = process.env.PORT || 5000
const defaultUserImagePath = process.env.DEFAULT_USER_IMG_PATH || 'public/images/users/default.jpg'
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const SMTP_USERNAME = process.env.SMTP_USERNAME
const SMTP_PASS = process.env.SMTP_PASS
const CLIENT_SITE_URL = process.env.CLIENT_SITE_URL 
const UPLOAD_DIRECTORY = process.env.UPLOAD_DIRECTORY 
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 2097152
const ALLOWED_FILE_TYPE = process.env.ALLOWED_FILE_TYPE || ['jpeg','jpg','png']

module.exports = {
    SERVER_PORT,defaultUserImagePath,JWT_SECRET_KEY,SMTP_USERNAME,SMTP_PASS,CLIENT_SITE_URL,UPLOAD_DIRECTORY,MAX_FILE_SIZE,ALLOWED_FILE_TYPE
}