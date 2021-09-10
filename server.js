require("dotenv").config({ path: "./config/config.env" });
const path = require("path");
const express = require("express");
const app = express();
const cloudinary = require("cloudinary").v2;

const connectDB = require("./config/DB");
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
// app.use(express.static(path.join(__dirname, "./uploads/")));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
// app.use("*/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is Running at Port: ${PORT}`));
