require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const app = express();

const connectDB = require("./config/DB");
connectDB();



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is Running at Port: ${PORT}`));