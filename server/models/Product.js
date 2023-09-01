const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: { type: String },
        image: { type: String },
        bookmark: { type: Boolean },
        like: { type: Schema.Types.ObjectId, ref: "User" },
        categories: { type: Schema.Types.ObjectId, ref: "Category" },
        category: { type: String },
        description: { type: String },
        price: { type: Number },
        quantity: { type: Number },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Product", schema);
