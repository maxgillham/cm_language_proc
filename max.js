'use strict';

let https = require ('https');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the accessKey string value with your valid access key.
let accessKey = 'cd36a38ab6d943f88029f1bd4b24f848';

// Replace or verify the region.

// You must use the same region in your REST API call as you used to obtain your access keys.
// For example, if you obtained your access keys from the westus region, replace
// "westcentralus" in the URI below with "westus".

// NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
// a free trial access key, you should not need to change this region.
let uri = 'eastus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/';

let response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        let body_ = JSON.parse (body);
        let body__ = JSON.stringify (body_, null, '  ');
        console.log (body__);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

let get_sentiments = function (documents) {
    let body = format_rev_text(documents);

    let request_params = {
        method : 'POST',
        hostname : uri,
        path : path + 'sentiment',
        headers : {
            'Ocp-Apim-Subscription-Key' : accessKey,
        }
    };

    let req = https.request (request_params, response_handler);
    req.write (body);
    req.end ();
}

let format_rev_text = function (monologues) {

    var doc = new Object("documents:");
    var plugin_array = new Array();
    for(var key in monologues.monologues){
      var documents = new Object();
      var temp_sentence = ""
      for(var elem in monologues.monologues[key].elements){
          if(monologues.monologues[key].elements[elem].type == "text" ){
            temp_sentence += " " + monologues.monologues[key].elements[elem].value;
            }
            else temp_sentence += monologues.monologues[key].elements[elem].value;
          documents.id = key
          documents.text = temp_sentence
          }
      documents.id = key
      documents.text = temp_sentence
      plugin_array.push(documents)
    }
    doc.documents = plugin_array
    let finalVersion = Object.assign({"documents": doc.documents});
    return JSON.stringify(finalVersion)
}

var documents = { "documents": [
    {
      "id": "1",
      "text": "How about Shell 26?  No that price is too high."
    },
    {
      "id": "2",
      "text": "Hmm ok. Can I intrest you in Bell 21?  No that bond is too tight for it's credit score"
    },
    {
      "id": "3",
      "text": "I see.  Okay, I have some Shaw 24 bonds if you are interested?  Yes I will buy"
    },
    {
      "id": "4",
      "text": "Pleasure doing business with you.  Look forward to chatting in the future.  Goodbye"
    }
  ]
}


var monologues = {
  "monologues": [
    {
      "speaker": 1,
      "elements": [
        {
          "type": "text",
          "value": "Hello",
          "ts": 0.5,
          "end_ts": 1.5,
          "confidence": 1.00
        },
        {
          "type": "text",
          "value": "World",
          "ts": 1.75,
          "end_ts": 2.85,
          "confidence": .80
        },
        {
          "type": "punct",
          "value": "."
        }
      ]
    },
    {
      "speaker": 2,
      "elements": [
        {
          "type": "text",
          "value": "monologues",
          "ts": 3.0,
          "end_ts": 3.5,
          "confidence": 1.00
        },
        {
          "type": "text",
          "value": "are",
          "ts": 3.6,
          "end_ts": 3.9,
          "confidence": 1.00
        },
        {
          "type": "text",
          "value": "a",
          "ts": 4.0,
          "end_ts": 4.3,
          "confidence": 1.00
        },
        {
          "type": "text",
          "value": "block",
          "ts": 4.5,
          "end_ts": 5.5,
          "confidence": 1.00
        },
        {
          "type": "text",
          "value": "of",
          "ts": 5.75,
          "end_ts": 6.14,
          "confidence": 1.00
        },
        {
          "type": "text",
          "value": "text",
          "ts": 6.5,
          "end_ts": 7.78,
          "confidence": 1.00
        },
        {
          "type": "punct",
          "value": ".",
        },
      ]
    }
  ]
}

get_sentiments (monologues);
