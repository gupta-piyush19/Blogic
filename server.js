require("dotenv").config({ path: "./config/config.env" });
const path = require("path");
const express = require("express");
const app = express();

const connectDB = require("./config/DB");
connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, "./uploads/")));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("*/uploads", express.static("uploads"));

// Default Route
app.get("*", (req, res) => {
  res.send("Hello from API");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is Running at Port: ${PORT}`));
