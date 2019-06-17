import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Feed from './pages/Feed';
import New from './pages/New';

//crio a função de rotas
function Routes(){
	return(

		//utiliza o swith para controlas as rotas e dentro do switch eu incluo as roras
		<Switch>
			<Route path='/' exact  component={Feed} /*utiliza o exact para que seja exato, se nao usar ele apenas verifica se contem */></Route> 
			<Route path='/new' component={New} ></Route>
		</Switch>
	);
}

export default Routes;