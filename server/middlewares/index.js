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
