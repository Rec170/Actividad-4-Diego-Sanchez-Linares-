const express = require("express");
const Product = require("../models/product");
const { verifyToken } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get(
  "/",
  verifyToken,
  async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/:id",
  verifyToken,
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.patch(
  "/:id/stock",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { stock } = req.body;

      if (stock === undefined) {
        return res.status(400).json({ message: "Debe enviar el campo stock" });
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { stock },
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      res.status(200).json({
        message: "Producto eliminado correctamente"
      });

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
