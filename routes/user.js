var express = require('express');
var router = express.Router();
var pool=require('./pool')
router.post('/checkuserlogin',function(req,res,next){
    console.log(req.body)
    pool.query('select *  from trainer where trainerId=? and trainerPassword=?',[req.body.trainerId,req.body.trainerPassword],function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json({RESULT:false})
      }
      else{
          if(result.length==0)
        return res.status(200).json({RESULT:false})
        else
        return res.status(200).json({RESULT:result})
        
      }
    })
  })

  module.exports = router;
  