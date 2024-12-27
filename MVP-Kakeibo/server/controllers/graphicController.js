let connection = require("../config/db");

class GraphicController {
  graphicByMonth = (req, res) => {
    const { id } = req.body;
    let sqlDrop = `DROP TABLE IF EXISTS date_reference`
    connection.query(sqlDrop, (errorDrop, result) => {
        if(errorDrop) {
          console.log(errorDrop, "EERRORDROOOOP")
          res.status(500).json(errorDrop)
        
        }

        else {
          console.log(result)
          let sql1 = `CREATE TEMPORARY TABLE date_reference (
            year INT,
            month INT
        )`;
      
          connection.query(sql1, (error) => {
            if (error) {
              console.log("error1", error);
              res.status(500).json(error);
            }
      
            let sql2 = `INSERT INTO date_reference (year, month)
            VALUES 
                (YEAR(CURDATE()), 1), (YEAR(CURDATE()), 2), (YEAR(CURDATE()), 3), (YEAR(CURDATE()), 4), (YEAR(CURDATE()), 5), (YEAR(CURDATE()), 6),
                (YEAR(CURDATE()), 7), (YEAR(CURDATE()), 8), (YEAR(CURDATE()), 9), (YEAR(CURDATE()), 10), (YEAR(CURDATE()), 11), (YEAR(CURDATE()), 12);`;
      
            connection.query(sql2, (error2) => {
              if (error2) {
                console.log("error2", error2);
                 res.status(500).json(error2);
              }
      
              let sql3 = `SELECT 
              dr.year,
              dr.month,
              COALESCE(m.user_id, ${id}) AS user_id,
              1 AS movement_type,
              COUNT(m.movement_id) AS movement_count,
              COALESCE(SUM(m.movement_import), 0) AS total_import,
              (SELECT COALESCE(SUM(m2.movement_import), 0)
               FROM movement m2
               WHERE m2.movement_type = 1 AND m2.user_id = ${id} AND YEAR(m2.date) = dr.year) AS total_ingresos
          FROM 
              date_reference dr
          LEFT JOIN 
              movement m ON YEAR(m.date) = dr.year AND MONTH(m.date) = dr.month AND m.user_id = ${id} AND m.movement_type = 1
          WHERE 
              dr.year = YEAR(CURDATE())
          GROUP BY 
              dr.year, 
              dr.month
          ORDER BY 
              year, 
              month;`
            
      
              connection.query(sql3, (error3, result3) => {
                console.log(result3)
                if (error3) {
                  console.log("error3", error3);
                   res.status(500).json(error3);
                }
                // Consulta para los ingresos (movement_type = 2) con suma total de ingresos
                let sql4 = `
                SELECT 
                    dr.year,
                    dr.month,
                    COALESCE(m.user_id, ${id}) AS user_id,
                    2 AS movement_type,
                    COUNT(m.movement_id) AS movement_count,
                    COALESCE(SUM(m.movement_import), 0) AS total_import,
                    (SELECT COALESCE(SUM(m2.movement_import), 0)
                     FROM movement m2
                     WHERE m2.movement_type = 2 AND m2.user_id = ${id} AND YEAR(m2.date) = dr.year) AS total_gastos
                FROM 
                    date_reference dr
                LEFT JOIN 
                    movement m ON YEAR(m.date) = dr.year AND MONTH(m.date) = dr.month AND m.user_id = ${id} AND m.movement_type = 2
                WHERE 
                    dr.year = YEAR(CURDATE())
                GROUP BY 
                    dr.year, 
                    dr.month
                ORDER BY 
                    year, 
                    month;`
      
                connection.query(sql4, (error4, result4) => {
                  if (error4) {
                    console.log("error4",error4);
                     res.status(500).json(error4);
                  } else {
                       res.status(200).json({result3, result4});
                  }
                })
              })
            });
          });

        }
    })
  };
}

module.exports = new GraphicController();
