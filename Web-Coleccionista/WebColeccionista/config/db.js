const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'collector'
});

connection.connect((err)=>{
  if(err){
    console.error('error connecting: ' + err.stack)
  }
  console.log("Conectado a la db")
})


module.exports = connection;