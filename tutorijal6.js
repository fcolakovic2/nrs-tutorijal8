const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const port = 3010


export function start(){
  let db = new sqlite3.Database('./db/baza.db',sqlite3.OPEN_READWRITE,(err)=>{
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

app.get('/gradovi/:id', (req,res)=>{
  const { id } = req.params;
  //parametar dinamicki
  let db = new sqlite3.Database('./db.baza.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err){
      return console.log(err.message)
    }
    console.log("Connected");
  }) 

  //izmedju starta i closea ide post zahtjev

 db.serialize(()=>{
   db.each(`SELECT FROM grad WHERE ID = ?`,[id],function(err){
    if (err){
      return console.log(err.message)
    }
    console.log("Connected");
   })
 })

  db.close((err)=>{
    if (err){
       return console.log(err.message)
      }
      console.log("Connected")
    });
})

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


app.put('/gradovi/:id', (req,res)=>{
  const { id } = req.params;
  //parametar dinamicki
  let db = new sqlite3.Database('./db.baza.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err){
      return console.log(err.message)
    }
    console.log("Connected");
  }) 

  //izmedju starta i closea ide post zahtjev

 db.serialize(()=>{
   db.each(`UPDATE grad SET NAZIV = ? WHERE ID = ?`,['SARAJEVO',id],function(err){
    if (err){
      return console.log(err.message)
    }
    console.log("Connected");
   })
 })

  db.close((err)=>{
    if (err){
       return console.log(err.message)
      }
      console.log("Connected")
    });
})


app.post('/grad', (req,res)=>{
  let db = new sqlite3.Database('./db.baza.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err){
      return console.log(err.message)
    }
    console.log("Connected");
  }) 

  //izmedju starta i closea ide post zahtjev

  db.run(`INSERT INTO grad VALUES(3,'Liverpool',90)`,function(err){
    if (err){
      return console.log(err.message)
     }
     console.log("Connected")
   });
  

  db.close((err)=>{
    if (err){
       return console.log(err.message)
      }
      console.log("Connected")
    });
})


app.delete('/gradovi/:id',(req,res)=>{
  const { id } = req.params;
  //parametar dinamicki
  let db = new sqlite3.Database('./db.baza.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err){
      return console.log(err.message)
    }
    console.log("Connected");
  }) 

  //izmedju starta i closea ide post zahtjev

 db.serialize(()=>{
   db.each(`DELETE FROM grad WHERE ID = ?`,[id],function(err,row){
    if (err){
      return console.log(err.message)
    }
    res.json("Deleted")
  })
 })

  db.close((err)=>{
    if (err){
       return console.log(err.message)
      }
      console.log("Connected")
    });
})


export function refresujSve(){
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
}


//assuming app is express Object.
app.get('/',function(req,res) {
    res.sendFile(__dirname+'/index.html');
  });


console.log('Running at Port 3000');

var server = app.listen(3000)

module.exports=server