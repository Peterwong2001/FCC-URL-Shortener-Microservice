require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

// Basic Configuration
const port = process.env.PORT || 3000;

const connectDB = "mongodb+srv://user1:"+ process.env.PASSWORD + "@cluster0.ofgm2es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(connectDB, {useNewUrlParser: true, useUnifiedTopology: true});
let urlSchema = new mongoose.Schema({
  original: String required: true,
  short: Number
})

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
app.get("/api/shorturl", function(req, res) {
  let url = req.params.shorturl
  
  if (url.includes)
  
  res.json(resObj);
})

module.exports = mongoose.model("")