var kue = require('kue');
var fs = require('fs');
var path = require('path');
const b = require('../views/upload');
//var keystone = require('keystone');
//var Images = keystone.list('Images');
//var Clarifai = require('clarifai');

//Clarifai.initialize({
//  'clientId': 'grKkei2wh9vqFmh2Vu5V3aQLTJJ_yYNlWSXUVXsI',
//  'clientSecret': 'MFVAHBJu-adqG3csa_hSwVv73wxMtmY7P88MEAPI'
//});

//Kue queue declaration
var qJob = kue.createQueue();


//Function to add Kue task to upload picture to system.
function createJob(pictureURL, result, callback) {
    console.log("Received URL: "+pictureURL+". Result: "+result);
    

    var job = qJob.create('uploadprocess', {
        url: pictureURL,
        results: result
    });
    
    job.on('complete', function(){
        callback(job.data.results.public_id);
    });
    
    job.save();

}

qJob.process('uploadprocess', 5, function(job, done) {
    
    var donee = function()
    {
        console.log("Job completed!");
        done && done();
    }
    
    b.processjob(job.data.url,job.data.results,donee);

});


//Export functions
var methods = {};
methods.createJob = function(val,val2,callback) {
    createJob(val,val2,callback);
};

module.exports = methods;