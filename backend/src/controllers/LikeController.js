const Post = require('../models/Post');

module.exports = {

	//metodo que insere os dados no mongo
	async Store(req, res){
		
		//busco no banco de dado pelo ID
		const post = await Post.findById(req.params.id);

		//despois de carregado os dados eu somo mais 1
		post.likes += 1;

		await post.save();

		//envia um aviso a todos os usuários conectados no app que foi feito um novo like
		req.io.emit('newlike', post);

		//realiza o retorno do serviço
		return res.json(post);
	}
};