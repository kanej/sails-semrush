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

      // See http://www.semrush.com/api.html for format of returned object
      var report = response;

      // Do something with data
    });