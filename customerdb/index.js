// index.js
const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/customers');
const auth = require('./services/authenticate');


const app = express();
app.use(bodyParser.json());

const port = 3000;

process.env.SECRET_KEY = "5b1a3923cc1e1e19523fd5c3f20b409509d3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84d";

// Routes for REST API
app.get("/api/customers", auth.authenticate, query.getAllCustomers);
app.post("/api/customers", auth.authenticate, query.addCustomer);
app.delete("/api/customers/:id", auth.authenticate, query.deleteCustomer);
app.put("/api/customers/:id", auth.authenticate, query.updateCustomer);
// Route for login
app.post("/login", auth.login);

app.listen(port, () => {{}
  console.log(`Server is running on port ${port}.`);
});

module.exports = app;