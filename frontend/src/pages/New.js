import React, { Component } from 'react';
import api from '../services/api'

import './New.css';

//crio a classe que irá montar minha pagina NEW
class New extends Component{
	state = {
		image: null,
		author: '',
		place: '',
		description: '',
		hashtags: '',
	};
	//crio uma função do tipo handle para capturar os valores dos inputs
	handleImageChange = e => {
		this.setState({ image: e.target.files[0] })
	}
	
	//crio uma função do tipo handle para capturar os valores dos inputs
	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = async e => {
		e.preventDefault();

		//coloca a chamada da api para o backend
		const data = new FormData();

		data.append('image', this.state.image);
		data.append('author', this.state.author);
		data.append('place', this.state.place);
		data.append('description', this.state.description);
		data.append('hashtags', this.state.hashtags);

		await api.post('posts', data)

		this.props.history.push('/');

	}

	//utilizo o render pois é necessário neste tipo de estrutura
	render(){

		//realizo o retorno do meu jsx (html)
		return(
			
			<form id='new-post' onSubmit={this.handleSubmit}>
				
				<input 
					type='file' 
					name='image'
					onChange={this.handleImageChange}
				></input>

				<input 
					type='text' 
					name='author' 
					placeholder='Nome'
					onChange={this.handleChange}
					value={this.state.author}
				></input>
				
				<input 
					type='text' 
					name='place' 
					placeholder='Local'
					onChange={this.handleChange}
					value={this.state.place}
				></input>
				
				<input 
					type='text' 
					name='description' 
					placeholder='Descrição'
					onChange={this.handleChange}
					value={this.state.descriptio}
				></input>
				
				<input 
					type='text' 
					name='hashtags' 
					placeholder='HashTags'
					onChange={this.handleChange}
					value={this.state.hashtags}
				></input>
				
				<button type='submit'>Enviar</button>
			</form>
		);
	}
}

//é necessário exportar para que fique acessível
export default New;