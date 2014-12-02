
/*
   Module for sending emails
*/

var request = require('request'),
    Q = require('q'),
    transitsms;


/*
    SMS API Constructor

    @param - (Object) opts - options  

*/    
// TODO: Set defaults and add validation
transitsms = function (opts) {
    this._API_URL = 'https://api.transmitsms.com/';

    this.replyCbUrl = opts.replyCallbackUrl || false;    
    this.apiKey = opts.apiKey;
    this.secret = opts.secret;
};






// TODO: Set defaults and add validation
transitsms.prototype.apiRequest = function(opts) {
    var deferred = Q.defer();
    var params = opts.params;


    var options = {
        method: 'POST',             
        uri: this._API_URL + opts.endpoint + '.json',
        form: params,
        headers: {               
            'Authorization': 'Basic ' + new Buffer(this.apiKey + ":" + this.secret).toString('base64')                  
        }
    }

  
    request(options, function(err, res, body) {
        if (err) deferred.reject(err);

        deferred.resolve({res: res, body: body});
    });

    return deferred.promise;


};

/**
* Send SMS messages.
* 
* @param {string} opts.message 
* @param {string} opts.to - required if list_id is not set
* @param {string} opts.from
* @param {datetime} opts.send_at
* @param {int} opts.list_id - required if to is not set
* @param {string} opts.dlr_callback
* @param {string} opts.reply_callback
* @param {int} opts.validity
*
*/  
// TODO: Set defaults and add validation
transitsms.prototype.sendSms = function(opts) {            
    return this.apiRequest({
        endpoint: 'send-sms',
        params: opts
    });          
};

/**
 * Get data about a sent message.
 * 
 * @param {int} opts.message_id
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.getSms = function(opts) {
    return this.apiRequest({
        endpoint: 'get-sms',
        params: opts
    });
};

/**
 * Get sent messages.
 * 
 * @param {int} opts.message_id
 * @param {int} opts.page
 * @param {int} opts.max
 * @param {string} opts.optouts - can be 'only', 'omit', 'include'
 *  
 */
// TODO: Set defaults and add validation
transitsms.getSmsSent = function(opts) {
    return this.apiRequest({
        endpoint: 'get-sms-sent',
        params: opts
    });
};

/**
 * Get SMS responses.
 * 
 * @param {int} opts.message_id
 * @param {int} opts.keyword_id
 * @param {string} opts.keyword
 * @param {string} opts.number
 * @param {string} opts.msisdn
 * @param {int} opts.page
 * @param {int} opts.max
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.getSmsResponses = function(opts) {
    return this.apiRequest({
		endpoint: 'get-sms-responses',
		params: opts
	});         
}

/**
 * Get SMS responses for user
 * 
 * @param {datetime} opts.start
 * @param {datetime} opts.end
 * @param {int} opts.page
 * @param {int} opts.max
 * @param {string} opts.keywords 
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.getUserSmsResponses = function(opts) {
    return this.apiRequest({
		endpoint: 'get-user-sms-responses',
		params: opts
	});            
}

/**
 * Get SMS sent by user in certain time frame
 * 
 * @param {datetime} opts.start
 * @param {datetime} opts.end
 * @param {int} opts.page
 * @param {int} opts.max
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.getUserSmsSent = function(opts) {
    return this.apiRequest({
		endpoint: 'get-user-sms-sent',
		params: opts
	});         
}

/**
 * Cancel a scheduled SMS
 * 
 * @param {int} opts.id
 * 
 */
// TODO: Set defaults and add validation
// TODO: Set defaults and add validation
transitsms.prototype.cancelSms = function(opts) {
    return this.apiRequest({
		endpoint: 'cancel-sms',
		params: opts
	});            
}


/**
 * Get information about a list and its members.
 * 
 * @param {int} opts.list_id
 * @param {int} opts.page
 * @param {int} opts.max
 * @param {string} opts.members - can be 'active', 'inactive', 'all', 'none'
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.getList = function(opts) {
    return this.apiRequest({
		endpoint: 'get-list',
		params: opts
	});
}

/**
 * Get the metadata of your lists.
 *
 * @param {int} opts.page
 * @param {int} opts.max
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.getLists = function(opts) {
    return this.apiRequest({
		endpoint: 'get-lists',
		params: opts
	});         
}

/**
 * Create a new list.
 * 
 * @param {string} opts.name
 * @param {array} opts.fields
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.addList = function(opts) {
    return this.apiRequest({
		endpoint: 'add-list',
		params: opts
	});
}

/**
 * Add a member to a list.
 * 
 * @param {int} opts.list_id
 * @param {string} opts.msisdn
 * @param {string} opts.first_name
 * @param {string} opts.last_name
 * @param {array} opts.fields
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.addToList = function(opts) {
    return this.apiRequest({
		endpoint: 'add-to-list',
		params: opts
	});           
}

/**
 * Edit a list member.
 * 
 * @param {int} opts.list_id
 * @param {string} opts.msisdn
 * @param {string} opts.first_name
 * @param {string} opts.last_name
 * @param {array} opts.fields
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.editListMember = function(opts) {
    return this.apiRequest({
		endpoint: 'edit-list-member',
		params: opts
	});          
}

/**
 * Remove a member from one list or all lists.
 * 
 * @param {int} opts.list_id
 * @param {string} opts.msisdn
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.deleteFromList = function(opts) {
    return this.apiRequest({
		endpoint: 'delete-from-list',
		params: opts
	});
}

/**
 * Opt-out a member from one list or all lists.
 * 
 * @param {int} opts.list_id
 * @param {string} opts.msisdn
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.optoutListMember = function(opts) {
    return this.apiRequest({
		endpoint: 'optout-list-member',
		params: opts
	});
}       

/**
 * Get leased number details 
 * 
 * @param {string} opts.number
 * 
 */

// TODO: Set defaults and add validation
transitsms.prototype.getNumber = function(opts) {
    return this.apiRequest({
		endpoint: 'get-number',
		params: opts
	});
}

/**
 * Get a list of numbers.
 * 
 * @param {int} opts.page
 * @param {int} opts.max
 * @param {string} opts.filter
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.getNumbers = function(opts) {
    return this.apiRequest({
		endpoint: 'get-numbers',
		params: opts
	});
}

/**
 * Lease a response number.
 * 
 * @param {string} opts.number
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.leaseNumber = function(opts) {
    return this.apiRequest({
		endpoint: 'lease-number',
		params: opts
	});
}

/**
 * Get a client.
 * 
 * @param {int} opts.client_id
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.getClient = function(opts) {
    return this.apiRequest({
		endpoint: 'get-client',
		params: opts
	});
}

/**
 * Get a list of clients.
 * 
 * @param {int} opts.page
 * @param {int} opts.max
 * 
 */     
// TODO: Set defaults and add validation
transitsms.prototype.getClients = function(opts) {
    return this.apiRequest({
		endpoint: 'get-clients',
		params: opts
	});           
}

/**
 * Add a new client
 * 
 * @param {string} opts.name
 * @param {string} opts.email
 * @param {string} opts.password
 * @param {string} opts.msisdn
 * @param {string} opts.contact
 * @param {string} opts.timezone
 * @param {bool} opts.client_pays
 * @param {float} opts.sms_margin
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.addClient = function(opts) {
    return this.apiRequest({
		endpoint: 'add-client',
		params: opts
	});
}

/**
 * Edit a client
 *
 * @param {int} opts.id
 * @param {string} opts.name
 * @param {string} opts.email
 * @param {string} opts.password
 * @param {string} opts.msisdn
 * @param {string} opts.contact
 * @param {string} opts.timezone
 * @param {bool} opts.client_pays
 * @param {float} opts.sms_margin
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.editClient = function(opts) {
    return this.apiRequest({
		endpoint: 'edit-client',
		params: opts
	});
}

/**
 * Add a keyword to your existing response number.
 * 
 * @param {string} opts.keyword
 * @param {string} opts.number
 * @param {string} opts.reference
 * @param {int} opts.list_id
 * @param {string} opts.welcome_message
 * @param {string} opts.members_message
 * @param {bool} opts.activate
 * @param {string} opts.forward_url
 * @param {string} opts.forward_email
 * @param {string} opts.forward_sms
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.addKeyword = function(opts) {
    return this.apiRequest({
		endpoint: 'add-keyword',
		params: opts
	});
}

/**
 * Edit an existing keyword.
 * 
 * @param {string} opts.keyword
 * @param {string} opts.number
 * @param {string} opts.reference
 * @param {int} opts.list_id
 * @param {string} opts.welcome_message
 * @param {string} opts.members_message
 * @param {string} opts.status
 * @param {string} opts.forward_url
 * @param {string} opts.forward_email
 * @param {string} opts.forward_sms
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.editKeyword = function(opts) {
    return this.apiRequest({
		endpoint: 'edit-keyword',
		params: opts
	});
}

/**
 * Get a list of existing keywords.
 * 
 * @param {string} opts.number
 * @param {int} opts.page
 * @param {int} opts.max
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.getKeywords = function(opts) {
    return this.apiRequest({
		endpoint: 'get-keywords',
		params: opts
	});          
}

/**
 * Get a list of transactions for a client.
 * 
 * @param {int} opts.client_id
 * @param {datetime} opts.start
 * @param {datetime} opts.end
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.getTransactions = function(opts) {
    return this.apiRequest({
		endpoint: 'get-transactions',
		params: opts
	});
}

/**
 * Get a transaction.
 * 
 * @param {int} opts.id
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.getTransaction = function(opts) {
    return this.apiRequest({
		endpoint: 'get-transaction',
		params: opts
	});
}

/**
 * Register an email address for Email to SMS.
 * 
 * @param {string} opts.email
 * @param {int} opts.max_sms
 * @param {string} opts.number
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.addEmail = function(opts) {
    return this.apiRequest({
		endpoint: 'add-email',
		params: opts
	});         
}

/**
 * Remove an email address from Email to SMS.
 * 
 * @param {string} opts.email
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.deleteEmail = function(opts) {
    return this.apiRequest({
		endpoint: 'delete-email',
		params: opts
	});          
}

/**
 * Get active user's balance
 * 
 */
// TODO: Set defaults and add validation
transitsms.prototype.getBalance = function() {
    return this.apiRequest({
        endpoint: 'get-balance'
    });
}

// TODO: Set defaults and add validation
transitsms.prototype.formatNumber = function(opts) {
    return this.apiRequest({
        endpoint: 'format-number',
        params: opts
    });
}

module.exports = transitsms;
