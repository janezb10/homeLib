require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();

// one day session
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "adfm34idfs0df4nvl33l0d",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./static"));

//username and password kasneje v sql
const myusername = 'user'
const mypassword = 'pass'

// a variable to save a session
var session;

app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.sendFile('./strani/notr.html',{root:__dirname});
    }else
    res.sendFile('./strani/index.html',{root:__dirname})
});

app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.sendFile('./strani/notr.html',{root:__dirname});
    }
    else{
        res.sendFile('./strani/wrong.html',{root:__dirname});
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));