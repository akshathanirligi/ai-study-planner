const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config({
    path: "./server/.env"
});

const studyRoutes =
    require("./routes/studyRoutes");

const authRoutes =
    require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/study", studyRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {

    res.send("Backend Running");
});

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

})

.catch((error) => {

    console.log(error);
});

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );
});