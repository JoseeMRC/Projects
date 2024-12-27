var express = require('express');
var router = express.Router();
const questionController = require('../controllers/questionController')

//localhost:3000/questions/
router.get('/allQuestions', questionController.allQuestions);
router.post('/addQuestion', questionController.addQuestion);
router.patch('/changeEnabledQuestion', questionController.changeEnabledQuestion);
router.delete('/deleteQuestion', questionController.deleteQuestion);

module.exports = router;
