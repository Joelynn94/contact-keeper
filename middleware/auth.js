const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from the header 
  // we can access the header through the req
  // x-auth-token is basically the key to the token inside the header
  const token = req.header('x-auth-token')

  // Check if token exists
  if(!token) {
    // 401 is an unauthoized status
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    // if there is a token we need to verify it
    // pass in the token and the secret 
    const decoded = jwt.verify(token, config.get('jwtSecret'))

    // once the token is verified - the payload (is an object) is put into decoded 
    // take the user out of decoded - decoded is the entire token payload
    req.user = decoded.user;
    // call next to move on
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}