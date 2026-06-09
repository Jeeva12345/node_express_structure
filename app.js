const express = require("express");
const cors = require("cors");
console.log("llllll")
const logger = require("./middleware/logger");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

// Routes
app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Home Page");
});

module.exports = app;
