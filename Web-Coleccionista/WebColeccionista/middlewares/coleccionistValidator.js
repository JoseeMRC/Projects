const {body} = require('express-validator')

const validateColeccionistRules = [
  body('interest', 'Campo obligatorio, mínimo 5 caracteres, máximo 1000').exists().isLength({min:5, max:1000}),
  body('email', 'Por favor, intruzca un email válido').exists().isEmail(),
  body('password', 'La ontraseña introducida no cumple los requisitos establecidos').exists().custom(value=>{
    if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)){
      throw new Error('La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener al menos 8 carácteres')
  }
  return true
  }),
  body('description', 'Máximo 1000 caracteres').exists().isLength({min:10, max:1000}),
  body('number_phone'),
  body('first_name','Máximo 20 caracteres').exists().isLength({min:1, max:20}),
  body('last_name','Máximo 60 caracteres').exists().isLength({min:5, max:60})
  
]

module.exports = validateColeccionistRules;