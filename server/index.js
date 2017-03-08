'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const socketio = require('socket.io')

const app = express()
const server = app.listen(4420)

//nexmo init
const nexmo = new Nexmo({
  apiKey: '5a796e43',
  apiSecret: 'ca2407dc02e119e6',
}, { debug: true })

//socket.io
const io = socketio( server )
io.on( 'connection' , ( socket ) => {
  console.log('Connected')
  socket.on( 'disconnect', () => {
    console.log('Disconected')
  })
})

//configure express
app.set('views', __dirname + '/../views')
app.set('view engine', 'html')
app.engine('html', ejs.renderFile)
app.use(express.static(__dirname + '/../public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//express routes
app.get('/', ( request, response ) => {
  response.render('index')
})

//take the form input value from the request
app.post('/', (req, res) => {
  res.send(req.body);

  let toNumber = req.body.number;
  let text = req.body.text;

  let data = {}; // the data to be emitted to front-end

  // Sending SMS via Nexmo
  nexmo.message.sendSms(
    '18602158608', toNumber, text, {type: 'unicode'},
    (err, responseData) => {
      if (err) {
        data = {error: err};
      } else {
        //console.dir(responseData);
        if(responseData.messages[0]['error-text']) {
          data = {error: responseData.messages[0]['error-text']};
        } else {
          let n = responseData.messages[0]['to'].substr(0, responseData.messages[0]['to'].length - 4) + '****';
          data = {id: responseData.messages[0]['message-id'], number: n};
        }
        io.emit('smsStatus', data);
      }
    }
  );

  // Basic Number Insight - get info about the phone number
  nexmo.numberInsight.get({level:'basic', number: toNumber}, (err, responseData) => {
    if (err) console.log(err);
    else {
      console.dir(responseData);
    }
  });
});
