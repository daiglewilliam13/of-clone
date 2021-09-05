import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './content-wrapper.css';
import './Profile.css';
import axios from 'axios';

const Profile = (props) => {

	const getUserInfo = (id) => {
		axios({
			method: 'get',
			url: 'https://wondering-shipments.run-us-west2.goorm.io/getUserInfo',
			headers: {
				'x-access-token': props.user.token,
			},
			data: {
				id: props.user.id,
			},
		}).then((response) => {
			let userInfo = response;
			console.log(response);
			return userInfo;
		});
	};
 	const profileInfo = getUserInfo();
	return (
		<Container>
			<div className="content-wrapper">
				<div className="header-bar">
					<h3>{props.content}</h3>
				</div>
				<div className="profile-info">
					{profileInfo}
					<div className="token-info"></div>
				</div>
			</div>
		</Container>
	);
};

export default Profile;