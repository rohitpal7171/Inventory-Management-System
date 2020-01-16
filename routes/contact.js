var express = require('express');
var router = express.Router();
var pool = require('./pool')


router.post('/addnewrecord',function(req,res,next){
    console.log(req.body)
    
    pool.query('insert into contactus(trainerName,email,mobileNumber,feedback) values(?,?,?,?)',[req.body.trainerName,req.body.email,req.body.mobileNumber,req.body.feedback],function(error,result){
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
    pool.query('select * from contactus',function(error,result){
        if(error){
            console.log(error)
            return res.status(500).json([])
        }
        else{
            return res.status(200).json(result)
        }
    })
});



router.post('/deleteRecord',function(req,res,next){
   console.log(req.body)
   pool.query('delete from contactus where feedbackId=?',[req.body.feedbackId],function(error,result){
       if(error){
           console.log(error)
           return res.status(500).json({RESULT:false})
       }
       else{
           return res.status(200).json({RESULT:true})
       }
   })
});




module.exports = router;