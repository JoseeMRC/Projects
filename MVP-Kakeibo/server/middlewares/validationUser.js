const { body } = require('express-validator');

const validateUserRules = [
  body('name', 'Nombre no válido')
      .exists().withMessage('El nombre es obligatorio.')
      .isLength({ min: 2, max: 40 }).withMessage('El nombre debe tener entre 2 y 40 caracteres.')
      .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo puede contener letras y espacios.'),

  body('lastname', "Apellido no válido").custom(value => {
      if (value === "") {
        return true;
      }
      else if (!/^(?=.*[A-Za-z])[\w\s]{2,80}$/.test(value)) {
        throw new Error("Apellido no válido");
      }
      return true;
  }),

  body('phone_number', ' Número de teléfono no válido ').custom(value => {
    if (value === "") {
      return true;
    }
    else if (!/^[\d+-\s]+$/.test(value)) {
      throw new Error(' El número de teléfono solo puede contener números del 0 al 9, espacios en blanco y los símbolos "-" y "+" ');
    }
    else if (value.length < 6 || value.length > 49) {
      throw new Error("El número de teléfono debe de tener entre 6 y 49 carácteres");
    }
    return true;
  }),

  body('email', "Correo electrónico no válido")
      .exists().withMessage('El correo electrónico es obligatorio.')
      .isEmail().withMessage('Debe ser un correo electrónico válido.'),

  body('pass1', 'Contraseña no válida')
      .exists().withMessage('La contraseña es obligatoria.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\s,.\-+*]{6,16}$/)
      .withMessage('La contraseña debe contener entre 6 y 16 caracteres, una letra mayúscula, una minúscula y un número. Solo puede contener los símbolos {-}, {+}, {.}, {,}, {*}.')
];

module.exports = validateUserRules;