const multer = require("multer");
const {v4: uuidv4} = require('uuid');
const path = require("path");           //use this to get file extention

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/uploads')
    },

    filename: function(req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const uniqueFilename = uuidv4();
        cb(null, uniqueFilename+path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});


module.exports = upload;