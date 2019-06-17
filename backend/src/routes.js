const express 			= require('express');
const multer 			= require('multer');
const PostController 	= require('./controllers/PostController');
const uploadConfig 		= require('./config/upload');
const LikeController 	= require('./controllers/LikeController')

const routes = new express.Router();
const upload = multer(uploadConfig);

//cria a rota do tipo GET. Ela pode ser GET/POST/DELETE/UPDATE
routes.get('/', (req, res) => {
	
	return res.send(`Helo ${req.query.name}`);
	
});

//cria a rotas e chama a função do controle para incluir dados
routes.get('/posts', PostController.index); //pode utizar o mesmo nome /post que nao terá conflito
routes.post('/posts', upload.single('image'), PostController.Store);

routes.post('/posts/:id/like', LikeController.Store);

module.exports = routes;