import React from 'react';
import '../../fonts.css';
import './register.css';


const Register = () => {
	return(
	<div className={`register-wrapper`}>
	<p className="form-title">Register for a new account:</p>
	<input type="text"
		   placeholder="username"
		   className="register-id-input"
		></input>
	<span className="form-label">Username</span>
		<input type="text"
		   placeholder="email@example.com"
		   className="register-id-input"
		></input>
	<span className="form-label">Email</span>
	<input type="password"
			placeholder="password"
		   className="register-password-input"
		></input>
	<span className="form-label">Password</span>
		<input type="text"
			placeholder="confirm password"
		   className="register-password-input"
		></input>
	<span className="form-label">Confirm Password</span>
	<button type="submit" className="register-submit-button">Register</button>
	</div>
	)
}

export default Register;