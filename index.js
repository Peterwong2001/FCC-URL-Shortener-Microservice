require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

const connectDB = "mongodb+srv://user1:"+ process.env.PASSWORD + "@cluster0.ofgm2es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(connectDB, {useNewUrlParser: true, useUnifiedTopology: true});

let urlSchema = new mongoose.Schema({
  original: {type: String, required: true},
  short: Number
})

let Url = mongoose.model("Url", urlSchema);


let createAndSaveUrl = function(done) {
  var newUrl = new Url()
}



app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


let resObj = {}
app.post("/api/shorturl", bodyParser.urlencoded({extended: false}), function(req, res) {
  let url = req.params.shorturl
  
  res.json(resObj);
})




module.exports = mongoose.model("original", "short", urlSchema);
