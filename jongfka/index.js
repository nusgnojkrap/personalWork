const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(4444, () => {
    console.log(`server is listening at localhost:`);
});

// function jongfka() {

// }

// jongfka();
