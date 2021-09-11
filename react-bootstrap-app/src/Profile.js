import React from 'react';
import { Container } from 'react-bootstrap';
import './content-wrapper.css';
import './Profile.css';
import axios from 'axios';

const Profile = (props) => {
	return (
		<Container>
			<div className="content-wrapper">
				<div className="header-bar">
					<h3>{props.content}</h3>
				</div>
				<div className="profile-info">
				<p>Username: {props.user.username} </p>
				<p>Email: {props.user.email} </p>
				<p>User Since: {props.user.createdAt}</p>
					<div className="token-info"></div>
				</div>
			</div>
		</Container>
	);
};

export default Profile;