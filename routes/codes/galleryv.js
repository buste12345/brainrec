var kue = require('kue');
var fs = require('fs');
var path = require('path');
const b = require('../views/galbus');

//Kue queue declaration
var qGallery = kue.createQueue();


//Function to add Kue task to upload picture to system.
function queryImages(result, callback) {
    console.log("Received data: "+result);
    

    var gal = qGallery.create('uploadprocess', {
        results: result
    });
    
    gal.on('complete', function(){
        callback(gal.data.results.public_id);
    });
    
    gal.save();

}

qGallery.process('uploadprocess', 5, function(job, done) {
    
    var donee = function()
    {
        console.log("Gallery query!");
        done && done();
    }
    
    b.processjob(job.data.results,donee);

});


//Export functions
var methods = {};
methods.queryImages = function(val,val2,callback) {
    queryImages(val,val2,callback);
};

module.exports = methods;