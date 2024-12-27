const connection = require('../config/db') 

class IndexControllers {
  showHome = (req, res) => {
    let sql = 'SELECT * FROM coleccionist WHERE is_deleted = false';
    connection.query(sql, (err, result)=>{
      if(err) throw err;
      res.render('index', {result})
    })

  }
}


module.exports = new IndexControllers();