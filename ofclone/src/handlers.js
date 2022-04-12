import React from 'react';
import axios from 'axios';

export const handleLogin = (details) => {
	axios
	.post('https://wondering-shipments.run-us-west2.goorm.io/login', {
		username: details.username.toLowerCase(),
		password: details.password,
		}).then((res) =>{
			if(res.data.authorized) {
			localStorage.clear();
			const userData=JSON.stringify(res.data);
				localStorage.setItem('userData', userData)
			} else {
				const flashMessage = JSON.stringify(res.data);
				localStorage.setItem('flashMessage', flashMessage);
			}
		}).then(()=>{
			window.location.reload();
	})
}

export const handleLogout = () => {
	localStorage.clear();
	window.location.reload();
}