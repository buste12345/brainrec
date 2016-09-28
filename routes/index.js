var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

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
	app.get('/galleryview', routes.views.galleryview);
	app.get('/image/:publicid?', routes.views.image);
	app.get('/cloudinary_cors.html',function(req,res){
       
     res.sendFile('/cloudinary_cors.html' , { root : __dirname})

});
	app.post('/upload', routes.views.upload);



};
