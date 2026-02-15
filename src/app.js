const express = require("express");
const cors = require("cors");

const productsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;