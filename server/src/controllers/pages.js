const fs = require("fs")
const path = require("path")

const Page = require("../models/page")
const User = require("../models/user")

const getPages = async (req, res, next) => {
    const userId = req.userId

    try {
        if (!userId) {
            const err = new Error("User is not authenticated.")
            err.statusCode = 401
            throw err
        }

        const user = await User.findById(userId)

        if (!user) {
            const err = new Error("Could not find user by id.")
            err.statusCode = 404
            throw err
        }

        res.status(200).json({
            message: "Fetched pages successfully.",
            pages: user.pages.map((page) => page.toString()),
        })
    } catch (err) {
        next(err)
    }
}

const getPage = async (req, res, next) => {
    const userId = req.userId
    const pageId = req.params.pageId

    try {
        const page = await Page.findById(pageId)
        if (!page) {
            const err = new Error("Could not find page by id.")
            err.statusCode = 404
            throw err
        }

        // Public pages have no creator, they can be accessed by anybody
        // For private pages, creator and logged-in user have to be the same
        const creatorId = page.creator ? page.creator.toString() : null
        if ((creatorId && creatorId === userId) || !creatorId) {
            res.status(200).json({
                message: "Fetched page successfully.",
                page: page,
            })
        } else {
            const err = new Error("User is not authenticated.")
            err.statusCode = 401
            throw err
        }
    } catch (err) {
        next(err)
    }
}

exports.getPages = getPages
exports.getPage = getPage