'use strict';

const express = require('express')
const app = express()
const server = app.listen(4420)
const bodyParser = require('body-parser')
const ejs = require('ejs')

app.set('views', __dirname + '/../views')
app.set('view engine', 'html')
app.engine('html', ejs.renderFile)
app.use(express.static(__dirname + '/../public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', ( request, response ) => {
  response.render('index')
})

//take the form input value from the request
app.post( '/', ( request, response ) => {
  response.send( request.body )
  console.log( request.body )
  let toNumber = request.body.number
  let text = request.body.text
  //sending SMS via nexmo...
})
