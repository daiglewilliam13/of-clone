import React, { useState, useContext } from 'react';
import './App.css';
import './fonts.css';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Messenger from './pages/Messenger/Messenger';
import { UserContext } from './context/UserContext';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
	const [userData, setUserData] = useState(true);
	const testData = useContext(UserContext); 
	console.log(testData);
	return (
		<>
			<Router>
				<Switch>
					<Route exact path="/">
						{userData ? <Redirect to="/home" /> : <Redirect to="/auth" />}
					</Route>
					<Route path="/home">
						{userData ? <Home/> : <Redirect to="/"/>}
					</Route>
					<Route path="/auth">
						{userData ? <Redirect to="/"/> : <Auth /> }
					</Route>
					<Route path="/messenger">
						{userData ? <Messenger /> : <Redirect to="/" />}
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;