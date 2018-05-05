# textABaeApp

A simple web app that sends SMS messages using Node.js, Express, and Nexmo SMS API. I also used W3C Web Notifications API for the front-end UI to display the SMS delivery confirmation messages via Socket.io.

## Running This Demo Locally on Your Machine

### 1. Install dependencies

```bash
$ npm install
```

### 2. Set up a config.js with Your Credentials

Sign up at [Nexmo](https://nexmo.com) to get your own API keys and a virtual number.

Create `config.js` in `/server`. The file should include the credentials.

```javascript
module.exports = {
  api_key: 'f321a...',
  api_secret: '18e9aad...',
  number: '14155551234'
};
```

### 3. Run the Node App

```bash
$ node server/index.js
```

### 4. Launch it on Browser

Go to [http://localhost:4420](http://localhost:4420) and send text messages.
