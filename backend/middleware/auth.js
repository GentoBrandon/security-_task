const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');


const verifyTokens = async (req,res,next)=>{
  try{  
    const {token} = req.cookies
    if(!token){
      const error = new Error('No token provided');
      error.status = 403;
      throw error;
    }
    const decoded = await jwt.verify(token,config.secret);
    req.id = decoded.id;
    req.user_name = decoded.user_name;
    req.role = decoded.role;
    next();
  }catch(error){
    next(error);
  }
}


module.exports = {
 
  verifyTokens
};
