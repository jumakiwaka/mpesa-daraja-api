const request = require('request');

exports.initiateStkPush = (req, res) => {
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    auth = `Bearer ${req.body.accessToken}`;
  let date = new Date();
  // timestamp in yyyymmddhhiiss
  const timestamp = `${date.getFullYear()}${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`;

  const password = new Buffer.from('174379' + 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919' + timestamp).toString('base64')
  console.log(timestamp);

  request(
    {
      url: url,
      method: "POST",
      headers: {
        "Authorization": auth
      },
      json: {
        "BusinessShortCode": "174379",
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": "1",
        "PartyA": "254725315329",
        "PartyB": "174379",
        "PhoneNumber": "254797163664",
        "CallBackURL": "http://8c0e7a54.ngrok.io/stk_callback",
        "AccountReference": "+254797163664",
        "TransactionDesc": "TestPay"
      }
    },
    function (error, response, body) {
      if (error) {
        console.log(error)
      }
      else {
        res.status(200).json(body)
      }
    }
  )
};
