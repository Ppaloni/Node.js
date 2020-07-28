const express = require('express');

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Navigate /home or /about to see more");
  })

app.get("/home/user/:name/:age", (req, res) => {
    if (req.params.age >= 18) {
    res.send("Welcome " + req.params.name + " you're " + req.params.age + " years old.");
    }
 
    else {
    res.send("Hello " + req.params.name + " you're too young");
    }
    
  
  
})

app.get("/about", (req, res) => {
    res.send("About us...");
  })

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});