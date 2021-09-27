import React, { useState } from 'react';

import { Container, Navbar, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import Signup from './Signup';

const Login = () => {
	let history = useHistory();
	const [details, setDetails] = useState({ name: '', password: '' });
	const [expanded, setExpanded] = useState(false);
	const handleLogin = (e) => {
		e.preventDefault();
		localStorage.clear();
		axios
			.post('https://wondering-shipments.run-us-west2.goorm.io/login', {
				username: details.username,
				password: details.password,
			})
			.then((user) => {
				const token = user.data.token;
				axios
					.get('https://wondering-shipments.run-us-west2.goorm.io/getUsername', {
						headers: {
							'x-access-token': token,
						},
					})
					.then((response) => {
						if (response.data.isLoggedIn) {
							let userData = response.data;
							userData.token = token; 
							userData = JSON.stringify(userData);
							console.log(userData);
							localStorage.setItem('userData', userData);
							history.push('/dashboard/home');
						} else {
							window.location.reload(false);
						}
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const toggleExpand = () => {
		setExpanded((expanded) => !expanded);
	};

	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand>TRULYFANS</Navbar.Brand>
				</Container>
			</Navbar>
			<Container>
				<div className={`form-display ${expanded ? 'hidden' : 'expanded'}`}>
								<div>
			<h1> Welcome Back! Please sign in:</h1>
			</div>
					<Form onSubmit={handleLogin}>
						<Form.Group className="mb-3" controlId="formBasicEmailLogin">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Username"
								onChange={(e) =>
									setDetails({ ...details, username: e.target.value })
								}
								value={details.username}
							/>
							<Form.Text className="text-muted">
								We'll never ask for your password
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPasswordLogin">
							<Form.Label>What is your Password?</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={(e) =>
									setDetails({ ...details, password: e.target.value })
								}
								value={details.password}
							/>
						</Form.Group>
						<Button variant="primary" type="submit" className="login-button" >
							Login
						</Button>
					</Form>
				</div>
				<div className={`auth-link ${expanded ? 'hidden' : 'expanded'}`} >
					<Button onClick={toggleExpand}>
						New? Sign up here!
					</Button>
				</div>
			</Container>
			<Container>
				<div className={`signup-form ${expanded ? 'expanded' : 'hidden'}`}>
					<Signup toggleExpand={toggleExpand} />
				</div>
			</Container>
		</>
	);
};

export default Login;