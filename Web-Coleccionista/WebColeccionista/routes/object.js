var express = require('express');
var router = express.Router();
const objectControllers = require('../controllers/objectControllers');
const multer = require('../middlewares/multer')



router.get('/',  objectControllers.showObjects);
router.get('/oneObject/:id', objectControllers.showOneObject);
router.get('/formEditObject/:id', objectControllers.formEditObject)
router.get('/subirObjeto', objectControllers.subirObjeto)
router.get('/formAddObject/:id', objectControllers.showFormAddObject);
router.post('/addObject/:id', multer("objects"), objectControllers.addObject);
router.post('/editObject/:id', multer("objects"),objectControllers.editObject);
router.get('/deleteObject/:id', objectControllers.deleteObject);


module.exports = router; 