const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env")
});

const app = require("./app");
const connectDB = require("./config/config/db");

connectDB();

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
