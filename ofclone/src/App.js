import React, { useState, useContext } from 'react';
import './App.css';
import './fonts.css';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Messenger from './pages/Messenger/Messenger';
import PageNotFound from './components/PageNotFound/PageNotFound';
import {UserContext} from './context/UserContext';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
	const userData = React.useContext(UserContext);
	return (
		<>
			<Router>
				<Switch>
					<Route exact path="/">
						{userData?.authorized ? <Redirect to="/home" /> : <Redirect to="/auth" />}
					</Route>
					<Route path="/home">
						{userData?.authorized ? <Home/> : <Redirect to="/"/>}
					</Route>
					<Route path="/auth">
						{userData?.authorized ? <Redirect to="/"/> : <Auth /> }
					</Route>
					<Route path="/messenger">
						{userData?.authorized ? <Messenger /> : <Redirect to="/" />}
					</Route>
					<Route component={PageNotFound}></Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;