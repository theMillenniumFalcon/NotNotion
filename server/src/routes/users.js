const __express = require("express")
const { body } = require("express-validator")

const _isAuth = require("../middleware/isAuth")
const usersController = require("../controllers/users")

const _router = __express.Router()

const emailValidator = body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email Address is not valid.")
const passwordValidator = body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password has to be 6 chars or more.")
const nameValidator = body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")

// POST /api/users/signup
_router.post(
    "/signup",
    [emailValidator, passwordValidator, nameValidator],
    usersController.signup
)

module.exports = _router