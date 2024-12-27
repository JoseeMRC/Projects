let connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendMail = require("../services/emailService");
const { query } = require("express");

class userController {
  // Ruta: .../users/register
  register = (req, res) => {
    const { name, lastname, email, pass1, pass2, country, phone_number } =
      req.body;

    if (!email || !pass1 || !pass2 || pass1 !== pass2) {
      res.status(500).json("algo esta mal");
    } else {
      let img = "perfil-default.png";
     
      let saltRounds = 8;
      bcrypt.genSalt(saltRounds, (err, saltRounds) => {
        bcrypt.hash(pass1, saltRounds, (err, hash) => {
          if (err) {
            res.status(500).json("hay algun error");
          }
          let sql = `INSERT INTO user (name, lastname, email, password, country, phone_number, img) VALUES ("${name}", "${lastname}", "${email}", "${hash}", "${country}", "${phone_number}", "${img}")`;

          connection.query(sql, (err, result) => {
            if (err) {
              res.status(500).json(err);
            } else {
              const tokenEmail = jwt.sign(
                {
                  email,
                },
                process.env.TOKEN_EMAIL_SECRET,
                { expiresIn: "20m" }
              );
              sendMail(name, email, tokenEmail, "register");
              res.status(200).json("Todo ok");
              console.log(result);
            }
          });
        });
      });
    }
  };

  // Ruta: .../users/login
  login = (req, res) => {
    const { email, password } = req.body;

    let sql = `SELECT * FROM user WHERE email = '${email}' AND deleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json("Credenciales mal hechas");
      } else if (!result || !result.length || result[0].deleted == 1) {
        res.status(401).json("Credenciales incorrectas");
      } else if (result[0].enabled === 0) {
        res.status(403).json("Cuenta no verificada");
      } else {
        const [user] = result;
        let hash = result[0].password;

        bcrypt.compare(password, hash, (error, response) => {
          if (response) {
            const token = jwt.sign(
              {
                id: user.user_id,
              },
              process.env.TOKEN_SECRET,
              { expiresIn: "7d" }
            );
            res.status(200).json({ token });

          } else {
            res.status(401).json("Credenciales incorrectas back 2");
          }
        });
      }
    });
  };

  // Ruta: .../users/resendVerification
  resendVerification = (req, res) => {
    const { email } = req.query;
    console.log(email);

    let sql = `SELECT * FROM user WHERE email = '${email}' AND deleted = 0`;

    connection.query(sql, (err, result) => {
      console.log(result);
      if (err) {
        res.status(500).json(err);
      } else {
        const tokenEmail = jwt.sign(
          {
            email,
          },
          process.env.TOKEN_EMAIL_SECRET,
          { expiresIn: "20m" }
        );
        sendMail(result[0].name, email, tokenEmail, "register");
        res.status(200).json("Email enviado correctamente");
      }
    });
  };

  // Ruta: .../users/verify/:token
  verify = (req, res) => {
    const { token } = req.params;
    console.log(token);
    jwt.verify(token, process.env.TOKEN_EMAIL_SECRET, (err, decode) => {
      if (err) {
        return res.status(400).json({ err, msg: "Token expirado o invalido" });
      }
      console.log(decode);
      const email = decode.email;
      const sql = `UPDATE user SET enabled = true WHERE email = "${email}" `;
      connection.query(sql, (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json({ msg: "Cuenta verificada correctamente" });
        }
      });
    });
  };

  // Ruta: .../users/changeNewUser
  changeNewUser = (req, res) => {
    const {user_id} = req.params;
    let sql = `UPDATE user SET new_user = false WHERE user_id = ?`
    connection.query(sql, [user_id], (err, result) => {
      if (err) {
        res.status(500).json("hay algún error");
      } else {
        res.status(200).json("Todo ok")
      }
    })
  }

  // Ruta: .../users/oneUser/:id

  oneUser = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM user WHERE user_id = ${id} AND deleted = 0 AND enabled = 1`;
    let sqlCategories = `SELECT DISTINCT category.category_id, category.category_title, category.category_icon FROM movement JOIN category ON movement.category_id = category.category_id
                          WHERE movement.user_id = ${id} ORDER BY category.category_title;`;
    let sqlMovements = `SELECT * FROM movement WHERE user_id = ${id} ORDER BY DATE DESC`;
    let sqlGoals = `SELECT *,
    (SELECT COALESCE(SUM(movement_import), 0) FROM movement WHERE movement.goal_id = goal.goal_id AND movement_type = 1) AS totalSaved,
    (SELECT COALESCE(SUM(movement_import), 0) FROM movement WHERE movement.goal_id = goal.goal_id AND movement_type = 2) AS totalSpent,
    CASE 
      WHEN TIMESTAMPDIFF(MONTH, start_date, limit_date) <= 18 THEN 'short_term'
      WHEN TIMESTAMPDIFF(MONTH, start_date, limit_date) BETWEEN 19 AND 36 THEN 'medium_term'
      ELSE 'long_term'
      END as term
      FROM goal
      WHERE 
       user_id = ${id}`;


    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json("hay algún error");
      } else {
        connection.query(sqlCategories, (err2, resultCategory) => {
          if (err2) {
            res.status(500).json(err2);
          } else {
            connection.query(sqlMovements, (err3, resultMovement) => {
              if (err3) {
                res.status(500).json(err3);
              } else {
                connection.query(sqlGoals, (err4, resultGoals) => {
                  console.log(err4)
                  if (err4) {
                    res.status(500).json(err4);
                  } else {
                    res.status(200).json({
                      user: result[0],
                      categories: resultCategory,
                      movements: resultMovement,
                      goals: resultGoals,
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  };
  
  // Ruta: .../users/editAnswer/
  showEditAnswer = (req, res) => {
    const {user_id} = req.query;
     
    let sql = `SELECT question.question_title, question.question_id, answer.answer_text
    FROM question
    LEFT JOIN answer ON question.question_id = answer.question_id AND answer.user_id = ?
    WHERE question.enabled = 1`

    connection.query(sql, [user_id], (err, result) =>{
      if (err) {
        console.log(err);
        res.status(500).json("Error en la conexión a la base de datos");
      } else {
        
        res.status(200).json(result);
      }
    })
  }


  editAnswer = (req, res) => {

    let data = req.body.allAnswers
    let {user_id} = req.body

    data.forEach(e => {
      let {answer_text, question_id} = e;

        let sql = `UPDATE answer SET answer_text = '${answer_text}' WHERE user_id = ${user_id} AND question_id = ${question_id}`
        if (!e.created) {
          sql = `INSERT INTO answer (answer_text, user_id, question_id) VALUES (?, ?, ?)`
        }
      connection.query(sql,[answer_text, user_id, question_id], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json("algo ha ido mal");
        }       
      });
    });
    res.status(200).json("Todo ok");
  }



  // Ruta: .../users/editUser
  editUser = (req, res) => {
    const data = JSON.parse(req.body.editUser);
    const { user_id, name, lastname, phone_number, country, birth_date } = data;  
    
    let string = null;
    if (birth_date) {
      string = `"${birth_date}"`;
    }
    console.log(req.file, "aaaaaaaaaaaaaaaaaa")
  
    let sql = `UPDATE user SET name="${name}", lastname="${lastname}", birth_date=${string}, phone_number="${phone_number}", country="${country}" WHERE user_id=${user_id}`;
    if (req.file) {
        sql = `UPDATE user SET name="${name}", lastname="${lastname}", birth_date=${string}, phone_number="${phone_number}", country="${country}", img = "${req.file.filename}" WHERE user_id=${user_id}`;
    }
      
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json("algo ha ido mal");
      } 
      else {
        const response = { result };
        if (req.file) {
          response.img = req.file.filename;
        }
        res.status(200).json(response);
      }
    });
  };

  // Ruta: .../users/passResetLink
  passResetLink = (req, res) => {
    const { email } = req.query;

    if (!email) {
      res.status(500).json("algo esta mal");
    }  
    let sql = `SELECT * FROM user WHERE email = '${email}' AND deleted = 0`;

    connection.query(sql, (err, result) => {
      if (!result.length) {
        res.status(404).json({
          title: "Correo electrónico no encontrado",
          msg: "No estás registrado con el correo electrónico introducido.",
        });
      } else if (err) {
        res.status(500).json({
          title: "¡Ups!",
          msg: "Ha habido un error, inténtelo de nuevo.",
        });
      } else {
        const tokenEmail = jwt.sign(
          {
            email,
          },
          process.env.TOKEN_EMAIL_SECRET,
          { expiresIn: "20m" }
        );
        sendMail(result[0].name, email, tokenEmail, "changePass");
        res.status(200).json({
          title: "Email enviado",
          msg: "El mensaje se envió correctamente al correo electrónico indicado. Por favor, haz click en el enlace para cambiar tu contraseña",
        });
      }
    });
  };

  // Ruta: .../users/verifyPass/:token
  verifyPass = (req, res) => {
    const { token } = req.params;
    jwt.verify(token, process.env.TOKEN_EMAIL_SECRET, (err, decode) => {
      if (err) {
        return res.status(400).json({ err, msg: "Token expirado o invalido" });
      }
      const email = decode.email;
      const sql = `UPDATE user SET enabled = true WHERE email = "${email}" `;
      connection.query(sql, (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json({ msg: "Ok, puedes cambiar la contraseña" });
        }
      });
    });
  };
  // Ruta: .../users/changePass
  changePass = (req, res) => {
    const { token, password } = req.body;
    console.log(password);
    console.log(password.pass1);

    if (password.pass1 === password.pass2) {
      jwt.verify(token, process.env.TOKEN_EMAIL_SECRET, (err, decode) => {
        if (err) {
          return res
            .status(400)
            .json({ err, msg: "Token expirado o invalido" });
        } else {
          let saltRounds = 8;
          bcrypt.genSalt(saltRounds, (err, saltRounds) => {
            bcrypt.hash(password.pass1, saltRounds, (err, hash) => {
              if (err) {
                res.status(500).json("hay algun error");
              }

              const email = decode.email;
              const sql = `UPDATE user SET password = "${hash}" WHERE email = "${email}" `;

              connection.query(sql, (err, result) => {
                if (err) {
                  res.status(500).json(err);
                } else {
                  res
                    .status(200)
                    .json({ msg: "Has cambiado con éxito tu contraseña" });
                }
              });
            });
          });
        }
      });
    } else {
      res.status(500).json({ msg: "Las contraseñas no coinciden" });
    }
  };

  // Ruta: .../users/deleteUser
  deleteUser = (req, res) => {
    const { user_id } = req.body;
    console.log(user_id);

    let sql = `UPDATE user SET name="", lastname=null, email=null, phone_number=null, img="perfil-default.png", deleted=true WHERE user_id=${user_id}`;
    
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };
}

// Probar subida

module.exports = new userController();
