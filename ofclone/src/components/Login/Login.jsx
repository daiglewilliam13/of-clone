import React, {useState} from 'react';
import '../../fonts.css';
import './login.css';
import {handleLogin} from '../../handlers';

const Login = () => {
	const [details, setDetails] = useState({});
	return(
	<div className={"login-wrapper"}>
	<p className="form-title">Login to your account:</p>
	<input type="text"
		   placeholder="username or email"
		   className="login-id-input"
			onChange={(e) =>
			setDetails({...details, username: e.target.value})	 
			}
		></input>
	<span className="form-label">Username or Email</span>
	<input type="password"
			placeholder="password"
		    className="login-password-input"
			onChange={(e) =>
			setDetails({...details, password: e.target.value})	 
			}
		></input>
	<span className="form-label">Password</span>
	<button type="submit" className="login-submit-button" onClick={()=> handleLogin(details)}>Login</button>
	</div>
	)
}

export default Login;