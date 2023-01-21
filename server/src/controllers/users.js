const { validationResult } = require("express-validator")
const { randomBytes } = require("crypto")
const { promisify } = require("util")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/user")

const signup = async (req, res, next) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const name = req.body.name

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errArray = errors.array()
            const err = new Error(errArray[0].msg)
            err.statusCode = 422
            err.data = errArray
            throw err
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            const err = new Error("E-Mail address already exists.")
            err.statusCode = 422
            throw err
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const activationToken = (await promisify(randomBytes)(20)).toString("hex")
        const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
            activationToken: activationToken,
        })
        const savedUser = await user.save()

        const token = jwt.sign(
            { userId: savedUser._id.toString() },
            process.env.JWT_KEY
        )

        const maxAge = 1000 * 60 * 60 * 24 * 3 // 3 days
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: maxAge,
            domain: process.env.DOMAIN,
        })

        res.status(201).json({
            message: "User successfully created.",
            userId: savedUser._id,
        })
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const err = new Error("Input validation failed.")
            err.statusCode = 422
            err.data = errors.array()
            throw err
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            const err = new Error("An user with this email could not be found.")
            err.statusCode = 404
            throw err
        }

        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            const err = new Error("Wrong password.")
            err.statusCode = 401
            throw err
        }

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_KEY
        )

        const maxAge = 1000 * 60 * 60 // 1 hour
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: maxAge,
            domain: process.env.DOMAIN,
        })

        res.status(201).json({
            message: "User successfully logged in.",
            token: token,
            userId: user._id.toString(),
        })
    } catch (err) {
        next(err)
    }
}

exports.signup = signup
exports.login = login