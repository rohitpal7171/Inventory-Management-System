var express=require('express')
var router=express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/addnewrecord',upload.single('productImage'),function(req, res, next) {
   console.log(req.body)
   pool.query('insert into product(productName,productBrand,productCategory,productQuantity,dop,productAmount,productImage) values(?,?,?,?,?,?,?)',[req.body.productName,req.body.productBrand,req.body.productCategory,req.body.productQuantity,req.body.dop,req.body.productAmount,req.file.filename],function(error,result){
   
       if(error){
           console.log(error)
           return res.status(500).json({RESULT:false})
       }
       else{ 
           return res.status(200).json({RESULT:true})
       }
       })
});

router.get('/displayall',function(req, res, next) {
 
  pool.query('select * from product',function(error,result){
 
  if(error){
    console.log(error)
      return res.status(500).json([])
  }
  else{ 
    console.log(result)
      return res.status(200).json(result)
  }
  })
});


router.get('/displayalljso',function(req, res, next) {
 
        pool.query('select * from product',function(error,result){
       
        if(error){
          console.log(error)
            return res.status(500).json([])
        }
        else{ 
          console.log(result)
            return res.status(200).json({data:result})
        }
        })
});

router.post('/editIcon',upload.single('productImage'),function(req, res, next) {
    pool.query('update  product set productImage=? where productId=?',[req.file.filename,req.body.productId],function(error,result){
       
      if(error)
     {console.log(error)
        return res.status(500).json({RESULT:false})}
  
     else
     {
      return res.status(200).json({RESULT:true})
     }
  
    })  
    });

    router.post('/deleteRecord',function(req, res, next) {
      pool.query('delete from  product where productId=?',[req.body.productId],function(error,result){
         
        if(error)
       {
          return res.status(500).json({RESULT:false})}
    
       else
       {
        return res.status(200).json({RESULT:true})
       }
    
      })  
      });
      router.post('/editdata',function(req, res, next) {
        pool.query('update product set productName=?,productBrand=?,productCategory=?,productQuantity=?,dop=?,productAmount=? where productId=?',[req.body.productName,req.body.productBrand,req.body.productCategory,req.body.productQuantity,req.body.dop,req.body.productAmount,req.body.productId],function(error,result){
           
          if(error)
         {
            return res.status(500).json({RESULT:false})}
      
         else
         {
          return res.status(200).json({RESULT:true})
         }
      
        })  
        });
  //       router.get('/displayproduct',function(req, res, next) {
 
  //         pool.query('select productName from product where productId?',[req.body.productId,req.body.productName],function(error,result){
         
  //         if(error){
  //           console.log(error)
  //             return res.status(500).json([])
  //         }
  //         else{ 
  //           console.log(result)
  //             return res.status(200).json(result)
  //         }
  //         })
  // });
    

module.exports = router;