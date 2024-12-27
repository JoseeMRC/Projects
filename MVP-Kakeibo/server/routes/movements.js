var express = require("express");
const movementController = require("../controllers/movementController");
const graphicController = require("../controllers/graphicController");
var router = express.Router();

router.post("/create", movementController.createMovement);
router.delete("/delMovement/:id", movementController.delMovement);
router.put("/edit", movementController.editMovement);
router.get("/filter", movementController.filterMovements);
router.post("/graphicByMonth/:user_id", graphicController.graphicByMonth)

module.exports = router;
