const {validationResult} = require('express-validator')

const validate = (req, res, next) => {
  const errors = validationResult(req)
      if(!errors.isEmpty()){
        const values = req.body;
        const validations = errors.array()
        console.log(validations);
        console.log(values);
        return res.status(400).json({validations, values})
      }
  next();
}

module.exports = validate;