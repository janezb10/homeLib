const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

router.get("/kn",(req,res) => {
    res.send("traaa")
});




module.exports = router;