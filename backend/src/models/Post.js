const mongoose = require('mongoose');

//define o schema da tabela que irá conter os dados
const PostSchema = new mongoose.Schema({
	author: String,
	place: String,
	description: String,
	hashtags: String,
	image: String,
	likes: {
		type: Number,
		default: 0,
	}
},{
	timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);

