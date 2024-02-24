require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

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



const connectDB = "mongodb+srv://user1:"+ process.env.PASSWORD + "@cluster0.ofgm2es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(connectDB, {useNewUrlParser: true, useUnifiedTopology: true});

let urlSchema = new mongoose.Schema({
  original: {type: String, required: true},
  short: Number
})

let Url = mongoose.model("Url", urlSchema);


let resObj = {}
const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
const regex = new RegExp(expression);

app.post("/api/shorturl", bodyParser.urlencoded({extended: false}), function(req, res) {
  let inputurl = req.body["url"]
  resObj["original_url"] = inputurl;
  
  let inputShort = 1;
  
  if(!inputurl.match(regex)) {
    res.json({error: "invalid url"})
    return
  }
  
  
  Url.findOne({})
      .sort({short: -1})
      .exec(function(err, result) {
        if (!err && result != undefined) {
          inputShort = result.short + 1;
        }
    if (!err) {
      Url.findOneAndUpdate(
        {original: inputurl},
        {original: inputurl, short: inputShort},
        {new: true, upsert: true},
        function(err, saveUrl) {
          if(!err) {
            resObj["short_url"] = saveUrl.short
            res.json(resObj);
          }
        }
      )
    }
  })
})

app.get("/api/shorturl/:number", function(req, res) {
  let number = req.params.number;
  
  Url.findOne({short: in})
})




