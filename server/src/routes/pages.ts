const _express = require("express")

const router = _express.Router()

// GET /pages
router.get("/", (_req: any, res: any) => {
    res.send('hello')
})

module.exports = router