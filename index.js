var parse = require('csv-parse');
var extend = require('./extend');
var querystring = require('querystring');
var https = require('https');
var _ = require('lodash');

var SEMRushAPI = function(apiKey, options){
  this.configure({ apiKey: apiKey, options:options });
};

var camelCase = function (input) { 
    return input.toLowerCase().replace(/\s+/g, '-').replace(/\./g,'').replace('(%)','percent').replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
};

module.exports = SEMRushAPI;

(function() {

  this.options = {
    hostname    : 'api.semrush.com',
    database    : 'us',
    path        : '/',
    userAgent   : 'node-semrush (https://github.com/ithinkdancan/node-semrush)',
    apiKey: ''
  };

  this.defaultParams = {
        export      : 'api',
        action      : 'report',
        display_limit : '10',
  };

  this.configure = function(options) {
    extend(this.options, options);
    };

    this.domain_rank = function(domain, customParams, cb) {
      this._domainRequest('domain_rank', domain, customParams, cb);
    };

    this.domain_organic = function(domain, customParams, cb) {
      this._domainRequest('domain_organic', domain, customParams, cb);
    };

    this.domain_organic_organic = function(domain, customParams, cb) {
      this._domainRequest('domain_organic_organic', domain, customParams, cb);
    };

    this.domain_adwords_adwords = function(domain, customParams, cb) {
      this._domainRequest('domain_adwords_adwords', domain, customParams, cb);
    };

    this.domain_adwords = function(domain, customParams, cb) {
      this._domainRequest('domain_adwords', domain, customParams, cb);
    };

    this.phrase_all = function(phrase, customParams, cb) {
      this._keywordRequest('phrase_all', phrase, customParams, cb);
    };

    this.phrase_this = function(phrase, customParams, cb) {
      this._keywordRequest('phrase_this', phrase, customParams, cb);
    };

    this.phrase_organic = function(phrase, customParams, cb) {
      this._keywordRequest('phrase_organic', phrase, customParams, cb);
    };

    this.phrase_adwords = function(phrase, customParams, cb) {
      this._keywordRequest('phrase_adwords', phrase, customParams, cb);
    };

    this.phrase_related = function(phrase, customParams, cb) {
      this._keywordRequest('phrase_related', phrase, customParams, cb);
    };

    this.phrase_adwords_historical = function(phrase, customParams, cb) {
      this._keywordRequest('phrase_adwords_historical', phrase, customParams, cb);
    };

    this.phrase_fullsearch = function(phrase, customParams, cb) {
      this._keywordRequest('phrase_fullsearch', phrase, customParams, cb);
    };
    
    this.phrase_kdi = function(phrase, customParams, cb) {
      this._keywordRequest('phrase_kdi', phrase, customParams, cb);
    };

    this._domainRequest = function (type, domain, customParams, cb) {

      var params = {
        type: type,
        domain: domain,
        key: this.options.apiKey,
                database: this.options.database

      };

      this._doRequest(params, customParams, cb);
    };

    this._keywordRequest = function (type, phrase, customParams, cb) {
      var params = {
        type: type,
        phrase: phrase,
        key: this.options.apiKey,
        database: this.options.database
      };

      this._doRequest(params, customParams, cb);
    };

    this._doRequest = function(params, customParams, cb) {
      extend(params, this.defaultParams, customParams);

      var path = 'https://' + this.options.hostname + '/?' + querystring.stringify(params);

      var req = https.get(path, function(res) {
        
      var data = [];

        res
          .on('data', function(chunk) { data.push(chunk); })
          .on('end', function() {

            var urldata = data.join('').trim();

            if(urldata.indexOf('ERROR') === 0){
              cb(new Error('response.error:' + urldata), null);
            } else {
            	parse(urldata, {delimiter: ';', columns: true}, function(err, output){
            		
            		var mapped = _.map(output, function(object){
				  		var r = {};
				  		_.each(object, function(value, index){
				  			r[camelCase(index)] = value;
				  		});
				  		return r;
				  	});

            		cb(null, mapped);
            	});
            }
          })
          .on('error', function (err) {
            cb(new Error('response.error:' + err), null);
          });
      });

      return req;
    };

}).call(SEMRushAPI.prototype);
