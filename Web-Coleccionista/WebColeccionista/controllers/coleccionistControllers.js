const connection = require('../config/db');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

class ColeccionistCrontollers {

  showColeccionist = (req, res) => {
    let sql = `SELECT * FROM coleccionist WHERE is_deleted = false `;
    connection.query(sql, (err, result)=>{
      if(err) throw err;
      res.render('coleccionists',{result})
    })
  }

  formCreateColeccionist = (req, res) => {

    res.render('createColeccionist', {validations:[], values:{}})
  }
  
  addColeccionist = (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const values = req.body;
      const validations = errors.array();
     return res.render("createColeccionist", {validations, values})
    }

    const {interest, email, password, description, number_phone, first_name, last_name} = req.body;

    if(
      interest == "" || 
      email == "" || 
      password == "" || 
      description == "" || 
      number_phone == "" || 
      first_name == "" || 
      last_name == "" 
    ){
      return res.render('createColeccionist', {message: "Debes rellenar todos los campos"})
    }
    let img 
    if(req.file != undefined){
      img = req.file.filename
    }
    else {
      img = "coleccionista-default.jpg"
    }
    let salt = 10
    bcrypt.hash(password, salt, (err, hash)=>{
      let sql = `INSERT INTO coleccionist (interest, email, password, description, number_phone, first_name, last_name, img) VALUES ("${interest}","${email}", "${hash}", "${description}", "${number_phone}", "${first_name}", "${last_name}", "${img}")`

      connection.query(sql, (errSql, result)=>{
        if(errSql){
          if(errSql.errno == 1062){
            res.render('createColeccionist', {message: "email en uso, use otro por favor"})
          }
          else{
            res.render('createColeccionist', {message: "Hay algun error con la base de datos"})
          }
        }
        else {
          res.redirect('/coleccionists')
        }
      })
    })
  }

  showEditColeccionist = (req, res) => {
    const {id} = req.params;
    let sql = `SELECT * FROM coleccionist WHERE coleccionist_id = ${id} AND is_deleted = false`
    connection.query(sql, (err, result)=>{
      if(err) throw err;
      res.render('formEditColeccionist', {result: result[0]})
    })
  }


  editColeccionist = (req, res) => {
    const {id} = req.params;
    const{interest, email, description, number_phone, first_name, last_name} = req.body;
    let sql = `UPDATE coleccionist SET interest = "${interest}", email = "${email}", description = "${description}", number_phone = "${number_phone}", first_name = "${first_name}", last_name = "${last_name}" WHERE coleccionist_id = ${id}`

    if(req.file){
      sql =  `UPDATE coleccionist SET interest = "${interest}", email = "${email}", description = "${description}", number_phone = "${number_phone}", first_name = "${first_name}", last_name = "${last_name}", img = "${req.file.filename}" WHERE coleccionist_id = ${id}`
    }

    connection.query(sql, (err, result)=>{
      if(err) throw err;
      res.redirect(`/coleccionists/oneColeccionistLogged/${id}`)
    })
  }

  getOneColeccionist = (req, res) =>  {
    const {id} = req.params;
    let sql = `SELECT * FROM coleccionist WHERE coleccionist_id = ${id} and is_deleted = FALSE`
    connection.query(sql, (err, result)=>{
      if(err) throw err;
      let sql2 = `SELECT * FROM object WHERE coleccionist_id = ${id} and is_deleted = FALSE`
      connection.query(sql2, (err, resultObject)=>{
        if(err) throw err;
        res.render("oneColeccionist", {result: result[0], resultObject})
      })
    })
  }

  showLogin = (req, res) => {
    res.render('login', {message: ""})
  }

  login = (req, res) => {
    const {email , password} = req.body;
    let sql = `SELECT * FROM coleccionist WHERE email = ? and is_deleted = false `
    if(email == ""||password == ""){
      return res.render("login", {message: "Debes rellenar todos los datos"})
    }

    connection.query(sql, [email], (err, result) =>{
      if(err) throw err;
      if(result.length > 0){
        let hash = result[0].password;
        bcrypt.compare(password, hash, (err, resultCompare) =>{
          if(resultCompare){
            res.redirect(`/coleccionists/oneColeccionistLogged/${result[0].coleccionist_id}`)
          }
          else{
            res.render("login", {message: "Email o contraseña incorrectas"})
          }
        })
      }
    })

  }

  getOneColeccionistLogged = (req, res) =>  {
    const {id} = req.params;
    let sql = `SELECT * FROM coleccionist WHERE coleccionist_id = ${id} and is_deleted = FALSE`
    connection.query(sql, (err, result)=>{
      if(err) throw err;
      let sql2 = `SELECT * FROM object WHERE coleccionist_id = ${id} and is_deleted = FALSE`
      connection.query(sql2, (err, resultObject)=>{
        if(err) throw err;
        res.render("oneColeccionistLogged", {result: result[0], resultObject})
      })
    })
  }

  deleteLogicColeccionist = (req, res) =>{
    const {id} = req.params;
    let sql = `UPDATE coleccionist LEFT JOIN object ON coleccionist.coleccionist_id = object.coleccionist_id SET coleccionist.is_deleted = true, object.is_deleted = true WHERE coleccionist.coleccionist_id = ${id}`
    
    connection.query(sql, (err, result)=>{
      if(err) throw err;
      res.redirect('/coleccionists')
    })
  }
  
}

module.exports = new ColeccionistCrontollers();