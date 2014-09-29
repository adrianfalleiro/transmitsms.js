
/*
   Module for sending emails
*/

var request = require('request'),
    sms;


/*
    SMS API Constructor

    @param - (Object) opts - options  
*/    
sms = function (opts) {
    this.protocol = 'https://';
    this.url = 'api.transmitsms.com/';
    this.replyCbUrl = opts.replyCallbackUrl || false;
    this.apiKey = opts.apiKey;
    this.secret = opts.secret;
};

/*
    SMS Send

    @param - (Object) opts - options  
*/   

sms.prototype.send = function(opts) {
    var endpoint = 'send-sms.json';
    var to = opts.to;
    var message = opts.message;

    var form = {                  
        message: message,               
        to: to
    };

    if (this.replyCbUrl) {
        form.reply_callback = this.replyCbUrl; 
    }

    var options = {                 
        method: 'POST',             
        uri: this.protocol + this.url + endpoint,
        form: form,                     
        headers: {               
        'Authorization': 'Basic ' + new Buffer(this.apiKey + ":" + this.secret).toString('base64')                  
        }
    };                                         
    request(options, function(error, response, body) {  
      console.log(response);
    });
};


module.exports = sms;
