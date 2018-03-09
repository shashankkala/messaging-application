var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	recipient: String,
	sender: String,
	message: String,
	timestamp: String,
	active: Boolean
},
{
	versionKey: false
});

module.exports = mongoose.model('Message', MessageSchema);