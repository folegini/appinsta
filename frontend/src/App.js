import React from 'react';
import { BrowserRouter } from 'react-router-dom';

//realizo a importação do meu arquivo de rotas
import Routes from './routes';
import Header from './components/Header';

function App() {
  return (
    //utiliza o Browser Router para que o browser tenha acesso a rotas
	<BrowserRouter>
		
		{/* chamo o meu componente rotas */}
		<Header></Header>
		<Routes></Routes>

	</BrowserRouter>
	
	/*
	<div className="App">
		<h1>Olha meu app ai </h1>
    </div>
	*/
  );
}

export default App;
