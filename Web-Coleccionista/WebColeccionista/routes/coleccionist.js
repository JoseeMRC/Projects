var express = require('express');
var router = express.Router();
const coleccionistCrontollers = require('../controllers/coleccionistControllers');
const multer = require('../middlewares/multer')
const validateColeccionistRules  = require('../middlewares/coleccionistValidator');


/* GET users listing. */
router.get('/', coleccionistCrontollers.showColeccionist);
router.get('/createColeccionist', coleccionistCrontollers.formCreateColeccionist);
router.post('/createColeccionist', multer("coleccionist"), validateColeccionistRules, coleccionistCrontollers.addColeccionist);
router.get('/editColeccionist', coleccionistCrontollers.editColeccionist);
router.get('/login', coleccionistCrontollers.showLogin);
router.post('/login', coleccionistCrontollers.login);
router.get('/formEditColeccionist/:id', coleccionistCrontollers.showEditColeccionist);
router.post('/editColeccionist/:id', multer("coleccionist"), coleccionistCrontollers.editColeccionist);
router.get('/oneColeccionist/:id', coleccionistCrontollers.getOneColeccionist);
router.get('/oneColeccionistLogged/:id', coleccionistCrontollers.getOneColeccionistLogged)
router.get('/deleteLogicColeccionist/:id', coleccionistCrontollers.deleteLogicColeccionist)


module.exports = router;
