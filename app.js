const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

var DATA = JSON.parse(fs.readFileSync(__dirname + '/DB/db.json',{encoding: 'utf-8'}))

//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/signup',(req,res) => {
    res.sendFile(__dirname + '/public/signup.html')
})

app.post('/getinfo',(req,res) => {
    let username = req.body.uName;
    let password = req.body.pass;
 
    let data = {
        "username" : username,
        "password" : password
    }

    DATA.push(data)

    fs.writeFileSync(__dirname + '/DB/db.json',JSON.stringify(DATA))

    res.redirect('/') //This will redirect to the main page
})


app.post('/login',(req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let userFound = false;
    let passcheck = false;
    let success = true;

    DATA.forEach((user) => {
        if(user.username === username) {
            if(user.password === password) {
                
                success =  true
                if(success=== true){
                    res.send({
                        "message" : "Welcome you have logged in"
                    })
                }
            } else {
                passcheck =false
                   if(passcheck === false){
        res.send({
            "message" : "password is incorrect"
        })
    }
            }
        } else {
            userFound = false
        }
    })
    
    if(userFound === false) {
        res.send({
            "message" : "username not found"
        })
    }    
})

app.listen(3000,(err) => {
    if(err) throw new Error(err)

    console.log("Server is connected on http://localhost:3000")
})