let connection = require("../config/db");
require("dotenv").config();

// Ruta: .../questions/addQuestion
class questionController {

    allQuestions = (req, res) => {
        let sql = "SELECT question.question_id, question.question_title, question.enabled, COUNT(answer.answer_text) AS number_of_answers FROM question LEFT JOIN answer ON question.question_id = answer.question_id GROUP BY question.question_id, question.question_title, question.enabled";

        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            } 
            else {
                res.status(200).json(result);
            }
            });
    }

    
    addQuestion = (req, res) => {
        const {question_title} = req.body;
        const sql = `INSERT INTO question (question_title) VALUES ("${question_title}")`
        
        connection.query(sql, (err, result) => {
            if(err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json("Todo ok")
            }
        })
    }

    changeEnabledQuestion = (req, res) => {
        const {question_id} = req.body;
        
        const sql = `UPDATE question SET enabled = NOT enabled WHERE question_id = ${question_id}`
        
        connection.query(sql, (err, result) => {
            if(err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json("Todo ok, estado cambiado")
            }
        })
    }
    
    deleteQuestion = (req, res) => {
        const {question_id} = req.body;
        
        const sql = `DELETE FROM question WHERE question_id = ${question_id};`
        
        connection.query(sql, (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
                res.status(200).json("Todo ok")
            }
        })
    }
    
}

module.exports = new questionController();