express = require('express');
router = express.Router();
const mysql = require('mysql2');
const sessions = require('express-session');
const db = require('../config/SQLConfig');
const books = require("./books");


// one day session
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
router.use(sessions({
    secret: "adfm34idfs0df4nvl33l0d",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));


//username and password kasneje v sql
const myusername = 'user'
const mypassword = 'pass'

// a variable to save a session
var session;
router.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.sendFile('./strani/notr.html',{root:__dirname});
    } else {
        res.sendFile('./strani/index.html',{root:__dirname})
    }
});

router.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.sendFile('./strani/notr.html',{root:__dirname});
    } else {
        res.sendFile('./strani/wrong.html',{root:__dirname});
    }
})

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

// can access book api only if authenticated
router.use("/api", (req,res,next)=>{
    if(session.userid){
        next();
    } else {
        res.send("not authenticated");
    }
}, books);

module.exports = router;