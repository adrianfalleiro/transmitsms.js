transitsms.js
=============

Node wrapper for Transit SMS API. Uses `request` to make API calls.

Currently only send method implemented

### Usage
```
var transitsms = require('transitsms')({
  apiKey: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX,
  secret: XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
});

transitsms.send({
  to: 00000000000,
  message: 'Yo'
});
````
