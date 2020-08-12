const db = require('./dbconfig');

// Get user by email
const getUserByEmail = (email, next) => {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  } 


  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    else {
      next(result.rows);
    }
  })
}

module.exports = {
  getUserByEmail: getUserByEmail
}
