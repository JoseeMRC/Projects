var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/allUsers", adminController.allUsers);
router.put("/editcategory", adminController.editCategory);
router.delete("/delcategory/:category_id", adminController.delCategory);
router.post("/createcategory", adminController.createCategory);

module.exports = router;
