let connection = require("../config/db");

class MovementController {
  // Método para crear un movimiento
  createMovement = (req, res) => {
    const {
      title,
      movement_import,
      movement_type,
      user_id,
      category_id,
      goal_id,
      date,
    } = req.body;

    // Validación de los campos requeridos
    if (
      !title ||
      !movement_import ||
      !movement_type ||
      !user_id ||
      !category_id ||
      !date
    ) {
      return res.status(400).json({ error: "Completar campos requeridos" });
    }

    let insertSql;
    let queryParams;

    if (goal_id === "") {
      insertSql = `
      INSERT INTO movement (title, date, movement_import, movement_type, user_id, category_id) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

      queryParams = [
        title,
        date,
        movement_import,
        Number(movement_type),
        user_id,
        category_id,
      ];
    } else {
      insertSql = `
      INSERT INTO movement (title, date, movement_import, movement_type, user_id, category_id, goal_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

      queryParams = [
        title,
        date,
        movement_import,
        Number(movement_type),
        user_id,
        category_id,
        goal_id,
      ];
    }

    connection.query(insertSql, queryParams, (err, result) => {
      if (err) {
        console.log("Error en la base de datos:", err);
        return res.status(500).json({ error: "Error en la base de datos" });
      } else {
        console.log("Movimiento creado:", result);
        return res.status(201).json(result);
      }
    });
  };

  // Método para editar un movimiento
  editMovement = (req, res) => {
    const { movement_id, movement_import, title, date, category_id } = req.body;
    console.log(category_id);

    if (!movement_import || !title || !date || !category_id) {
      return res.status(400).json({ error: "Completar campos requeridos" });
    }

    const updateSql = `
      UPDATE movement 
      SET movement_import = ?, title = ?, date = ?, category_id = ?
      WHERE movement_id = ?
    `;

    console.log(req.body);

    connection.query(
      updateSql,
      [movement_import, title, date, category_id, movement_id],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar movimiento:", err);
          return res
            .status(500)
            .json({ error: "Error al actualizar movimiento" });
        } else {
          console.log("Movimiento actualizado:", result);
          return res.status(200).json(result);
        }
      }
    );
  };

  // Método para eliminar un movimiento
  delMovement = (req, res) => {
    const { id } = req.params;
    console.log(id);

    const deleteSql = `DELETE FROM movement WHERE movement_id = ?`;

    connection.query(deleteSql, [id], (err, result) => {
      if (err) {
        console.error("Error al eliminar movimiento:", err);
        return res.status(500).json({ error: "Error al eliminar movimiento" });
      } else {
        console.log("Movimiento eliminado:", result);
        return res.status(200).json(result);
      }
    });
  };

  // Método para filtrar movimientos
  filterMovements = (req, res) => {
    const { name, from, to, user_id } = req.query;
    let query = "SELECT * FROM movement WHERE user_id = ?";
    let queryParams = [user_id];

    if (name) {
      query += " AND title LIKE ?";
      queryParams.push(`%${name}%`);
    }

    if (from) {
      query += " AND date >= ?";
      queryParams.push(from);
    }

    if (to) {
      query += " AND date <= ?";
      queryParams.push(to);
    }

    connection.query(query, queryParams, (err, results) => {
      if (err) {
        console.error("Error al filtrar movimientos:", err);
        return res.status(500).json({ error: "Error al filtrar movimientos" });
      } else {
        return res.status(200).json(results);
      }
    });
  };
}

module.exports = new MovementController();
