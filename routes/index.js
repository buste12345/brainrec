var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var cloudinary = require('cloudinary');
var fs = require('fs');
var path = require('path');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.get('/addimage', routes.views.addimage);
	app.get('/cloudinary_cors.html',function(req,res){
       
     res.sendFile('/cloudinary_cors.html' , { root : __dirname})

});
	app.post('/upload', function(req, res){
	if(req.files.image)
	{
		
	fs.readFile(req.files.image.path, function (err, data) {
  // ...
  var newPath = path.join(__dirname,req.files.image.path);
  console.log(newPath);
  fs.writeFile(newPath, data, function (err) {
  	console.log(err);
  	
    var cloudStream = cloudinary.uploader.upload_stream(function() { res.redirect('back'); });
  	var imageStream = fs.createReadStream(path.join(__dirname,req.files.image.path)).pipe(cloudStream);


  });
});

	}
	});



};
