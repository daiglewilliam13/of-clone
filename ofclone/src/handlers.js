import React from 'react';
import axios from 'axios';

export const handleLogin = (details) => {
	axios
	.post('https://wondering-shipments.run-us-west2.goorm.io/login', {
		username: details.username,
		password: details.password,
		}).then((user) =>{
			const userData=JSON.stringify(user.data);
			localStorage.setItem('userData', userData)
			window.location.reload();
		})
}

export const handleLogout = () => {
	localStorage.clear();
	window.location.reload();
}