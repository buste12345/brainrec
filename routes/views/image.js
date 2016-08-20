var keystone = require('keystone');
var async = require('async');


exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'image';

	locals.data = {
		public_id: req.params.publicid
	};
	
	// Load the dashboards
	view.on('init', function(next) {
		if(req.params.publicid){
		console.log("Pub id: "+req.params.publicid);
		var q = keystone.list('Images').model.findOne({name:locals.data.public_id});
		
		q.exec(function(err, results) {
			
			/*keystone.list('Mmdr').model.find({'groupid':results[0]}).distinct("state").exec(function(err,results2)
			{
				console.log(results2);
			});*/
			//console.log(results);
			locals.data.results = results.imagep;
			locals.data.tagss = results.tagss;
			locals.data.public_id = req.params.publicid;
			next(err);
		});
		
		
		}
	});
	
	// Render the view
	view.render('image');
	
};
