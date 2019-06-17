const multer = require('multer');
const path = require('path');

module.exports = {

	//define onde será saldo os arquivos no projeto
	storage: new multer.diskStorage({
		//define a pasta do projeto
		destination: path.resolve(__dirname, '..', '..', 'uploads'),
		filename: function(req, file, cb){
			//utiliza o nome original do arquivo no momento de salvar
			cb(null, file.originalname);
		}
	})
};