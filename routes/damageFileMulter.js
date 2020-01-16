var multer = require('multer');
var storage = multer.diskStorage({
  destination:(req,file,path) =>
 {path(null,'./public/damageFiles')
},
filename:(req,file,path)=>{
path(null, Date.now()+file.originalname )},
});
var damageFileUpload = multer({storage:storage});

module.exports = damageFileUpload;