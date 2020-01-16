var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/addnewrecord',function(req,res,next){
    console.log(req.body)
    
    pool.query('insert into schoolmodule(schoolId,productId,moduleLimit,moduleNeeded) values(?,?,?,?)',[req.body.schoolId,req.body.productId,req.body.moduleLimit,req.body.moduleNeeded],function(error,result){
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
    pool.query('select * from schoolmodule',function(error,result){
        if(error){
            console.log(error)
            return res.status(500).json([])
        }
        else{
            return res.status(200).json(result)
        }
    })
});

router.post('/editData',function(req,res,next){
    console.log(req.body)
    pool.query('update schoolmodule set moduleLimit=?,moduleNeeded=? where moduleId=?',[req.body.moduleLimit,req.body.moduleNeeded,req.body.moduleId],function(error,result){

        if(error){
            console.log(error)
            return res.status(500).json({RESULT:false})
        }
        else{
            return res.status(200).json({RESULT:true})
        }
    })
    
});

router.post('/deleteRecord',function(req,res,next){
   console.log(req.body)
   pool.query('delete from schoolmodule where moduleId=?',[req.body.moduleId],function(error,result){
       if(error){
           console.log(error)
           return res.status(500).json({RESULT:false})
       }
       else{
           return res.status(200).json({RESULT:true})
       }
   })
});


router.post('/displayBySchoolId',function(req,res,next){
    console.log(req.body)
    // pool.query('select * from schoolmodule where schoolId=?',[req.body.schoolId],function(error,result){
        pool.query('select (select s.schoolName from school s where s.schoolId=sm.schoolId) as schoolName,(select p.productName from product p where p.productId=sm.productId) as productName ,moduleNeeded,moduleLimit from schoolmodule sm where sm.schoolId=?',[req.body.schoolId],function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json([])
      }
      else{
        console.log(result)
        return res.status(200).json(result)
      }
    })
  })

module.exports = router;