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

exports.getPages = getPages