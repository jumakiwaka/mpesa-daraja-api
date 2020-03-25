const http = require('http');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const Oauth = require('./OAuth');
const stkPush = require('./stkpush');

const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.end('Server running');
});

app.get('/access_token', Oauth.accessToken, (req, res) => {
  res.status(200).json({
    accessToken: req.body.accessToken
  })
});

// stk push lipa na mpesa online
app.get('/stk', Oauth.accessToken, (req, res) => {
  stkPush.initiateStkPush(req, res);
});


//register c2b transanction
app.get('/register', Oauth.accessToken, (req, resp) => {
  let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
  let auth = `Bearer ${req.body.accessToken}`;

  request(
    {
      url: url,
      method: "POST",
      headers: {
        "Authorization": auth
      },
      json: {
        "ShortCode": "600754",
        "ResponseType": "Complete",
        "ConfirmationURL": "http://8c0e7a54.ngrok.io/confirmation",
        "ValidationURL": "http://8c0e7a54.ngrok.io/validation_url"
      }
    },
    function (error, response, body) {
      if (error) { console.log(error) }
      resp.status(200).json(body)
    }
  )
});

app.get('/simulate', Oauth.accessToken, (req, res) => {
  let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"
  let auth = "Bearer " + req.body.accessToken

  request(
    {
      url: url,
      method: "POST",
      headers: {
        "Authorization": auth
      },
      json: {
        "ShortCode": "174379",
        "CommandID": "CustomerPayBillOnline",
        "Amount": "100",
        "Msisdn": "254797163664",
        "BillRefNumber": "testapi754"
      }
    },
    function (error, response, body) {
      if (error) {
        console.log(error);
      }
      else {
        res.status(200).json(body);
      }
    }
  )
});

app.post('/stk_callback', (req, res) => {
  console.log('.......... STK Callback ..................');
  console.log(JSON.stringify(req.body.Body.stkCallback));
  console.log('.......... STK Callback JSON..................');
  console.log(req.body.Body.stkCallback.CallbackMetadata);
});


app.post('/confirmation', (req, res) => {
  console.log('....................... confirmation .............');
  console.log(req.body);
});

app.post('/validation_url', (req, resp) => {
  console.log('....................... validation .............');
  console.log(req.body);
});

server.listen(3212, () => {
  console.log('listening on port', 3212);
});

