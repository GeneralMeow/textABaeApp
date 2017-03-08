var numberField = document.querySelector( 'input[name=number]' )
var textField = document.querySelector( 'input[name=text]' )
var button = document.querySelector( 'input[type=button]' )
var msg = document.querySelector( '.response' )
var socket = io()

socket.on('smsStatus', function(data){
  displayStatus('Message ID ' + data.id + 'successfully sent to ' + data.number)
})

Notification.requestPermission()
.then(function(status){
  console.log(status)//when a user granted, status === 'granted', otherwise, 'denied'
})

function displayStatus(message){
  var notification = new Notification('Nexmo', {
    body: message,
    icon: 'images/icon-nexmo.png'
  })
}

textField.addEventListener( 'keyup', function( key ){
  if( ( key.keyCode || key.charCode ) === 13 ) send();
}, false )//when a user presses the return key

button.addEventListener( 'click', send, false ) //when a user clicks the send button

function send() {
  var number = numberField.value.replace( /\D/g, '' )//remove all non numeric characters
  var text = textField.value
  //use the fetch api and post the phone number and message text as JSON
  fetch( '/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { number: number, text: text } )
  })
  .then( function( response ) { console.log( response ) })
  .catch( function( error ) { console.log( error ) })
}
