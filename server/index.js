'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const nexmo = new Nexmo({
  apiKey: '5a796e43',
  apiSecret: 'ca2407dc02e119e6',
}, { debug: true })

const app = express()
const server = app.listen(4420)

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
  const toNumber = request.body.number
  const text = request.body.text
  //sending SMS via nexmo...
  nexmo.message.sendSms(
    '18602158608', toNumber, text, {type: 'unicode'},
    ( err, responseData ) => {
      if( err ) {
        console.log( err )
      } else {
        console.dir( responseData )
        //Optional: add socket.io
      }
    }
  )
})
