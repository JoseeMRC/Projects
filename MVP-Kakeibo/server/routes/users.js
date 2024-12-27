var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const uploadImage = require('../middlewares/multer');
const verify = require("../middlewares/tokenVerify");
const validationUser = require('../middlewares/validationUser');
const validate  = require('../middlewares/validate');

router.post('/register', validationUser, validate, userController.register);//ruta registro
router.post('/login', userController.login);//ruta de login
router.get('/resendVerification/', userController.resendVerification);//ruta para volver a enviar de verificacion 
router.get('/verify/:token', userController.verify); //ruta de verificacion de email
router.put('/changeNewUser/:user_id', userController.changeNewUser);
router.get('/oneUser/:id', verify.tokenVerify, userController.oneUser); 
router.get('/editAnswer', userController.showEditAnswer); //ruta para editar las respuestas del user
router.put('/editAnswer', userController.editAnswer);
router.put('/editUser', uploadImage("users"), userController.editUser); //ruta para editar el user
router.get('/passResetLink', userController.passResetLink);
router.get('/verifyPass/:token', userController.verifyPass); //ruta de verificación del token para cambiar la contraseña
router.patch('/changePass', userController.changePass); //Ruta para cambiar la contraseña (por fin)

router.put('/deleteUser', userController.deleteUser); //ruta para borrar el user logicamente ("anonimizarlo")
module.exports = router;
