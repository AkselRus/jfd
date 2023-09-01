const express = require("express");
const Product = require("../models/Product");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const {
    addProduct,
    removeProduct,
    saveNotes,
} = require("../product.controller");

router.patch("/:prodId", async (req, res) => {
    try {
        const { prodId } = req.params;

        if (prodId) {
            const updateProd = await Product.findByIdAndUpdate(
                prodId,
                req.body,
                {
                    new: true,
                }
            );
            res.send(updateProd);

            const list = await Product.find();
            saveNotes(list);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.post("/", upload.single("avatar"), async (req, res) => {
    try {
        const newProd = await Product.create({ ...req.body });
        addProduct(newProd);
        const list = await Product.find();

        // res.status(201).send({ prodId: newProd._id });
        res.status(201).send(list);
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.delete("/:prodId", async (req, res) => {
    try {
        const { prodId } = req.params;
        removeProduct(prodId);
        await Product.findById(prodId);
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const list = await Product.find();
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
