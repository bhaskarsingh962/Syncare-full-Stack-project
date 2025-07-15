import jwt from 'jsonwebtoken';

//admin authenitication middleware
const authAdmin = (req, res, next) => {
  try {
    
    const {admintoken} = req.headers;

    if(!admintoken){
       return res.status(400).json({
       success:'false',
       message: 'token not found' 
     }) 
   }

   const token_decode = jwt.verify(admintoken, process.env.JWT_SECRET);

   if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
      return res.status(400).json({
       success:'false',
       message: 'Not Authrized Login Again' 
     }) 
   }
  
   next();

  } catch (error) {
     console.log(error); 
       return res.status(500).json({
       success:'false',
       message:error.message 
    })
  }
}


export default authAdmin;