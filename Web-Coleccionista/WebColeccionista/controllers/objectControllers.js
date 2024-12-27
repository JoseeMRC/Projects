const connection = require("../config/db");

class ObjectControllers {
  showObjects = (req, res) => {
    let sql = `SELECT * FROM object WHERE is_deleted = false`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("allObjects", { result });
    });
  };

  showOneObject = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM object WHERE object_id = ? AND is_deleted = false`;
    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error en la consulta:", err);
        return res.status(500).send("Error al obtener el objeto");
      }
  
      if (result.length === 0) {
        return res.status(404).send("Objeto no encontrado");
      }
  
      // Redirige a la vista con el objeto actualizado
      res.render("oneObject", { result: result[0] });
    });
  };
  

  subirObjeto = (req, res) => {
    res.render("subirObjeto");
  };

  showFormAddObject = (req, res) => {
    const coleccionist_id = req.params.id;
    res.render("formAddObject", { coleccionist_id });
  };

  addObject = (req, res) => {
    const coleccionist_id = req.params.id;
    const { name, year_adquisition, description } = req.body;
    let sql = `INSERT INTO object (name, year_adquisition, description, coleccionist_id) VALUES (?, ?, ?, ?)`;
    const params = [name, year_adquisition, description, coleccionist_id];

    if (req.file) {
      sql = `INSERT INTO object (name, year_adquisition, description, coleccionist_id, img) VALUES (?, ?, ?, ?, ?)`;
      params.push(req.file.filename);
    }

    connection.query(sql, params, (err, result) => {
      if (err) throw err;
      res.redirect(`/coleccionists`);
    });
  };

  formEditObject = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM object WHERE object_id = ? AND is_deleted = false`;

    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error en la base de datos");
      }

      if (result.length === 0) {
        return res.status(404).send("Objeto no encontrado");
      }

      res.render("formEditObject", { result: result[0] });
    });
  };

  // Método para editar un objeto
  editObject = (req, res) => {
    const { id } = req.params;  // Obtener el ID del objeto
    const { name, year_adquisition, description } = req.body;
    let sql = `UPDATE object SET name = ?, year_adquisition = ?, description = ? WHERE object_id = ?`;
    const params = [name, year_adquisition, description, id];
  
    if (req.file) {
      sql = `UPDATE object SET name = ?, year_adquisition = ?, description = ?, img = ? WHERE object_id = ?`;
      params.push(req.file.filename);
    }
  
    connection.query(sql, params, (err, result) => {
      if (err) {
        console.error("Error al actualizar el objeto:", err);
        return res.status(500).send("Error al actualizar el objeto");
      }
  
      // Redirige a la vista del objeto después de la actualización
      res.redirect(`/objects/oneObject/${id}`);
    });
  };
  

  // Método para eliminar un objeto
  deleteObject = (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM object WHERE object_id = ?`;
    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.redirect("/index");
    });
  };
}

module.exports = new ObjectControllers();
