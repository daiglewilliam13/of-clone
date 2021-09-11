import React, { useState, setState } from 'react';
import { Container, Navbar, Form, Button } from 'react-bootstrap';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';

const Signup = (props) => {
	let history = useHistory();
	const [signupDetails, setSignupDetails] = useState({ name: '', password: '', email: '' });
	const [match, setMatch] = useState(true);;
	const handleKeyUp = (e) => {
		if (e !== signupDetails.password) {
			setMatch(false);
		} else {
			setMatch(true);
		}
	};
	
	const handleSignup = (e) => {
		e.preventDefault();
		axios
			.post('https://wondering-shipments.run-us-west2.goorm.io/register', {
				username: signupDetails.username,
				password: signupDetails.password,
				email: signupDetails.email,
				profilePicture: "../images/default-profile-photo.jpg"
			})
			.then(() => {
				axios
					.post('https://wondering-shipments.run-us-west2.goorm.io/login', {
						username: signupDetails.username,
						password: signupDetails.password,
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
									const userData = JSON.stringify(response.data);
									console.log(userData);
									localStorage.setItem('userData', userData);
									history.push('/');
								} else {
									history.push('/auth/login');
								}
							});
					})
					.catch((err) => {
						console.log(err);
					});
			});
	};
	return (
		<>
			<Container>
				<div className="form-display">
					<div>
						<h1> Welcome! Please sign up:</h1>
					</div>
					<Form onSubmit={handleSignup}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Username"
								onChange={(e) =>
									setSignupDetails({ ...signupDetails, username: e.target.value })
								}
								value={signupDetails.username}
								required
							/>
							<Form.Text className="text-muted">
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Enter Password</Form.Label>
							<Form.Control
								className="mb-1"
								type="password"
								placeholder="Password"
								onChange={(e) =>
									setSignupDetails({ ...signupDetails, password: e.target.value })
								}
								value={signupDetails.password}
								required
								
							/>
							<Form.Control 
								type="password" 
								placeholder="Verify Password" 
									onChange={(e) =>
									handleKeyUp(e.target.value)
								}
								required
								/>
							<Form.Text className={`text-muted ${match ? 'hidden' : 'expanded'}`}>
								Passwords do not match
							</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email Address:</Form.Label>
							<Form.Control
								type="email"
								placeholder="name@example.com"
								onChange={(e) =>
									setSignupDetails({ ...signupDetails, email: e.target.value })
								}
								value={signupDetails.email}
								required
							/>
						</Form.Group>
						<Button variant="primary" type="submit" disabled={!match}>
							Sign Up
						</Button>
					</Form>
				</div>
				<div className="auth-link">
					<a href="#" onClick={props.toggleExpand}>
						Already have an account? Login Here
					</a>
				</div>
			</Container>
		</>
	);
};

export default Signup;