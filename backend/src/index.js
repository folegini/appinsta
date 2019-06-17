const express 	= require('express');
const mongosse 	= require('mongoose');
const path 		= require('path');
const cors		= require('cors');

const app = express();

//crio um server pare que a aplicação continue sendo acessada pelo protovolo http
const server = require('http').Server(app);

//crio uma conexao websocket, assim suporta http e websocket tbm
const io = require('socket.io')(server);

// conexao com banco 
mongosse.connect('mongodb+srv://folegini:totvs@cluster0-87m1t.mongodb.net/test?retryWrites=true&w=majority',{
	useNewUrlParser: true,
});

//criar servico http (rota) de requisição e resposta
//esse bloco ficará no arquivo routes.js para separar as coisas e deixar mais limpo o código
/*
app.get('/', (req, res) => {
	
	return res.send(`Helo ${req.query.name}`);
	
})
*/

//torno o io disponivel em todo o app
app.use((req, res, next) => {
	//faz com que todo o app tbm acesso o io
	req.io = io;

	next();
});

//faz com que a aplicação fique disponivel para uso no frontend de qualquer lugar.
app.use(cors());

//crio uma rota para a imagens, isso vai criar uma url das imagens pra usar no front posteriormente.
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//serve para que o app conheca as routas contidas no routes.js
app.use(require('./routes'));

//cria a porta no qual ficará disponivel a nossa aplicação
//app.listen(3333);

//utilizo o serve para separar os protocolos
server.listen(3333);
