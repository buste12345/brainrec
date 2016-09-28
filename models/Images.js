var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Image Model
 * =============
 */

var Image = new keystone.List('Images', {
	autokey: { from: 'name', path: 'key', unique: true },
});	

Image.add({
	name: { type: String, required: true },
	tagss: { type: String },
	publishedDate: { type: Date, default: Date.now },
	imagep: { type: Types.CloudinaryImage },
	curve: {
		counter: { type: String },
		keyword: { type: String }
	}
});

Image.register();
