const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const porrt = 3010


export function start(){
  let dv = new sqlite3.Database('./db/baza.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err){
      return console.log(err.message)
    }
    console.log("Connected")
  })
}

export function close(){
  db.close((err)=>{
  if (err){
     return console.log(err.message)
    }
    console.log("Connected")
  });
}

app.get('/gradovi',(req,res)=>{
  const gradovi = [];

  let db = new sqlite3.Database('./db.baza.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err){
      return console.log(err.message)
    }
    console.log("Connected");
  })

  db.serialize(()=>{
    db.all('SELECT NAZIV FROM grad', (err,rows,fields)=>{
      if (err){
        return console.log(err.message)
      }
      res.json(JSON.stringify(rows));
    })
  })

  db.close((err)=>{
    if (err){
       return console.log(err.message)
      }
      console.log("Connected")
    });
})



//assuming app is express Object.
app.get('/',function(req,res) {
    res.sendFile(__dirname+'/index.html');
  });

  app.listen(process.env.port || 3000);

console.log('Running at Port 3000');