export const validator = (name, value) => {
  // const reg = /^(?=.*[A-Za-z])[\w\s]{2,40}$/
  let reg = "";
  let msg = "";
  let isRequired = false;

  switch (name) {
    case "name":
      reg = /^(?=.*[A-Za-z])[\w\s]{2,40}$/
      isRequired = true;
      msg = "Nombre no válido"
      break;

    case "lastname":
      reg = /^(|(?=.*[A-Za-z])[\w\s\W]{2,80})$/
      msg = "Apellido no válido"
      break;
    
    case "phone_number":
      reg = /^$|^[0-9\s\-+]{6,49}$/;
      if (value.length < 6 || value.length > 49) {
        msg = "El número de teléfono debe de tener entre 6 y 49 carácteres"
      }
      else {
        msg = 'El número de teléfono solo puede contener números del 0 al 9, espacios en blanco y los símbolos "-" y "+"'
      }
      break;
      
    case "email": 
      reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      isRequired = true;
      msg = "Correo electrónico no válido"
      break;

    case "pass1":
      reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\s,.\-+*]{6,16}$/
      isRequired = true;
      if (value.length < 6 || value.length > 16) {
        msg = "La contraseña debe de tener entre 6 y 16 carácteres"
      }
      else {
        msg = "La contraseña debe contener al menos  una letra mayúscula, una minúscula y un número. Los símbolos admitidos son: {-}, {+}, {.}, {,}, {*}"
      }
      break;

    case "pass2":
      isRequired = true;
      break;
  }
  
  // Mensage a retornar si el campo es obligatorio y está vacío
  if (isRequired && value.length === 0) {
    return "Este campo es obligatorio"
  }

  // Retornar false si no hay ningún error al pasar por las validaciones (o no hay validaciones)
  else if (reg === "" || value.match(reg)) {
    return false;
  }

  // Mensaje a retornar si hay algún error al pasar por las validaciones.
  else {
    return msg;
  }
};


