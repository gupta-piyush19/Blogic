require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const app = express();

const connectDB = require("./config/DB");
connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is Running at Port: ${PORT}`));
