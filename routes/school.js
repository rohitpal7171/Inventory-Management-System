var express=require('express')
var router=express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/addnewrecord',upload.single('schoolImage'),function(req, res, next) {
   console.log(req.body)
   pool.query('insert into school(schoolName,schoolAddress,schoolImage) values(?,?,?)',[req.body.schoolName,req.body.schoolAddress,req.file.filename],function(error,result){
   
       if(error){
           console.log(error)
           return res.status(500).json({RESULT:false})
       }
       else{ 
           return res.status(200).json({RESULT:true})
       }
       })
});

router.get('/displayallschool',function(req,res,next){
    pool.query('select * from school',function(error,result){
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

router.post('/deleteRecordSchool',function(req, res, next) {
    pool.query('delete from school where schoolId=?',[req.body.schoolId],function(error,result){
       
      if(error)
     {
        return res.status(500).json({RESULT:false})}
  
     else
     {
      return res.status(200).json({RESULT:true})
     }
  
    })  
    }); 

    router.post('/editData',function(req,res,next){
        console.log(req.body)
        console.log(req.file)
        pool.query('update school set schoolName=?,schoolAddress=? where schoolId=?',[req.body.schoolName,req.body.schoolAddress,req.body.schoolId],function(error,result){
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
    
    
    
    router.post('/editIcon',upload.single('schoolImage'),function(req, res, next) {
        pool.query('update school set schoolImage=? where schoolId=?',[req.file.filename,req.body.schoolId],function(error,result){
          
          
          if(error)
         { console.log(error)
            return res.status(500).json({RESULT:false})}
      
         else
         {
          return res.status(200).json({RESULT:true})
         }
      
        })  
        });

module.exports = router;