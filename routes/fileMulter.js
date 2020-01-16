var multer = require('multer');
var storage = multer.diskStorage({
  destination:(req,file,path) =>
 {path(null,'./public/reports')
},
filename:(req,file,path)=>{
path(null, Date.now()+file.originalname )},
});
var fileUpload = multer({storage:storage});

module.exports = fileUpload;