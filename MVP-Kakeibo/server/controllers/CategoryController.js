let connection = require("../config/db");

class categoryController {
  allCategories = (req, res) => {
    let sql = `SELECT * from category`;

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

module.exports = new categoryController();
