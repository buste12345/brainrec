var keystone = require('keystone');
var fs = require('fs');
var path = require('path');
var Images = keystone.list('Images');


exports.processjob = function(url,resultp,callback)
{
    
var addFunc = function(clarifaires) {    
    var newImage = new Images.model({
		name: resultp.public_id,
		tagss: clarifaires,
		imagep: resultp
	});
				
	newImage.save(function(err) {
	    // post has been save
		console.log('Image ', resultp.public_id, ' saved: ', url);
		callback();
	    console.log(err);
    });
}; 
}

exports = module.exports = function(req, res) {
    
var redirecto = function(pid){
    res.redirect('/image/'+pid);
};

    // Load other posts
if(req.method === "POST") {
    if (req.url === "/upload") {

    }
};

    // Render the view
};