var numberField = document.querySelector( 'input[name=number]' )
var textField = document.querySelector( 'input[name=text]' )
var button = document.querySelector( 'input[type=button]' )
var msg = document.querySelector( '.response' )

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
