const mongoose = require("mongoose");

const { UserSchema } = require("./user");
const { MovieSchema } = require("./movie");

const ReviewSchema = new mongoose.Schema(
    {
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
        },
        reviewItems: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                rating: { type: Number, min: 0, max: 10, default: 0 },
                text: { type: String },
                status: { type: Boolean, default: true },
                create: {type: Date, default: Date.now()}
            }
        ]

    },
    { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { Review, ReviewSchema };