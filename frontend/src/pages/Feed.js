import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

//crio a classe que irá montar minha pagina feed
class Feed extends Component{
	//criar uma variavel de estado, que armazena dados que são atualizados on-line
	state = {
		//cria uma variavel do tipo array
		feed: [],
	};

	//quando se usa clase para criar componentes, o local recomendado é este
	//é executado automatico ao montar a tela
	async componentDidMount(){
		this.registerToSocket();

		const response = await api.get('posts');

		//jogo o conteudo data que é contido no response para dentro do feed
		this.setState({ feed: response.data });
	}

	//crio ums sockt par realizar a atualização em realtime
	registerToSocket = () => {
		const socket = io('http://localhost:3333');

		//post escuta a função que envia os dados em realtime
		socket.on('newpost', newPost =>{
			//set os novos posts
			this.setState({ feed: [newPost, ... this.state.feed]});
		});
		//like

		socket.on('newlike', likedPost =>{
			//set os novos posts
			this.setState({ 
				feed: this.state.feed.map(post =>
				post._id == likedPost._id ? likedPost : post
				)
			});
		});

	}

	//função apra realizar o like
	handleLike = id =>{
		api.post(`/posts/${id}/like`);
	}

	//utilizo o render pois é necessário neste tipo de estrutura
	render(){

		//realizo o retorno do meu jsx (html)
		return(
			<section id='post-list'>
				{ this.state.feed.map(post => (

					<article key={post._id}>
						<header>
							<div className='user-info'>
								<span>{post.author}</span>
								<span className='place'>{post.place}</span>
							</div>
							<img src={more} alt='Mais'></img>
						</header>

						<img src={`http://10.80.18.17:3333/files/${post.image}`}></img>

						<footer>
							<div className='action'>
								<button type='button' onClick={() => this.handleLike(post._id)}>
									<img src={like} alt=''></img>
								</button>
								<img src={comment} alt=''></img>
								<img src={send} alt=''></img>
							</div>
							<strong>{post.likes} curtidas</strong>

							<p>
								{post.description}
								<span>{post.hashtags}</span>
							</p>
						</footer>
					</article>
				))}
				
			</section>
		);
	}
}

//é necessário exportar para que fique acessível
export default Feed;