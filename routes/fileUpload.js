var express = require('express');
var router = express.Router();
var pool = require('./pool')
var fileUpload = require('./fileMulter')

router.post('/addnewrecord',fileUpload.any('fileUpload'),function(req,res,next){
    console.log(req.body)
    console.log(req.files)
  
    pool.query('insert into fileupload(trainerName,schoolName,currentDate,fileUpload) values(?,?,?,?)',[req.body.trainerName,req.body.schoolName,req.body.currentDate,req.files[0].filename],function(error,result){
        if(error){
            console.log(error)
            
            return res.status(500).json({RESULT:false})
        }
        else{
            return res.status(200).json({RESULT:true})
        }
    })
});

router.get('/displayall',function(req,res,next){
    console.log(req.body)
    pool.query('select * from fileupload ORDER BY userFileId DESC',function(error,result){
        if(error){
            console.log(error)
            return res.status(500).json([])
        }
        else{
            return res.status(200).json(result)
        }
    })
});

module.exports = router;