const connection = require("../config/db");

class ObjetiveController {
  allObjetives = (req, res) => {
    const { user_id } = req.params;
    const sql = `
      SELECT *,
        (SELECT COALESCE(SUM(movement_import), 0) FROM movement WHERE movement.goal_id = goal.goal_id AND movement_type = 1) AS totalSaved,
        (SELECT COALESCE(SUM(movement_import), 0) FROM movement WHERE movement.goal_id = goal.goal_id AND movement_type = 2) AS totalSpent,
        CASE 
          WHEN TIMESTAMPDIFF(MONTH, start_date, limit_date) <= 18 THEN 'short_term'
          WHEN TIMESTAMPDIFF(MONTH, start_date, limit_date) BETWEEN 19 AND 36 THEN 'medium_term'
          ELSE 'long_term'
        END as term
      FROM goal
      WHERE user_id = ?`;

    connection.query(sql, [user_id], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  oneObjetive = (req, res) => {
    const { goal_id, user_id } = req.params;

    const sqlGoal = `SELECT * FROM goal WHERE goal_id = ? AND user_id = ?`;

    const sqlMovements = `
      SELECT 
        movement.*, 
        category.category_icon 
      FROM 
        movement 
      JOIN 
        category ON movement.category_id = category.category_id 
      WHERE 
        movement.goal_id = ? 
        AND movement.user_id = ?
      ORDER BY DATE DESC`;

    const sqlTotalAmount = `
      SELECT *,
        (SELECT COALESCE(SUM(movement_import), 0) FROM movement WHERE movement.goal_id = goal.goal_id AND movement_type = 1) AS totalSaved,
        (SELECT COALESCE(SUM(movement_import), 0) FROM movement WHERE movement.goal_id = goal.goal_id AND movement_type = 2) AS totalSpent,
        CASE 
          WHEN TIMESTAMPDIFF(MONTH, start_date, limit_date) <= 18 THEN 'short_term'
          WHEN TIMESTAMPDIFF(MONTH, start_date, limit_date) BETWEEN 19 AND 36 THEN 'medium_term'
          ELSE 'long_term'
        END as term
      FROM goal
      WHERE 
        goal_id = ? 
        AND user_id = ?`;

    connection.query(sqlGoal, [goal_id, user_id], (err, resultGoal) => {
      if (err) {
        return res.status(500).json(err);
      }

      connection.query(sqlMovements, [goal_id, user_id], (errMovements, resultMovements) => {
        if (errMovements) {
          return res.status(500).json(errMovements);
        }

        connection.query(sqlTotalAmount, [goal_id, user_id], (errTotalAmount, resultTotalAmount) => {
          if (errTotalAmount) {
            return res.status(500).json(errTotalAmount);
          }

          const goalData = resultGoal[0];
          const movements = resultMovements;

          res.status(200).json({
            goal: goalData,
            movements: movements,
            totalAmount: resultTotalAmount,
          });
        });
      });
    });
  };

  createObjetive = (req, res) => {
    const { user_id } = req.params;
    const { goal_amount, limit_date, goal_name, goal_icon } = req.body;

    const sql = `INSERT INTO goal (goal_amount, limit_date, goal_name, goal_icon, user_id) VALUES (?, ?, ?, ?, ?)`;

    connection.query(sql, [goal_amount, limit_date, goal_name, goal_icon, user_id], (err, result) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  editObjetive = (req, res) => {
    const { goal_id } = req.params;
    const { goal_amount, limit_date, goal_name, goal_icon } = req.body;

    let sql = `UPDATE goal SET goal_amount = ?, limit_date = ?, goal_name = ?`;
    const values = [goal_amount, limit_date, goal_name];

    if (goal_icon !== undefined) {
      sql += `, goal_icon = ?`;
      values.push(goal_icon);
    }

    sql += ` WHERE goal_id = ?`;
    values.push(goal_id);

    connection.query(sql, values, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  objetiveDelete = (req, res) => {
    const { goal_id } = req.params;
    const sql = `DELETE FROM goal WHERE goal_id = ?`;

    connection.query(sql, [goal_id], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };
}

module.exports = new ObjetiveController();
