const express = require("express")
const isAuth = require("../middleware/isAuth")
const pagesController = require("../controllers/pages")

const router = express.Router()

// GET /api/pages
router.get("/", isAuth, pagesController.getPages)

// GET /api/pages/{id}
router.get("/:pageId", isAuth, pagesController.getPage)

// POST /api/pages
router.post("/", isAuth, pagesController.postPage)

// PUT /api/pages/{id}
router.put("/:pageId", isAuth, pagesController.putPage)

module.exports = router