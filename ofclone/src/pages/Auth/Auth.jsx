import React, { useState } from 'react';
import '../../fonts.css';
import './auth.css';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';


const Auth = () => {
	const [toggleForm, setToggleForm] = useState(true);
	const toggleFormSwitch = () => setToggleForm(!toggleForm);
	return (
		<>
			<div className="auth-page">
				<div className="auth-page-wrapper">
					<h2>Welcome to Trulyfans!</h2>
					<div className="form-wrapper">
						<div className={`form ${toggleForm ? 'expanded' :'hidden'}`}>
							<Login />
							<button className="form-toggle-button" onClick={toggleFormSwitch}>New? Sign up here!</button>
						</div>
						<div className={`form ${toggleForm ? 'hidden' :'expanded'}`}>
							<Register />
							<button className="form-toggle-button" onClick={toggleFormSwitch}>Already have an account? Login here!</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Auth;