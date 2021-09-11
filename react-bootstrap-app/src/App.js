import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  Redirect, 
} from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './login';


function App() { 
	window.onbeforeunload = function() {
   localStorage.clear();
}
	let user ={};
	user = JSON.parse(localStorage.getItem('userData'));
	console.log(user)

	return(
	<>	
		<Route path="/">
		{ user ? <Redirect to="/dashboard/" /> : <Redirect to="/auth/login"/> }
		</Route>
		<Route path="/dashboard/"> 
			<Dashboard user={{...user}} />
		</Route>
		<Route exact path="/auth/login">
			<Login />
		</Route>
	</>
		
	)
}

export default App;