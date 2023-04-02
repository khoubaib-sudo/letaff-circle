const jwt = require('express-jwt');
const getToken = (req) => {
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  return null;
};
const requireSignin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  getToken: getToken,
});
module.exports = { requireSignin };

export const isInstructor = async (req, res, next) => {
  try{
    const user = await User.findById(req.user._id).exec();
    if(!user.role.includes('Instructor')){
      return res.sendStatus(403)
    }else{
      next();
    }
  }catch(err){
    console.log(err)
  }
}
