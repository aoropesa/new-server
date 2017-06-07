const express = require('express')  //pulls express into this file
const app = express()  //return a server function
const path = require('path')
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname)))
app.use(bodyParser.urlencoded({
  extended:false
}))

//Listen for GET requests to localhost:8080/
app.get('/', function(req,res){    //req: request, res: response
  res.sendFile(path.join(__dirname, 'index.html'))
})

//Listen for GET requests to localhost:8080
app.get('/:proyect', function(req,res){    //req: request, res: response
  res.sendFile(path.join(__dirname, req.params.proyect, 'index.html'))
})
////Listen for GET requests to localhost:8080/landing-page
//app.get('/landing-page', function(req,res){    //req: request, res: response
//  res.sendFile(path.join(__dirname, 'landing-page', 'index.html'))
//})

////:words is a parameter 
//app.get('/shout/:words', (req, res) => {
//  res.send(req.params.words.toUpperCase())
//})

app.post('/form', (req, res) => {
  res.send(req.body.first_name.toUpperCase() + " SUCKS!")
})

// start the server. Type in the command line: node server.js
app.listen(8080, function(){
  console.log('Listening on port 8080...');
})
