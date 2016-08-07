var keystone = require('keystone');
var async = require('async');
var url = require('url');
var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'dyzoxhdh3', 
  api_key: '874596487862812', 
  api_secret: '965zmsSACoggIOH4NjQLAEQecbg' 
});

cloudinary.cloudinary_js_config()

/*
cloudinary.config({ 
  cloud_name: 'dyzoxhdh3', 
  api_key: '874596487862812', 
  api_secret: '965zmsSACoggIOH4NjQLAEQecbg' 
});
*/
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'addimage';
	locals.filters = {
		addimage: req.params.addimage
	};
	locals.data = {
		cloudinary: []
	};
	
	// Load the dashboards
	view.on('init', function(next) {
	    locals.cloudinary = require("cloudinary");
	    locals.cloudinary_cors = "http://imagerecognitionbrain-buste12345.c9users.io:8080/cloudinary_cors.html";
	    locals.api_key = cloudinary.config().api_key;
		locals.cloud_name = cloudinary.config().cloud_name;
	    //cloudinary.uploader.image_upload_tag('image_id', { callback: cloudinary_cors });
        next();
		/*var q = keystone.list('Mmdr').model.find().distinct("groupid");R
		
		q.exec(function(err, results) {
			

			console.log(results);
			locals.data.mmdrs = results;
			next(err);
		});*/
		
	});
	
	// Render the view
	view.render('addimage');
	
};
