const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        image: { type: String },
        birthDay: { type: Date },
        licence: { type: Boolean },
        sex: { type: String, enum: ["male", "female", "other"] },
        // purchases: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        purchases: [
            {
                count: { type: Number },
                price: { type: Number },
                prodId: { type: Schema.Types.ObjectId, ref: "Product" },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", schema);
