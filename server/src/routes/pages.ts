const _express = require("express")
const isAuth = require("../middleware/isAuth")

const router = _express.Router()

// GET /pages
router.get("/", isAuth, (_req: any, res: any) => {
    res.send('hello')
})

module.exports = router