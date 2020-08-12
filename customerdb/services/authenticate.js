const jwt = require('jsonwebtoken');
const user = require('../db/users');
const bcrypt = require('bcrypt');

// User login
const login = (req, res) => {
  // Extract email and password from the request body
  const email = req.body.email;
  const password = req.body.password;

  const loginUser = user.getUserByEmail(email, (user) => {
  if (user.length > 0) {
    const hashpwd = user[0].password;
    const token = jwt.sign({userId: email}, process.env.SECRET_KEY);

    if (bcrypt.compareSync(password, hashpwd))
      res.send({token});
    else
      res.sendStatus(400).end(); 
  }
  else {
    res.sendStatus(400).end();
  }
});
}

// User authentication
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if(!token) {
    res.sendStatus(400).end();
  }
  
  // Verify the received token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
     res.sendStatus(400).end();
   else
     next();
  }); 
}

module.exports = {
  authenticate: authenticate,
  login: login
}