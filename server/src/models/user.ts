const _mongoose = require("mongoose")
const _Schema = _mongoose.Schema

const userSchema = new _Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
            default: false,
        },
        activationToken: {
            type: String,
        },
        resetToken: {
            type: String,
        },
        resetTokenExpiry: {
            type: Number,
        },
        pages: [
            {
                type: _Schema.Types.ObjectId,
                ref: "Page",
            },
        ],
    },
    { timestamps: true }
)

module.exports = _mongoose.model("User", userSchema)