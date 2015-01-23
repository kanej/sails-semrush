 sails-semrush - An SEMRush API library for Node.js and Sail.js
====================

This module provides calls to the [SEMRushAPI](http://www.semrush.com/api.html) for [Nodejs](http://nodejs.org) and [Sails.js](http://sailsjs.org).


Installation
------------
You can install this through npm: npm install sails-semrush

Usage
-----
    var SEMRushAPI = require('node-semrush');
    var semrush = new SEMRushAPI('<YOUR API KEY>');
    
    semrush.<ReportType>('<DOMAIN>', {<RequestParams>}, function(err, response) {
      if (err) throw err;

      // sails-semrush returns camelCased columns names converted to JSON.
      // See http://www.semrush.com/api.html for format of returned object before camelCasing and special character removal. 
      

      var report = response;

      // Do something with data
    });

Discrepancies
-------------
SEMRush loves to return data in a csv format with certain columns containing special characters that are not allowed in databases such as mongodb. sails-semrush gets rid of that and removes special characters and camelCases the column names before exporting it in JSON. This makes it more native to Node.js. As always, I'm very open to Pull Requests!