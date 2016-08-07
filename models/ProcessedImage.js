var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Processed Images Model
 * ==========
 */
var ProcessedImage = new keystone.List('ProcessedImage');

ProcessedImage.add({
	keyword: { type: String},
	deftags: { type: String, initial: true, required: true, index: true }
});


ProcessedImage.register();