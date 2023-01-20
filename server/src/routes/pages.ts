const _express = require("express")
const isAuth = require("../middleware/isAuth")
const pagesController = require("../controllers/pages")

const router = _express.Router()

// GET /pages
router.get("/", isAuth, pagesController.getPages)

module.exports = router