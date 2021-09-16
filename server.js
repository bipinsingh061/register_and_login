const express=require('express');
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
require('dotenv').config()

const app=express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const uri = process.env.DB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("monngo connected"));

let User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true ,unique: true  },
    password: { type: String, required: true },
  })
);  

app.post("/login", (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if(user){
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({
                message: 'Incorrect password!'
             });
          }
          return res.status(200).send({
            message: 'Login Successful!'
         });
      }else{
        return res.status(400).send({
            message: 'User doesnt exist!'
         });
      }
    });
  });

app.post("/register", (req, res) => {
    console.log(req.body.password);
    console.log(req.body.username);
    let hash = bcrypt.hashSync(req.body.password, 14);
    req.body.password = hash;
    let user = new User(req.body);

    user.save((err) => {
      if (err) {
          if(err.code==11000){
            return res.status(400).send({
                message: 'Username already exists!'
             });
          }
        return res.status(400).send({
            message: 'Bad Authentication!'
         });
      }
      res.statusCode=200 ;
      return res.send('successfull');
    });
  });

app.listen(3000,()=>{
    console.log("server running at 3000");
})



