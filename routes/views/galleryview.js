var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'search';
	locals.filters = {
		
	};
	locals.data = {
		posts: [],
	};
	
	console.log("Limit is "+req.query.limit+" and page is "+req.query.page);


	// Load amount of images
	view.on('init', function (next) {
		var q;
		if(req.query.searchquery)
		{
		q = keystone.list('Images').model.find({"tagss": {'$regex': req.query.searchquery}}).count();
		}
		else
		{
			q = keystone.list('Images').model.count();
		}
		q.exec(function (err, result) {
			var blocks = (result/req.query.limit<1) ? 1 : (Math.ceil(result/req.query.limit)) ; 
			
			locals.data.imgcount = blocks;
			locals.data.page = req.query.page;
			locals.data.limit = req.query.limit;
			next(err);
		});

	});

	// Load images gallery
	view.on('init', function (next) {
		var q;
		if(req.query.searchquery)
		{
			q = keystone.list('Images').model.find({"tagss": {'$regex': req.query.searchquery}});
		}
		else
		{
			if(req.query.page==1)
				q = keystone.list('Images').model.find().limit(req.query.limit).sort({"_id":-1});
			if(req.query.page!=1)
				q = keystone.list('Images').model.find().skip((parseInt(req.query.page)-1)*req.query.limit).limit(req.query.limit).sort({"_id":-1});
		}
		q.exec(function (err, results) {
			locals.data.imageres = results;
			console.log("cap");
			next(err);
		});

	});

	// Render the view
	if(req.query.limit&&req.query.page)
	{
		
		view.render('galleryview');	
	}
		
		
};
