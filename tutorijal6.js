const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

//assuming app is express Object.
app.get('/',function(req,res) {
    res.sendFile(__dirname+'/index.html');
  });

  app.listen(process.env.port || 3000);

console.log('Running at Port 3000');