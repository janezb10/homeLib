require('dotenv').config();
const express = require('express');
const app = express();
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./static"));
app.use("/", routes);



// Global Error Handler.
app.use((err, req, res, next) => {
    console.log("error: " + err.stack);
    console.log("error: " + err.name);
    console.log("error: " + err.code);

    res.status(500).json({
        errorMessage: err.message || "Something went rely wrong",
    });
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));