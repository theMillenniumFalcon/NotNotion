const express = require("express")
const isAuth = require("../middleware/isAuth")
const pagesController = require("../controllers/pages")

const router = express.Router()

// GET /api/pages
router.get("/", isAuth, pagesController.getPages)

// GET /api/pages/{id}
router.get("/:pageId", isAuth, pagesController.getPage)

module.exports = router