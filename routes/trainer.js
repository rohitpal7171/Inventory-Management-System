var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')
 
router.post('/addnewrecord',upload.single('trainerImage'),function(req,res,next){
    console.log(req.body)
    pool.query('insert into trainer(trainerName,trainerPassword,trainerMobile,trainerGender,trainerAddress,trainerEmail,trainerDob,trainerDoj,trainerImage)values(?,?,?,?,?,?,?,?,?)',[req.body.trainerName,req.body.trainerPassword,req.body.trainerMobile,req.body.trainerGender,req.body.trainerAddress,req.body.trainerEmail,req.body.trainerDob,req.body.trainerDoj,req.file.filename],function(error,result){
      
        if(error)

        {
            return res.status(500).json({RESULT:false})
            console.log(error)
        }
        else
        {
            return res.status(200).json({RESULT:true})
        }
    })
});



router.get('/displayalltrainer',function(req,res,next){
    pool.query('select * from trainer',function(error,result){
        if(error)
        {
            console.log(error)
            return res.status(500).json([])
        }
        else{
            return res.status(200).json(result)
        }
    })
});

router.get('/displayalltrainerjso',function(req,res,next){
    pool.query('select * from trainer',function(error,result){
        if(error)
        {
            console.log(error)
            return res.status(500).json([])
        }
        else{
            return res.status(200).json({data:result})
        }
    })
});



router.post('/editDataTrainer',function(req,res,next){
    console.log(req.body)
    console.log(req.file)
    pool.query('update trainer set trainerName=?,trainerMobile=?,trainerGender=?,trainerAddress=?,trainerEmail=?,trainerDob=?,trainerDoj=? where trainerId=?',[req.body.trainerName,req.body.trainerMobile,req.body.trainerGender,req.body.trainerAddress,req.body.trainerEmail,req.body.trainerDob,req.body.trainerDoj,req.body.trainerId],function(error,result){
        if(error)
        {   console.log(error)
            return res.status(500).json({RESULT:false})
        }
        else{
            console.log(result)
            return res.status(200).json({RESULT:true})
        }
    })
});



router.post('/editIconTrainer',upload.single('trainerImage'),function(req, res, next) {
    pool.query('update  trainer set trainerImage=? where trainerId=?',[req.file.filename,req.body.trainerId],function(error,result){
      
      
      if(error)
     { console.log(error)
        return res.status(500).json({RESULT:false})}
  
     else
     {
      return res.status(200).json({RESULT:true})
     }
  
    })  
    });


    router.post('/deleteRecordTrainer',function(req, res, next) {
        pool.query('delete from  trainer where trainerId=?',[req.body.trainerId],function(error,result){
           
          if(error)
         {
            return res.status(500).json({RESULT:false})}
      
         else
         {
          return res.status(200).json({RESULT:true})
         }
      
        })  
        }); 



module.exports = router;