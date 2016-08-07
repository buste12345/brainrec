var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Image Model
 * =============
 */

var Image = new keystone.List('Image', {
	autokey: { from: 'name', path: 'key', unique: true },
});	

Image.add({
	name: { type: String, required: true },
	tags: { type: String },
	publishedDate: { type: Date, default: Date.now },
	imagep: { type: Types.CloudinaryImage },
});

Image.register();
