const Post 	= require('../models/Post');
const sharp = require('sharp');
const path 	= require('path');
const fs	= require('fs'); 

module.exports = {

	//metodo que recupera os dados no mongo
	async index(req, res){
		const posts = await Post.find().sort('-createdAt'); //o - na frente significa que é decrescente

		return res.json(posts);
	},

	//metodo que insere os dados no mongo
	async Store(req, res){
		//apresenta no console o corpo da requisição
		//console.log(req.body);
		//console.log(req.file);

		//obtenho as variaveis cotidad no corpo da requisição
		const {author, place, description, hashtags} = req.body;
		const {filename: image} = req.file;

		//renomeio a imagem, para menter sempre a mesma extensão
		const [name, ext] = image.split('.');
		const fileName = `${name}.jpg`;

		//redimensiono a imagem para um tamanho adequado
		await sharp(req.file.path)
			.resize(500)
			.jpeg({quality: 70})
			.toFile(
				path.resolve(req.file.destination,'resized', image)
			);

		//deleto a imagem maior
		fs.unlinkSync(req.file.path);

		//faço a inclusão utilizando o metodo Post 
		const post = await Post.create({
			author,
			place,
			description,
			hashtags,
			image,
		});

		//envia um aviso a todos os usuários conectados no app que foi feito um novo post
		req.io.emit('newpost', post);

		//realiza o retorno do serviço
		return res.json(post);
	}
};