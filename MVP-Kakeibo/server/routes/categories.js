var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/allcategories", categoryController.allCategories);

module.exports = router;
