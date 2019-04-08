import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AirDrop from './AirDrop';
import {BindAddress} from  './BindAddress' 
import registerServiceWorker from './registerServiceWorker';
import { Route,  } from 'react-router';
import { BrowserRouter ,Switch } from 'react-router-dom'
ReactDOM.render((
	<BrowserRouter >
		<Switch>
		  <Route exact path='/' component={BindAddress}/>
		  <Route path='/airdrop' component={AirDrop}/>
		</Switch>
	</BrowserRouter>

), document.getElementById('root'))


registerServiceWorker();
