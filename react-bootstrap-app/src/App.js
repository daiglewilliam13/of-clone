import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  Redirect, 
} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/login';


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
		{ user==null ?  <Redirect to="/auth/login"/> : <Redirect to="/dashboard/" /> }
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