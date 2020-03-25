const request = require('request');
const consumer_key = "PUQFed2Ekn31EbdgNphD1XLGxnld3UjP";
const consumer_secret = "SuKg7IxQIlpw4ZE1";
const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
const auth = "Basic " + new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

function generateToken(req, res, next) {
  request(
    {
      url: url,
      headers: {
        "Authorization": auth
      }
    },
    function (error, response, body) {
      // TODO: Use the body object to extract OAuth access token
      if (error) {
        console.log(error);
        res.status(500).json({
          status: 'error',
          error: 'Internal server error',
        });
      }
      body = JSON.parse(body);
      console.log(body);
      req.body.accessToken = body.access_token;
      next();

    }
  )
}

module.exports.accessToken = generateToken;

