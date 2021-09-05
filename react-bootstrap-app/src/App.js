import React, {useEffect, setState, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect, 
} from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './login';


function App() { 
	let user;
	user = JSON.parse(localStorage.getItem('userData'));
	return(
	<>
		<Route path="/">
		{ user? <Redirect to="/dashboard" /> : <Redirect to="/auth/login"/> }
		</Route>
		<Route path="/dashboard"> 
			<Dashboard user={user} />
		</Route>
		<Route path="/auth/login">
			<Login />
		</Route>
	</>
		
	)
}

export default App;