var express = require("express");
const categoryController = require("../controllers/CategoryController");
var router = express.Router();

router.post("/create", categoryController.createCategory);
router.put("/edit", categoryController.editCategory);
router.delete("/delCategory/:category_id", categoryController.delCategory);
router.get("/allcategories", categoryController.allCategories);

module.exports = router;
