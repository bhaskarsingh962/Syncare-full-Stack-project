import jwt from 'jsonwebtoken';

//admin authenitication middleware
const authUser = (req, res, next) => {
  try {
    
    const {token} = req.headers;

    if(!token){
       return res.status(400).json({
       success:'false',
       message: 'Not Authorized Login Again' 
     }) 
   }

   const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded token:", token_decode);
   req.userId = token_decode.id
   next();

  } catch (error) {
     console.log(error); 
       return res.status(500).json({
       success:'false',
       message:error.message 
    })
  }
}


export default authUser;