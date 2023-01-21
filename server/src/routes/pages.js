const express = require("express")
const isAuth = require("../middleware/isAuth")
const pagesController = require("../controllers/pages")

const router = express.Router()

// GET /api/pages
router.get("/", isAuth, pagesController.getPages)

module.exports = router