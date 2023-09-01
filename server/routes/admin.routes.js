const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.patch("/:prodId", auth, async (req, res) => {
    try {
        const { prodId } = req.params;

        if (prodId) {
            const updateProd = await Product.findByIdAndUpdate(
                updateProd,
                req.body,
                {
                    new: true,
                }
            );
            res.send(updateProd);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.put("/", auth, async (req, res) => {
    try {
        const newProd = Product.create({ ...req.body });
        res.status(201).send({ prodId: newProd._id });
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.delete("/:prodId", auth, async (req, res) => {
    try {
        const { prodId } = req.params;
        await User.findByIdAndDelete(prodId);
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});
router.get("/", auth, async (req, res) => {
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
