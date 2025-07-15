import jwt from 'jsonwebtoken';

//Doctor authenitication middleware
const authDoctor = (req, res, next) => {
  try {
    
    const {doctortoken} = req.headers;

    if(!doctortoken){
       return res.status(400).json({
       success:'false',
       message: 'Not Authorized Login Again' 
     }) 
   }

   const token_decode = jwt.verify(doctortoken, process.env.JWT_SECRET);
   req.user = token_decode.id;
   next();
  } catch (error) {
     console.log(error); 
       return res.status(500).json({
       success:'false',
       message:error.message 
    })
  }
}


export default authDoctor;