var keystone = require('keystone');
var fs = require('fs');
var path = require('path');
const saveapi = require('../codes/save');
var Images = keystone.list('Images');
var Clarifai = require('clarifai');
var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'dyzoxhdh3', 
  api_key: '874596487862812', 
  api_secret: '965zmsSACoggIOH4NjQLAEQecbg' 
});

Clarifai.initialize({
  'clientId': 'grKkei2wh9vqFmh2Vu5V3aQLTJJ_yYNlWSXUVXsI',
  'clientSecret': 'MFVAHBJu-adqG3csa_hSwVv73wxMtmY7P88MEAPI'
});

exports.processjob = function(url,resultp,callback)
{
    
    console.log('url: '+url+'; resultp:'+resultp);
        Clarifai.getTagsByUrl(url).then(
        function(response){
        console.log("Tags are: "+response.results[0].result.tag.classes);
         addFunc(response.results[0].result.tag.classes);
       },
       function(error){
         console.log("Clarifai error "+error);
       });
    
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

        if (req.files.image) {
            fs.readFile(req.files.image.path, function(err, data) {
 
                // ...
                var newPath = path.join(__dirname, req.files.image.path);
                //console.log(newPath);
                fs.writeFile(newPath, data, function(err) {
                    console.log(err);

                    var cloudStream = cloudinary.uploader.upload_stream(function(result) {
                        saveapi.createJob('http://res.cloudinary.com/'+cloudinary.config().cloud_name+'/image/upload/'+result.public_id+".jpg",result,redirecto);
                        
                    });
                    var imageStream = fs.createReadStream(path.join(__dirname, req.files.image.path)).pipe(cloudStream);


                });
            });

        }
    }
};

    // Render the view
};