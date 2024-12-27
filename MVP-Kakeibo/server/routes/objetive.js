const express = require('express');
const ObjetiveController = require('../controllers/ObjetiveController')
var router = express.Router();

router.put('/editObjetive/:goal_id', ObjetiveController.editObjetive)
router.post('/create/:user_id', ObjetiveController.createObjetive);
router.get('/allObjetives/:user_id', ObjetiveController.allObjetives)
router.delete('/oneObjetiveDelete/:goal_id', ObjetiveController.objetiveDelete)
router.get('/oneObjetive/:user_id/:goal_id', ObjetiveController.oneObjetive)



module.exports = router;