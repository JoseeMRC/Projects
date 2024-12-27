let connection = require("../config/db");

class adminController {
  allUsers = (req, res) => {
    let sql = "SELECT * FROM user";

    connection.query(sql, (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };
  createCategory = (req, res) => {
    const { category_title, category_icon } = req.body;
    console.log(req.body);
    if (!category_icon || !category_title) {
      res.status(400).json({ error: "Completar campos" });
      console.log("Error: Datos erróneos");

      return;
    }

    // Comprobar si ya existe una categoría con el mismo título
    const checkSql = `SELECT * FROM category WHERE category_title = ?`;

    connection.query(checkSql, [category_title], (checkErr, checkResult) => {
      if (checkErr) {
        res.status(500).json(checkErr);
        return;
      }

      if (checkResult.length > 0) {
        res.status(400).json({ error: "La categoría ya existe" });
        console.log("Error: La categoría ya existe");
        return;
      }

      // Si no existe, insertar la nueva categoría
      const insertSql = `INSERT INTO category (category_title, category_icon) VALUES (?, ?)`;

      connection.query(
        insertSql,
        [category_title, Number(category_icon)],
        (insertErr, insertResult) => {
          if (insertErr) {
            res.status(400).json({ insertErr: "Seleccionar icono" });
          } else {
            res.status(200).json(insertResult);
            console.log(insertResult);
          }
        }
      );
    });
  };

  editCategory = (req, res) => {
    const { category_id, category_title, category_icon } = req.body;

    if (!category_id || !category_icon || !category_title) {
      res.status(500).json("Datos erróneos");
    } else {
      console.log("EEEEYYY3");
      let sql = `UPDATE category SET category_title ='${category_title}', category_icon ='${category_icon}' WHERE category_id = ${category_id};`;

      connection.query(sql, (err, result) => {
        if (err) {
          res.status(500).json(err);
          console.log("EEEYYYY");
        } else {
          res.status(200).json(result);
          console.log(result);
        }
      });
    }
  };

  delCategory = (req, res) => {
    const { category_id } = req.params;
    let sql = `DELETE FROM category WHERE category_id=${category_id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    });
  };
}

module.exports = new adminController();
